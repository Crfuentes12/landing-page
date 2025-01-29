//landing-page/src/components/home/Pricing.tsx
// src/components/home/Pricing.tsx
"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Send, Loader2, Clock, CheckCircle2, BarChart2 } from 'lucide-react';
import type { Message } from '@/types/price';

const Pricing = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hi! I can help you calculate a price estimate for your project. What type of project are you looking to build?',
      priceData: {
        priceRange: { min: 5000, max: 7000 }
      }
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Get the latest price data from messages
  const latestPriceData = messages
    .filter(m => m.priceData)
    .slice(-1)[0]?.priceData;

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [inputMessage]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const newMessage: Message = {
      role: 'user',
      content: inputMessage
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: messages.map(m => ({
            role: m.role,
            content: m.content
          }))
        }),
      });

      const data = await response.json();

      setMessages(prev => [...prev, {
        role: 'assistant',
        content: data.message,
        priceData: {
          priceRange: data.priceRange,
          requirements: data.requirements,
          confidence: data.confidence,
          timeline: data.timeline
        }
      }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        priceData: {
          priceRange: { min: 5000, max: 7000 }
        }
      }]);
    } finally {
      setIsLoading(false);
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Get Your Project Estimate</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Chat with our AI assistant to get a customized price estimate for your project.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Chat Section */}
          <Card className="h-[600px] flex flex-col overflow-hidden">
            <CardContent className="flex flex-col h-full p-0">
              {/* Chat Messages Container */}
              <div 
                ref={chatContainerRef}
                className="flex-1 overflow-y-auto p-6 space-y-4"
                style={{
                  scrollbarWidth: 'thin',
                  scrollbarColor: 'rgb(203 213 225) transparent'
                }}
              >
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      message.role === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.role === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{message.content}</p>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-muted rounded-lg p-3">
                      <Loader2 className="h-5 w-5 animate-spin" />
                    </div>
                  </div>
                )}
              </div>

              {/* Input Container */}
              <div className="border-t p-4 bg-background">
                <div className="flex gap-2">
                  <textarea
                    ref={textareaRef}
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className="flex-1 resize-none rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 min-h-[2.5rem] max-h-[10rem]"
                    rows={1}
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={isLoading || !inputMessage.trim()}
                  >
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Price Calculator Section */}
          <Card className="h-[600px]">
            <CardContent className="p-6 flex flex-col h-full">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">Estimated Price Range</h3>
                <div className="text-4xl font-bold text-primary">
                  {latestPriceData && (
                    <>{formatCurrency(latestPriceData.priceRange.min)} - {formatCurrency(latestPriceData.priceRange.max)}</>
                  )}
                </div>
              </div>

              {latestPriceData?.confidence && (
                <div className="flex items-center gap-2 mb-4">
                  <BarChart2 className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm">
                    Confidence Level: <span className="font-medium capitalize">{latestPriceData.confidence}</span>
                  </span>
                </div>
              )}

              {latestPriceData?.timeline && (
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm">
                    Estimated Timeline: {latestPriceData.timeline.min}-{latestPriceData.timeline.max} {latestPriceData.timeline.unit}
                  </span>
                </div>
              )}

              {latestPriceData?.requirements && latestPriceData.requirements.length > 0 && (
                <div className="mt-6">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-muted-foreground" />
                    Project Requirements:
                  </h4>
                  <ul className="space-y-2">
                    {latestPriceData.requirements.map((req, index) => (
                      <li key={index} className="text-sm flex items-start gap-2">
                        <span className="text-primary">•</span>
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-auto">
                <p className="text-sm text-muted-foreground text-center">
                  * Final price may vary based on specific requirements and complexity
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Pricing;