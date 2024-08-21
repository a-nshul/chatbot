"use client"
import React, { useState } from 'react';
import { NextRouter } from 'next/router';

interface ChatbotProps {
  router: NextRouter;
}

const TypingIndicator: React.FC = () => (
  <div className="flex space-x-1">
    <div className="dot bg-gray-500 w-2 h-2 rounded-full animate-bounce" />
    <div className="dot bg-gray-500 w-2 h-2 rounded-full animate-bounce animation-delay-200" />
    <div className="dot bg-gray-500 w-2 h-2 rounded-full animate-bounce animation-delay-400" />
  </div>
);

const Chatbot: React.FC<ChatbotProps> = ({ router }) => {
  const [messages, setMessages] = useState<{ user: string; bot: string }[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const predefinedOptions = [
    'What services do you offer?',
    'How can I contact support?',
    'Tell me about your company.',
  ];

  const handleSend = (query?: string) => {
    const userInput = query || input.trim();
    if (userInput) {
      const userMessage = { user: userInput, bot: '' };
      setMessages([...messages, userMessage]);
      setInput('');
      setIsTyping(true); 
      setTimeout(() => {
        handleBotResponse(userInput);
        setIsTyping(false); 
      }, 1000); 
    }
  };

  const handleBotResponse = (query: string) => {
    let botMessage = 'Sorry, I did not understand that.';
    if (query.toLowerCase().includes('services')) {
      botMessage = 'We offer web development and design services.';
    } else if (query.toLowerCase().includes('contact')) {
      botMessage = 'You can contact support at support@example.com.';
    } else if (query.toLowerCase().includes('company')) {
      botMessage = 'Our company specializes in providing top-notch web solutions.';
    }

    setMessages((prev) => [...prev, { user: '', bot: botMessage }]);
  };

  return (
    <div className="max-w-lg mx-auto bg-gray-100 p-4 rounded shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-black">Chatbot</h3>
      </div>

      <div className="mb-4">
        <h4 className="text-lg font-semibold mb-2 text-black">You can ask:</h4>
        <div className="flex flex-wrap gap-2">
          {predefinedOptions.map((option, index) => (
            <button
              key={index}
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => handleSend(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="h-80 overflow-y-auto mb-4">
        {messages.map((msg, index) => (
          <div key={index} className="mb-2">
            {msg.user && <div className="text-right text-blue-500">{msg.user}</div>}
            {msg.bot && <div className="text-left text-green-500">{msg.bot}</div>}
          </div>
        ))}
        {isTyping && <div className="text-left text-gray-500"><TypingIndicator /></div>}
      </div>

      <div className="flex w-full max-w-md mx-auto mt-4">
          <input
            type="text"
            className="text-black flex-grow p-2 border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
          />
          <button
            className="p-2 bg-blue-500 text-white rounded-r hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={() => handleSend()}
          >
            Send
          </button>
        </div>

    </div>
  );
};

export default Chatbot;
