"use client";

import { useEffect, useRef, useState } from "react";
import { FaRobot, FaTimes, FaPaperPlane } from "react-icons/fa";
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
      {/* Toggle button */}
      <button
        aria-label={isOpen ? "Close chat" : "Open chat"}
        onClick={() => setIsOpen((s) => !s)}
        className="fixed z-50 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full shadow-lg transition-transform duration-200 transform hover:scale-110 bottom-4 right-4 p-3 sm:bottom-6 sm:right-6"
        style={{ boxShadow: "0 10px 25px rgba(147, 51, 234, 0.28)" }}
      >
        {isOpen ? <FaTimes size={18} /> : <FaRobot size={18} />}
      </button>

      {/* Chat panel */}
      {isOpen && (
        <div
          className="fixed z-40 right-4 bottom-20 w-80 sm:w-96 md:w-[420px] lg:w-[480px] h-[520px] bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col"
          role="dialog"
          aria-label="MG Dev chat assistant"
        >
          {/* Header */}
          <div className="px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-t-lg text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FaRobot />
              <div>
                <div className="text-sm font-semibold">MG Dev — Assistant</div>
                <div className="text-xs opacity-80">Ask about services, pricing, projects</div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
              className="text-white opacity-90 hover:opacity-100"
            >
              <FaTimes />
            </button>
          </div>

          {/* Quick actions */}
          <div className="px-3 py-2 border-b border-gray-100 flex gap-2">
            <button
              onClick={() => handleQuick("services")}
              className="text-xs px-2 py-1 rounded-md bg-gray-100 hover:bg-gray-200"
            >
              Services
            </button>
            <button
              onClick={() => handleQuick("pricing")}
              className="text-xs px-2 py-1 rounded-md bg-gray-100 hover:bg-gray-200"
            >
              Pricing
            </button>
            <button
              onClick={() => handleQuick("contact")}
              className="text-xs px-2 py-1 rounded-md bg-gray-100 hover:bg-gray-200"
            >
              Contact
            </button>
            <div className="ml-auto text-xs opacity-70">Response time: ~2-4 hrs (IST)</div>
          </div>

          {/* Messages container */}
          <div ref={containerRef} className="flex-1 p-3 overflow-y-auto bg-gray-50">
            <div className="flex flex-col gap-3">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex ${m.isAI ? "justify-start" : "justify-end"} items-end`}
                >
                  <div
                    className={`max-w-[85%] px-3 py-2 rounded-lg ${
                      m.isAI ? "bg-white border border-gray-200 text-gray-800" : "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                    }`}
                  >
                    <div className="whitespace-pre-wrap text-sm leading-relaxed">
                      {m.text}
                      {m.isTyping && <span className="ml-1 animate-pulse">▌</span>}
                    </div>
                    <div className="text-[10px] opacity-60 mt-1 text-right">
                      {new Date(m.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="p-3 border-t border-gray-100 bg-white rounded-b-lg">
            <div className="flex items-center gap-2">
              <textarea
                rows={1}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a message — press Enter to send"
                className="flex-1 resize-none px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                aria-label="Message input"
              />
              <button
                onClick={handleSendMessage}
                disabled={isLoading}
                aria-label="Send message"
                className={`px-3 py-2 rounded-md text-white flex items-center justify-center ${
                  isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                }`}
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <FaPaperPlane />
                )}
              </button>
            </div>
            <div className="text-xs text-gray-500 mt-2">Tip: Use Shift+Enter for newline</div>
          </div>
        </div>
      )}
    </>
  );
}
