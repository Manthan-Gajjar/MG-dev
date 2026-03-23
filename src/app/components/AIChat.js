"use client";

import { useEffect, useRef, useState } from "react";
import { FaTimes, FaPaperPlane, FaRobot } from "react-icons/fa";
import { RiRobot2Line, RiCloseLine } from "react-icons/ri";
import portfolioData from "../data/portfolio-data.json";

/**
 * AIChat - Improved chat component
 * - Local RAG-style responses using portfolio-data.json
 * - Typing animation with safe cleanup
 * - Quick action buttons (services, pricing, contact)
 * - Auto-scroll, accessible controls
 */

export default function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [messages, setMessages] = useState(() => [
    {
      id: `ai-${Date.now()}`,
      text:
        "Hello 👋 — I'm MG Dev's assistant. Ask me about services, pricing, availability, or request a demo. Try: 'How much for a portfolio site?'",
      isAI: true,
      timestamp: new Date().toISOString(),
      isTyping: false,
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const containerRef = useRef(null);
  const typingIntervalRef = useRef(null);
  const activeTypingCancelRef = useRef(() => {});

  // Proactive Toast Greeting
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) setShowToast(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, [isOpen]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, isOpen]);

  // Helper - push a message
  const pushMessage = (msg) => {
    setMessages((prev) => [...prev, msg]);
  };

  // Local "RAG-like" response generator using portfolioData
  // Returns a string answer
  const generateLocalResponse = async (userText) => {
    try {
      const text = userText.toLowerCase();

      // 1) Direct quick matches: services
      for (const [key, svc] of Object.entries(portfolioData.services)) {
        const title = svc.title.toLowerCase();
        if (text.includes(title) || text.includes(key) || text.includes(title.split(" ")[0])) {
          return `${svc.title} — ${svc.description}\n\nTypical deliverables: ${svc.deliverables ? svc.deliverables.join(
            ", "
          ) : "Design, Development, Deployment"}.\n\nEstimated starting price: ${
            svc.pricing ? (typeof svc.pricing === "object" ? `₹${svc.pricing.freelancerStarting}` : svc.pricing) : "Contact for a quote"
          }.\n\nWould you like a free 30-minute discovery call to scope this?`;
        }
      }

      // 2) Pricing queries
      if (text.includes("price") || text.includes("cost") || text.includes("how much") || text.includes("estimate")) {
        const pricing = portfolioData.pricing || {};
        const small = pricing.projectEstimates?.smallWebsite?.range?.[0] ?? 15000;
        const medium = pricing.projectEstimates?.mediumApp?.range?.[0] ?? 40000;
        return `Typical ranges:\n• Small (portfolio / brochure): ₹${small}\n• Medium (custom web app): starts around ₹${medium}\n• Large products: custom estimate.\n\nI can give a precise quote after a short scoping call — would you like to schedule one?`;
      }

      // 3) Project examples
      if (text.includes("project") || text.includes("example") || text.includes("show") || text.includes("portfolio")) {
        const examples = portfolioData.portfolio?.projects || portfolioData.projects || [];
        if (examples.length) {
          const summary = examples.slice(0, 3).map((p) => `• ${p.name}: ${p.description}`).join("\n");
          return `Here are a few projects I've built:\n${summary}\n\nWant more details on any of these? Tell me which one (name) and I'll share tech & features.`;
        }
      }

      // 4) Contact / availability
      if (text.includes("contact") || text.includes("hire") || text.includes("available") || text.includes("meeting")) {
        const c = portfolioData.contactInfo || portfolioData.personalInfo || {};
        const contactMethods = [];
        if (c.preferredContact) {
          if (Array.isArray(c.preferredContact)) contactMethods.push(...c.preferredContact);
          else contactMethods.push(c.preferredContact);
        }
        const schedule = c.schedulingLink ? `Schedule: ${c.schedulingLink}` : "";
        return `You can contact MG Dev via ${contactMethods.join(", ") || "WhatsApp / Email / LinkedIn"}. ${schedule}\n\nTypical response time: ${c.responseTime ?? "2-4 hours (IST)"} — want me to start the scheduling process?`;
      }

      // 5) Fallback: search keywords among project and services text
      const haystack = [
        ...(portfolioData.portfolio?.projects || portfolioData.projects || []),
        ...(Object.values(portfolioData.services) || []),
      ]
        .map((p) => `${p.name ?? ""} ${p.description ?? ""} ${(p.features || []).join(" ")}`)
        .join(" ")
        .toLowerCase();

      let matchFound = false;
      for (const word of text.split(/\s+/)) {
        if (word.length < 4) continue;
        if (haystack.includes(word)) {
          matchFound = true;
          break;
        }
      }
      if (matchFound) {
        // Provide a helpful generic answer referencing portfolio
        const sample = (portfolioData.portfolio?.projects || portfolioData.projects || [])[0];
        return `Good question — I have experience building apps like "${sample?.name}" (${sample?.technologies?.slice(0, 3).join(", ")}) which included features similar to what you asked. I can share a plan & estimate after a short scoping call. Interested?`;
      }

      // 6) Give a friendly fallback that invites escalation to the /api/chat (server)
      return null; // signal unable to answer locally
    } catch (err) {
      console.error("Local response error:", err);
      return null;
    }
  };

  // Type animation (safe) - writes text char by char into a message
  const startTypingAnimation = (messageId, fullText) => {
    // cancel prior typing
    if (typingIntervalRef.current) {
      clearInterval(typingIntervalRef.current);
      typingIntervalRef.current = null;
      activeTypingCancelRef.current();
    }

    let index = 0;
    setIsTyping(true);

    // function to cancel
    let cancelled = false;
    activeTypingCancelRef.current = () => {
      cancelled = true;
    };

    // Ensure message exists (replace text as we go)
    typingIntervalRef.current = setInterval(() => {
      if (cancelled) {
        clearInterval(typingIntervalRef.current);
        typingIntervalRef.current = null;
        setIsTyping(false);
        activeTypingCancelRef.current = () => {};
        return;
      }

      const nextSlice = fullText.slice(0, index + 1);
      setMessages((prev) =>
        prev.map((m) => (m.id === messageId ? { ...m, text: nextSlice, isTyping: true } : m))
      );
      index++;

      if (index >= fullText.length) {
        clearInterval(typingIntervalRef.current);
        typingIntervalRef.current = null;
        setMessages((prev) =>
          prev.map((m) => (m.id === messageId ? { ...m, text: fullText, isTyping: false } : m))
        );
        setIsTyping(false);
        activeTypingCancelRef.current = () => {};
      }
    }, 18); // 18ms per char -> snappy but readable
  };

  // Clean up intervals on unmount
  useEffect(() => {
    return () => {
      if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
      activeTypingCancelRef.current();
    };
  }, []);

  // Try to get answer locally (fast). If null returned, optionally fall back to /api/chat.
  const getAnswer = async (userText) => {
    // Try local generation first
    const local = await generateLocalResponse(userText);
    if (local) return { source: "local", message: local };

    // fallback to /api/chat if present and reachable
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userText }),
      });
      if (!res.ok) throw new Error("API response not ok");
      const data = await res.json();
      if (data && data.message) return { source: "api", message: data.message };
    } catch (err) {
      console.warn("Fallback API call failed:", err);
    }

    // final fallback
    return {
      source: "none",
      message:
        "Sorry — I couldn't find a direct answer in my portfolio data. I can schedule a 30-min discovery call to get exact details and a quote. Would you like that?",
    };
  };

  // Handle send
  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    // push user message
    const userMsg = {
      id: `user-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      text: inputMessage.trim(),
      isAI: false,
      timestamp: new Date().toISOString(),
    };
    pushMessage(userMsg);
    const userText = inputMessage.trim();
    setInputMessage("");
    setIsLoading(true);

    // push placeholder AI typing message
    const aiId = `ai-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    pushMessage({
      id: aiId,
      text: "",
      isAI: true,
      timestamp: new Date().toISOString(),
      isTyping: true,
    });

    try {
      const answer = await getAnswer(userText);
      // start typing animation
      startTypingAnimation(aiId, answer.message);
    } catch (err) {
      console.error("handleSendMessage error:", err);
      // update AI message with friendly error
      setMessages((prev) =>
        prev.map((m) =>
          m.id === aiId
            ? {
                ...m,
                text:
                  "I'm sorry, something went wrong while generating an answer. Please try again or contact MG Dev directly via WhatsApp / LinkedIn / Email.",
                isTyping: false,
              }
            : m
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Keyboard handling: Enter send, Shift+Enter newline
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Quick action buttons
  const handleQuick = (type) => {
    if (type === "services") {
      const keys = Object.keys(portfolioData.services || {});
      const list = keys.map((k) => `• ${portfolioData.services[k].title}`).join("\n");
      setInputMessage(`Tell me about your services:\n${list}`);
    } else if (type === "pricing") {
      setInputMessage("What are your typical project price ranges?");
    } else if (type === "contact") {
      setInputMessage("How can I contact you to start a project?");
    }
  };

  return (
    <>
      {/* Proactive Greeting Toast */}
      {showToast && !isOpen && (
        <div className="fixed z-50 bottom-24 right-5 max-w-[280px] bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-2xl shadow-2xl animate-bounce-subtle slide-in-bottom">
          <div className="flex justify-between items-start mb-1">
            <span className="text-xs font-bold text-blue-400">MG ASSISTANT</span>
            <button onClick={() => setShowToast(false)} className="text-gray-400 hover:text-white"><FaTimes size={10} /></button>
          </div>
          <p className="text-sm text-gray-200 leading-snug">
            👋 Hey! Need a quote for a website or have a quick question? I'm here to help!
          </p>
          <button 
            onClick={() => { setIsOpen(true); setShowToast(false); }}
            className="mt-3 text-xs font-bold text-white bg-blue-600 px-3 py-1.5 rounded-lg hover:bg-blue-500 transition-colors"
          >
            Chat Now
          </button>
        </div>
      )}

      {/* Toggle button */}
      <button
        aria-label={isOpen ? "Close chat" : "Open chat"}
        onClick={() => { setIsOpen((s) => !s); if(showToast) setShowToast(false); }}
        className="fixed z-50 bg-[#0a0a0a] border-2 border-blue-500/40 hover:border-blue-400 text-blue-400 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:shadow-[0_0_25px_rgba(59,130,246,0.5)] transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 bottom-5 right-5 p-3.5 sm:p-4 flex items-center justify-center backdrop-blur-md"
      >
        {isOpen ? (
          <RiCloseLine size={24} className="text-white" />
        ) : (
          <div className="relative">
            <RiRobot2Line size={24} className="animate-[pulse_3s_ease-in-out_infinite]" />
            {showToast && (
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
            )}
          </div>
        )}
      </button>

      {/* Chat panel */}
      {isOpen && (
        <div
          className="fixed z-50 right-4 bottom-24 sm:bottom-24 w-[calc(100vw-32px)] sm:w-96 md:w-[400px] h-[550px] max-h-[80vh] bg-[#0c0c0c] backdrop-blur-2xl rounded-3xl shadow-3xl border border-white/10 flex flex-col font-poppins animate-[fadeIn_0.2s_ease-out] overflow-hidden"
          role="dialog"
          aria-label="MG Dev chat assistant"
        >
          {/* Header */}
          <div className="px-5 py-5 bg-gradient-to-r from-blue-600/10 to-transparent border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.15)]">
                <FaRobot size={22} />
              </div>
              <div>
                <div className="text-sm font-bold text-white tracking-wide">MG Assistant</div>
                <div className="text-xs text-blue-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span> Online
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
              className="text-gray-400 hover:text-white transition-colors bg-white/5 p-2 rounded-full hover:bg-white/10"
            >
              <FaTimes />
            </button>
          </div>

          {/* Quick actions */}
          <div className="px-4 py-3 bg-[#111] border-b border-white/5 flex gap-2 overflow-x-auto scrollbar-hide">
            <button
              onClick={() => handleQuick("services")}
              className="text-xs px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors border border-white/5 whitespace-nowrap flex-shrink-0"
            >
              Services
            </button>
            <button
              onClick={() => handleQuick("pricing")}
              className="text-xs px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors border border-white/5 whitespace-nowrap flex-shrink-0"
            >
              Pricing
            </button>
            <button
              onClick={() => handleQuick("contact")}
              className="text-xs px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors border border-white/5 whitespace-nowrap flex-shrink-0"
            >
              Contact
            </button>
          </div>

          {/* Messages container */}
          <div ref={containerRef} className="flex-1 p-4 overflow-y-auto scrollbar-hide flex flex-col gap-4">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2 ${m.isAI ? "justify-start" : "justify-end"}`}
              >
                {/* Avatar for AI */}
                {m.isAI && (
                  <div className="w-6 h-6 rounded-full bg-blue-500/20 border border-blue-500/50 flex-shrink-0 flex items-center justify-center text-blue-400 mt-auto hidden sm:flex">
                    <FaRobot size={10} />
                  </div>
                )}
                <div
                  className={`max-w-[85%] px-4 py-2.5 rounded-2xl ${
                    m.isAI 
                      ? "bg-white/5 border border-white/10 text-gray-200 rounded-bl-sm" 
                      : "bg-blue-600/30 border border-blue-500/40 text-white rounded-br-sm shadow-[0_0_15px_rgba(59,130,246,0.1)]"
                  }`}
                >
                  <div className="whitespace-pre-wrap text-[13px] sm:text-sm leading-relaxed">
                    {m.text}
                    {m.isTyping && <span className="ml-1 inline-block w-1.5 h-3.5 bg-blue-400 animate-pulse align-middle"></span>}
                  </div>
                  <div className="text-[9px] opacity-40 mt-1 text-right font-medium tracking-wider">
                    {new Date(m.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-4 bg-black/60 border-t border-white/10">
            <div className="relative flex items-center">
              <textarea
                rows={1}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                className="w-full resize-none pl-4 pr-12 py-3 bg-[#111] border border-white/10 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm text-white placeholder:text-gray-500 transition-all font-poppins"
                aria-label="Message input"
              />
              <button
                onClick={handleSendMessage}
                disabled={isLoading || !inputMessage.trim()}
                aria-label="Send message"
                className={`absolute right-2 p-2 rounded-lg flex items-center justify-center transition-all ${
                  isLoading || !inputMessage.trim() 
                    ? "text-gray-600 cursor-not-allowed" 
                    : "text-blue-400 hover:text-blue-300 hover:bg-blue-400/10"
                }`}
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <FaPaperPlane size={14} />
                )}
              </button>
            </div>
            <div className="text-[10px] text-gray-600 text-center mt-3 font-medium">
              Powered by local MG Dev intelligence
            </div>
          </div>
        </div>
      )}
    </>
  );
}
