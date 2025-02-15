//landing-page/src/components/home/Pricing.tsx
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Send, RefreshCw } from 'lucide-react';
import Lottie from 'lottie-react';
import typingAnimation from '@/assets/typing-animation.json';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

interface PriceRange {
  min: number;
  max: number;
}

interface ChatState {
  messages: Message[];
  priceRange: PriceRange;
  isLocked: boolean;
}

const Pricing = () => {
  const [chatState, setChatState] = useState<ChatState>({
    messages: [
      {
        role: 'assistant',
        content: "Hi! I'm here to help you get a competitive price for your project. What type of project are you looking to build?",
        timestamp: Date.now()
      }
    ],
    priceRange: {
      min: 7000,
      max: 10000
    },
    isLocked: false
  });

  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);
  
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatState.messages]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(
        Math.max(textareaRef.current.scrollHeight, 40),
        160
      )}px`;
    }
  }, [inputMessage]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const handleReset = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      setChatState({
        messages: [
          {
            role: 'assistant',
            content: "Hi! I'm here to help you get a competitive price for your project. What type of project are you looking to build?",
            timestamp: Date.now()
          }
        ],
        priceRange: {
          min: 7000,
          max: 10000
        },
        isLocked: false
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to reset chat';
      setError(errorMessage);
      if (chatContainerRef.current) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'flex justify-center';
        errorDiv.innerHTML = `<div class="bg-red-100 text-red-700 px-4 py-2 rounded-lg">${errorMessage}</div>`;
        chatContainerRef.current.appendChild(errorDiv);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;
    
    const newMessage: Message = {
      role: 'user',
      content: inputMessage.trim(),
      timestamp: Date.now()
    };

    setIsLoading(true);
    setError(null);
    setInputMessage('');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...chatState.messages, newMessage].map(m => ({
            role: m.role,
            content: m.content
          }))
        })
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }
      
      const data = await response.json();

      setChatState(prev => ({
        ...prev,
        messages: [
          ...prev.messages,
          newMessage,
          {
            role: 'assistant',
            content: data.message,
            timestamp: Date.now()
          }
        ],
        priceRange: data.priceRange || prev.priceRange,
        isLocked: data.isLocked || false
      }));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to send message';
      setError(errorMessage);
      if (chatContainerRef.current) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'flex justify-center';
        errorDiv.innerHTML = `<div class="bg-red-100 text-red-700 px-4 py-2 rounded-lg">${errorMessage}</div>`;
        chatContainerRef.current.appendChild(errorDiv);
      }
      setChatState(prev => ({
        ...prev,
        messages: [...prev.messages, newMessage]
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isClient) {
    return null;
  }

  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Title and Description */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary">
            Get Your Project Estimate
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our AI assistant helps assess your project scope to provide you with a competitive pricing estimation. 
            With our smart planning approach, we can significantly reduce costs while maintaining quality.
          </p>
        </div>

        {/* Blue Box Section */}
        <div className="bg-[#4285F4]/80 rounded-3xl p-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Left side - Pricing Display */}
            <div className="w-full lg:w-1/2 text-white">
              <h2 className="text-4xl font-bold mb-6">
                Your Estimation is
              </h2>
              <div className="text-6xl font-bold">
                {formatCurrency(chatState.priceRange.min)} - {formatCurrency(chatState.priceRange.max)}
              </div>
              {error && (
                <div className="mt-4 bg-red-100 text-red-700 px-4 py-2 rounded-lg">
                  {error}
                </div>
              )}
            </div>

            {/* Right side - Chat */}
            <Card className="w-full lg:w-1/2 h-[500px] bg-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex flex-col">
              <CardContent className="flex flex-col h-full p-0">
                <div
                  ref={chatContainerRef}
                  className="flex-1 overflow-y-auto p-6 space-y-4"
                >
                  {chatState.messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${
                        message.role === 'user' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          message.role === 'user'
                            ? 'bg-[#4285F4] text-white'
                            : 'bg-gray-100'
                        }`}
                      >
                        <p className="whitespace-pre-wrap">{message.content}</p>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="w-16 h-16">
                        <Lottie
                          animationData={typingAnimation}
                          loop={true}
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="border-t p-4">
                  <div className="flex gap-2">
                    <textarea
                      ref={textareaRef}
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder={
                        chatState.isLocked
                          ? "Chat is locked. Press reset to start over."
                          : "Type your message..."
                      }
                      disabled={isLoading || chatState.isLocked}
                      className="flex-1 resize-none rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4285F4] focus-visible:ring-offset-2 disabled:opacity-50"
                      rows={1}
                    />
                    <div className="flex gap-2">
                      {chatState.isLocked ? (
                        <Button
                          onClick={handleReset}
                          disabled={isLoading}
                          variant="outline"
                          className="hover:bg-[#4285F4]/10"
                        >
                          <RefreshCw className="h-5 w-5" />
                        </Button>
                      ) : (
                        <Button
                          onClick={handleSendMessage}
                          disabled={isLoading || !inputMessage.trim()}
                          className="bg-[#4285F4] hover:bg-[#4285F4]/90"
                        >
                          <Send className="h-5 w-5" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;