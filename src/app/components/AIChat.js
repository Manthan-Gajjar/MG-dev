"use client"

import { useState, useEffect } from 'react';
import { FaRobot, FaTimes, FaPaperPlane } from 'react-icons/fa';

export default function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I'm MG Dev's personal AI assistant. I can help you learn about my services, skills, projects, and pricing. How can I assist you today?", isAI: true, timestamp: new Date(), isTyping: false }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [typingMessage, setTypingMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Typing animation function
  const typeMessage = (fullText, messageId) => {
    setIsTyping(true);
    setTypingMessage('');
    let currentIndex = 0;
    
    const typeInterval = setInterval(() => {
      if (currentIndex < fullText.length) {
        setTypingMessage(prev => prev + fullText[currentIndex]);
        currentIndex++;
      } else {
        clearInterval(typeInterval);
        setIsTyping(false);
        setTypingMessage('');
        // Update the message with the full text
        setMessages(prev => prev.map(msg => 
          msg.id === messageId ? { ...msg, text: fullText, isTyping: false } : msg
        ));
      }
    }, 15); // Speed of typing (15ms per character - faster)
  };

  const handleSendMessage = async () => {
    if (inputMessage.trim() && !isLoading) {
      const userMessage = {
        id: messages.length + 1,
        text: inputMessage,
        isAI: false,
        timestamp: new Date(),
        isTyping: false
      };
      
      setMessages(prev => [...prev, userMessage]);
      const currentInput = inputMessage;
      setInputMessage('');
      setIsLoading(true);

      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: currentInput }),
        });

        const data = await response.json();
        
        if (data.success) {
          const aiResponse = {
            id: messages.length + 2,
            text: '',
            isAI: true,
            timestamp: new Date(),
            isTyping: true
          };
          setMessages(prev => [...prev, aiResponse]);
          
          // Start typing animation
          setTimeout(() => {
            typeMessage(data.message, aiResponse.id);
          }, 500); // Small delay before starting to type
        } else {
          const errorResponse = {
            id: messages.length + 2,
            text: data.message || "I'm sorry, I'm having trouble connecting right now. Please try again later or contact MG Dev directly.",
            isAI: true,
            timestamp: new Date(),
            isTyping: false
          };
          setMessages(prev => [...prev, errorResponse]);
        }
      } catch (error) {
        console.error('Chat error:', error);
        const errorResponse = {
          id: messages.length + 2,
          text: "I'm sorry, I'm having trouble connecting right now. Please try again later or contact MG Dev directly through WhatsApp, LinkedIn, or email.",
          isAI: true,
          timestamp: new Date(),
          isTyping: false
        };
        setMessages(prev => [...prev, errorResponse]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Fixed AI Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed z-50 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110
          bottom-4 right-4 p-3
          sm:bottom-6 sm:right-6 sm:p-4
          md:bottom-6 md:right-6 md:p-4
          lg:bottom-8 lg:right-8 lg:p-5
          xl:bottom-8 xl:right-10 xl:p-5
          2xl:bottom-10 2xl:right-12 2xl:p-6"
        style={{ boxShadow: '0 10px 25px rgba(147, 51, 234, 0.3)' }}
      >
        {isOpen ? (
          <FaTimes size={20} className="sm:w-6 sm:h-6 md:w-6 md:h-6 lg:w-7 lg:h-7 xl:w-7 xl:h-7 2xl:w-8 2xl:h-8" />
        ) : (
          <FaRobot size={20} className="sm:w-6 sm:h-6 md:w-6 md:h-6 lg:w-7 lg:h-7 xl:w-7 xl:h-7 2xl:w-8 2xl:h-8" />
        )}
      </button>

      {/* Chat Inbox */}
      {isOpen && (
        <div className="fixed z-40 bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col
          bottom-20 right-4 w-72 h-80
          sm:bottom-24 sm:right-6 sm:w-80 sm:h-96
          md:bottom-6 md:right-6 md:w-96 md:h-[500px]
          lg:bottom-6 lg:right-8 lg:w-[420px] lg:h-[550px]
          xl:bottom-6 xl:right-10 xl:w-[450px] xl:h-[600px]
          2xl:bottom-8 2xl:right-12 2xl:w-[480px] 2xl:h-[650px]">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-3 sm:p-4 rounded-t-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <FaRobot size={16} className="sm:w-5 sm:h-5" />
                <h3 className="font-semibold text-sm sm:text-base">MG Dev's Assistant</h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-200 transition-colors p-1"
              >
                <FaTimes size={14} className="sm:w-4 sm:h-4" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-3 sm:p-4 overflow-y-auto bg-gray-50">
            <div className="space-y-2 sm:space-y-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isAI ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-[85%] sm:max-w-xs px-2 py-1.5 sm:px-3 sm:py-2 rounded-lg ${
                      message.isAI
                        ? 'bg-white border border-gray-200 text-gray-800'
                        : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                    }`}
                  >
                    <p className="text-xs sm:text-sm leading-relaxed">
                      {message.isTyping ? typingMessage : message.text}
                      {message.isTyping && (
                        <span className="inline-block w-0.5 h-3 bg-gray-600 ml-0.5 animate-pulse"></span>
                      )}
                    </p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="p-3 sm:p-4 border-t border-gray-200 bg-white rounded-b-lg">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 px-2 py-1.5 sm:px-3 sm:py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <button
                onClick={handleSendMessage}
                disabled={isLoading}
                className={`px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 flex items-center justify-center ${
                  isLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isLoading ? (
                  <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <FaPaperPlane size={12} className="sm:w-3.5 sm:h-3.5" />
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 