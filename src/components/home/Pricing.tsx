import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Send, RefreshCw, Globe } from 'lucide-react';
import Lottie from 'lottie-react';
import typingAnimation from '@/assets/typing-animation.json';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion, AnimatePresence } from 'framer-motion';

type SupportedLanguage = 'en' | 'es' | 'fr' | 'de';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  id?: string;
}

interface PriceRange {
  min: number;
  max: number;
}

interface ProjectMetadata {
  projectType?: string;
  industry?: string;
  businessModel?: string;
  targetAudience?: string;
  technicalRequirements?: string[];
  integrations?: string[];
  scaleExpectations?: string;
  timeline?: string;
  budget?: string;
  uniqueSellingPoints?: string[];
  challengesIdentified?: string[];
  competitiveAdvantages?: string[];
  lastUpdateTimestamp: number;
}

interface ChatState {
  messages: Message[];
  priceRange: PriceRange;
  isLocked: boolean;
  metadata: ProjectMetadata;
  conversationId?: string;
  sessionId?: string;
}

const languageOptions: Record<SupportedLanguage, string> = {
  en: 'English',
  es: 'Español',
  fr: 'Français',
  de: 'Deutsch'
};

const initialMessages: Record<SupportedLanguage, string> = {
  en: "Hi! I'm here to help you get a competitive price for your project. What type of project are you looking to build?",
  es: "¡Hola! Estoy aquí para ayudarte a obtener un precio competitivo para tu proyecto. ¿Qué tipo de proyecto quieres construir?",
  fr: "Bonjour ! Je suis là pour vous aider à obtenir un prix compétitif pour votre projet. Quel type de projet souhaitez-vous construire ?",
  de: "Hallo! Ich bin hier, um Ihnen bei der Ermittlung eines wettbewerbsfähigen Preises für Ihr Projekt zu helfen. Welche Art von Projekt möchten Sie entwickeln?"
};

const placeholderText: Record<SupportedLanguage, { input: string; locked: string }> = {
  en: {
    input: "Type your message...",
    locked: "Chat is locked. Press reset to start over."
  },
  es: {
    input: "Escribe tu mensaje...",
    locked: "Chat bloqueado. Presiona reiniciar para comenzar de nuevo."
  },
  fr: {
    input: "Tapez votre message...",
    locked: "Chat verrouillé. Appuyez sur réinitialiser pour recommencer."
  },
  de: {
    input: "Nachricht eingeben...",
    locked: "Chat gesperrt. Drücken Sie Reset, um neu zu beginnen."
  }
};

const formatPrice = (price: number) => {
  const rounded = Math.round(price / 1000);
  const hasDecimal = price % 1000 !== 0;
  if (hasDecimal) {
    const decimal = ((price % 1000) / 1000).toFixed(1).substring(2);
    return `${Math.floor(price / 1000)},${decimal}k`;
  }
  return `${rounded}k`;
};

const Pricing = () => {
  const [language, setLanguage] = useState<SupportedLanguage>('en');
  const [chatState, setChatState] = useState<ChatState>({
    messages: [
      {
        role: 'assistant',
        content: initialMessages.en,
        timestamp: Date.now(),
        id: 'initial'
      }
    ],
    priceRange: {
      min: 5000,
      max: 12000
    },
    isLocked: false,
    metadata: {
      lastUpdateTimestamp: Date.now()
    }
  });

  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [animatedMin, setAnimatedMin] = useState(5000);
  const [animatedMax, setAnimatedMax] = useState(12000);
  
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const animatePrice = () => {
      const duration = 500; // Animation duration in ms
      // Remove unused steps variable
      const startTime = Date.now();
      
      const startMin = animatedMin;
      const startMax = animatedMax;
      const targetMin = chatState.priceRange.min;
      const targetMax = chatState.priceRange.max;
      
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const easedProgress = 1 - Math.pow(1 - progress, 3); // Cubic easing
        
        const currentMin = startMin + (targetMin - startMin) * easedProgress;
        const currentMax = startMax + (targetMax - startMax) * easedProgress;
        
        setAnimatedMin(currentMin);
        setAnimatedMax(currentMax);
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      animate();
    };
    
    animatePrice();
  }, [chatState.priceRange, animatedMin, animatedMax]); 

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

  const changeLanguage = (newLanguage: SupportedLanguage) => {
    setLanguage(newLanguage);
    handleReset(newLanguage);
  };

  const handleReset = async (newLanguage?: SupportedLanguage) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [{
            role: 'assistant',
            content: initialMessages[newLanguage || language]
          }],
          language: newLanguage || language
        })
      });

      if (!response.ok) {
        throw new Error('Failed to reset chat');
      }

      const data = await response.json();

      setChatState({
        messages: [
          {
            role: 'assistant',
            content: initialMessages[newLanguage || language],
            timestamp: Date.now(),
            id: 'reset-' + Date.now()
          }
        ],
        priceRange: data.priceRange || {
          min: 5000,
          max: 12000
        },
        isLocked: false,
        metadata: {
          lastUpdateTimestamp: Date.now()
        },
        conversationId: data.conversationId,
        sessionId: data.sessionId
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to reset chat';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;
    
    const newMessage: Message = {
      role: 'user',
      content: inputMessage.trim(),
      timestamp: Date.now(),
      id: 'user-' + Date.now()
    };

    setChatState(prev => ({
      ...prev,
      messages: [...prev.messages, newMessage]
    }));

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
          })),
          language,
          conversationId: chatState.conversationId,
          sessionId: chatState.sessionId
        })
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }
      
      const data = await response.json();

      setChatState(prev => {
        const newPriceRange = data.priceRange && 
          typeof data.priceRange.min === 'number' && 
          typeof data.priceRange.max === 'number'
          ? data.priceRange
          : prev.priceRange;

        return {
          ...prev,
          messages: [
            ...prev.messages,
            {
              role: 'assistant',
              content: data.message,
              timestamp: Date.now(),
              id: 'assistant-' + Date.now()
            }
          ],
          priceRange: newPriceRange,
          metadata: data.metadata || prev.metadata,
          conversationId: data.conversationId,
          sessionId: data.sessionId,
          isLocked: data.nextAction === 'locked'
        };
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to send message';
      setError(errorMessage);
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
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary dark:from-primary/90 dark:via-primary/70 dark:to-primary/90">
            Get Your Project Estimate
          </h2>
          <p className="text-lg text-muted-foreground dark:text-muted-foreground/90 max-w-2xl mx-auto">
            Our AI assistant helps assess your project scope to provide you with a competitive pricing estimation. 
            With our smart planning approach, we can significantly reduce costs while maintaining quality.
          </p>
        </div>

        <div className="bg-blue-100/80 dark:bg-blue-950/30 rounded-3xl p-12 relative">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="w-full lg:w-1/2 text-blue-950 dark:text-blue-100">
              <h2 className="text-4xl font-bold mb-6">
                Your Estimation is
              </h2>
              <motion.div 
                className="text-6xl font-bold"
                key={`${animatedMin}-${animatedMax}`}
              >
                €{formatPrice(animatedMin)} - {formatPrice(animatedMax)}
              </motion.div>
              {error && (
                <div className="mt-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-100 px-4 py-2 rounded-lg">
                  {error}
                </div>
              )}
            </div>

            <Card className="w-full lg:w-1/2 h-[500px] bg-white dark:bg-gray-900 shadow-[8px_8px_0px_0px_rgba(80,150,255,1),8px_8px_0px_0px_rgba(0,0,0,0.05),12px_12px_30px_rgba(0,0,0,0.2)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.1),8px_8px_0px_0px_rgba(255,255,255,0.05),12px_12px_30px_rgba(0,0,0,0.5)] flex flex-col">
              <CardContent className="flex flex-col h-full p-0">
                <div className="p-4 border-b dark:border-gray-800 flex justify-end">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="gap-2">
                        <Globe className="h-4 w-4" />
                        {languageOptions[language]}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {(Object.entries(languageOptions) as [SupportedLanguage, string][]).map(([code, name]) => (
                        <DropdownMenuItem
                          key={code}
                          onClick={() => changeLanguage(code)}
                          className="gap-2"
                        >
                          {name}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div
                  ref={chatContainerRef}
                  className="flex-1 overflow-y-auto p-6 space-y-4"
                >
                  <AnimatePresence>
                    {chatState.messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ 
                          opacity: 0, 
                          x: message.role === 'user' ? 20 : -20,
                          y: 20 
                        }}
                        animate={{ 
                          opacity: 1, 
                          x: 0,
                          y: 0 
                        }}
                        exit={{ opacity: 0 }}
                        transition={{ 
                          type: "spring",
                          stiffness: 500,
                          damping: 40
                        }}
                        className={`flex ${
                          message.role === 'user' ? 'justify-end' : 'justify-start'
                        }`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg p-3 ${
                            message.role === 'user'
                              ? 'bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100'
                              : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
                          }`}
                        >
                          <p className="whitespace-pre-wrap">{message.content}</p>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  {isLoading && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex justify-start"
                    >
                      <div className="w-16 h-16">
                        <Lottie
                          animationData={typingAnimation}
                          loop={true}
                        />
                      </div>
                    </motion.div>
                  )}
                </div>

                <div className="border-t dark:border-gray-800 p-4">
                  <div className="flex gap-2">
                    <textarea
                      ref={textareaRef}
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder={
                        chatState.isLocked
                          ? placeholderText[language].locked
                          : placeholderText[language].input
                      }
                      disabled={isLoading || chatState.isLocked}
                      className="flex-1 resize-none rounded-md border border-input bg-background dark:bg-gray-900 dark:border-gray-700 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 dark:focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:opacity-50"
                      rows={1}
                    />
                    <div className="flex gap-2">
                      {chatState.isLocked ? (
                        <Button
                          onClick={() => handleReset()}
                          disabled={isLoading}
                          variant="outline"
                          className="hover:bg-blue-100/50 dark:hover:bg-blue-900/30"
                        >
                          <RefreshCw className="h-5 w-5" />
                        </Button>
                      ) : (
                        <Button
                          onClick={handleSendMessage}
                          disabled={isLoading || !inputMessage.trim()}
                          className="bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100 hover:bg-blue-200 dark:hover:bg-blue-800"
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