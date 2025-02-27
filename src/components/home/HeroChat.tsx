//landing-page/src/components/home/HeroChat.tsx
"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { User, Send, Target, Code, Rocket, Lightbulb, Sparkles, ShoppingCart, Brain, ClipboardList, MessageSquare, Bot, Zap } from "lucide-react";
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from "@/providers/language-provider";

interface TimelineItem {
  titleKey: string;
  descriptionKey: string;
  icon: React.ReactNode;
}

interface ComparisonItem {
  traditional: string[];
  ourApproach: string[];
}

interface FeatureItem {
  titleKey: string;
  descriptionKey: string;
  icon: React.ReactNode;
}

interface Preview {
  type: 'timeline' | 'comparison' | 'features';
  content: {
    timeline?: TimelineItem[];
    comparison?: ComparisonItem;
    features?: FeatureItem[];
  };
}

interface ChatMessage {
  user: {
    nameKey: string;
    messageKey: string;
  };
  assistantKey: string;
  preview: Preview;
}

const HeroChat: React.FC = () => {
  const { t } = useLanguage();
  const [currentSequenceIndex, setCurrentSequenceIndex] = useState(0);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [typingText, setTypingText] = useState('');
  const [showAssistantMessage, setShowAssistantMessage] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [messageStage, setMessageStage] = useState<'typing' | 'preview'>('typing');
  
  const chatRef = useRef<HTMLDivElement>(null);

  // Wrap the chatSequences array in useMemo to prevent it from being recreated on each render
  const chatSequences = useMemo<ChatMessage[][]>(() => [
    [
      {
        user: { 
          nameKey: "chat.sarah.name", 
          messageKey: "chat.sarah.message" 
        },
        assistantKey: "chat.sarah.response",
        preview: {
          type: 'timeline',
          content: {
            timeline: [
              {
                titleKey: "chat.sarah.timeline.design.title",
                descriptionKey: "chat.sarah.timeline.design.desc",
                icon: <Target className="h-4 w-4 text-blue-400" />
              },
              {
                titleKey: "chat.sarah.timeline.dev.title",
                descriptionKey: "chat.sarah.timeline.dev.desc",
                icon: <Code className="h-4 w-4 text-blue-400" />
              },
              {
                titleKey: "chat.sarah.timeline.launch.title",
                descriptionKey: "chat.sarah.timeline.launch.desc",
                icon: <Rocket className="h-4 w-4 text-blue-400" />
              }
            ]
          }
        }
      }
    ],
    [
      {
        user: { 
          nameKey: "chat.marcus.name", 
          messageKey: "chat.marcus.message" 
        },
        assistantKey: "chat.marcus.response",
        preview: {
          type: 'features',
          content: {
            features: [
              {
                titleKey: "chat.marcus.features.ai.title",
                descriptionKey: "chat.marcus.features.ai.desc",
                icon: <Brain className="h-4 w-4 text-blue-400" />
              },
              {
                titleKey: "chat.marcus.features.startup.title",
                descriptionKey: "chat.marcus.features.startup.desc",
                icon: <Zap className="h-4 w-4 text-blue-400" />
              },
              {
                titleKey: "chat.marcus.features.analytics.title",
                descriptionKey: "chat.marcus.features.analytics.desc",
                icon: <Sparkles className="h-4 w-4 text-blue-400" />
              }
            ]
          }
        }
      }
    ],
    [
      {
        user: {
          nameKey: "chat.elena.name",
          messageKey: "chat.elena.message"
        },
        assistantKey: "chat.elena.response",
        preview: {
          type: 'features',
          content: {
            features: [
              {
                titleKey: "chat.elena.features.shopping.title",
                descriptionKey: "chat.elena.features.shopping.desc",
                icon: <ShoppingCart className="h-4 w-4 text-blue-400" />
              },
              {
                titleKey: "chat.elena.features.analytics.title",
                descriptionKey: "chat.elena.features.analytics.desc",
                icon: <Brain className="h-4 w-4 text-blue-400" />
              },
              {
                titleKey: "chat.elena.features.integration.title",
                descriptionKey: "chat.elena.features.integration.desc",
                icon: <Code className="h-4 w-4 text-blue-400" />
              }
            ]
          }
        }
      }
    ],
    [
      {
        user: {
          nameKey: "chat.james.name",
          messageKey: "chat.james.message"
        },
        assistantKey: "chat.james.response",
        preview: {
          type: 'timeline',
          content: {
            timeline: [
              {
                titleKey: "chat.james.timeline.ux.title",
                descriptionKey: "chat.james.timeline.ux.desc",
                icon: <Target className="h-4 w-4 text-blue-400" />
              },
              {
                titleKey: "chat.james.timeline.features.title",
                descriptionKey: "chat.james.timeline.features.desc",
                icon: <ClipboardList className="h-4 w-4 text-blue-400" />
              },
              {
                titleKey: "chat.james.timeline.analytics.title",
                descriptionKey: "chat.james.timeline.analytics.desc",
                icon: <Sparkles className="h-4 w-4 text-blue-400" />
              }
            ]
          }
        }
      }
    ],
    [
      {
        user: {
          nameKey: "chat.lisa.name",
          messageKey: "chat.lisa.message"
        },
        assistantKey: "chat.lisa.response",
        preview: {
          type: 'features',
          content: {
            features: [
              {
                titleKey: "chat.lisa.features.analysis.title",
                descriptionKey: "chat.lisa.features.analysis.desc",
                icon: <Lightbulb className="h-4 w-4 text-blue-400" />
              },
              {
                titleKey: "chat.lisa.features.strategy.title",
                descriptionKey: "chat.lisa.features.strategy.desc",
                icon: <Target className="h-4 w-4 text-blue-400" />
              },
              {
                titleKey: "chat.lisa.features.implementation.title",
                descriptionKey: "chat.lisa.features.implementation.desc",
                icon: <ClipboardList className="h-4 w-4 text-blue-400" />
              }
            ]
          }
        }
      }
    ],
    [
      {
        user: {
          nameKey: "chat.david.name",
          messageKey: "chat.david.message"
        },
        assistantKey: "chat.david.response",
        preview: {
          type: 'features',
          content: {
            features: [
              {
                titleKey: "chat.david.features.voice.title",
                descriptionKey: "chat.david.features.voice.desc",
                icon: <MessageSquare className="h-4 w-4 text-blue-400" />
              },
              {
                titleKey: "chat.david.features.ai.title",
                descriptionKey: "chat.david.features.ai.desc",
                icon: <Brain className="h-4 w-4 text-blue-400" />
              },
              {
                titleKey: "chat.david.features.organization.title",
                descriptionKey: "chat.david.features.organization.desc",
                icon: <Bot className="h-4 w-4 text-blue-400" />
              }
            ]
          }
        }
      }
    ],
    [
      {
        user: {
          nameKey: "chat.rachel.name",
          messageKey: "chat.rachel.message"
        },
        assistantKey: "chat.rachel.response",
        preview: {
          type: 'timeline',
          content: {
            timeline: [
              {
                titleKey: "chat.rachel.timeline.engine.title",
                descriptionKey: "chat.rachel.timeline.engine.desc",
                icon: <Brain className="h-4 w-4 text-blue-400" />
              },
              {
                titleKey: "chat.rachel.timeline.workflow.title",
                descriptionKey: "chat.rachel.timeline.workflow.desc",
                icon: <ClipboardList className="h-4 w-4 text-blue-400" />
              },
              {
                titleKey: "chat.rachel.timeline.analytics.title",
                descriptionKey: "chat.rachel.timeline.analytics.desc",
                icon: <Sparkles className="h-4 w-4 text-blue-400" />
              }
            ]
          }
        }
      }
    ]
  ], []); // Empty dependency array as these chat sequences are static

  const startChatSequence = useCallback(() => {
    const currentSequence = chatSequences[currentSequenceIndex];
    
    if (currentMessageIndex < currentSequence.length && !isAnimating) {
      setIsAnimating(true);
      setIsTyping(true);
      setTypingText('');
      setShowAssistantMessage(true);
      setMessageStage('typing');
      
      setTimeout(() => {
        setIsTyping(false);
        let currentText = '';
        const message = t(currentSequence[currentMessageIndex].assistantKey);
        let currentIndex = 0;

        const typeText = () => {
          if (currentIndex < message.length) {
            currentText = message.substring(0, currentIndex + 1);
            setTypingText(currentText);
            currentIndex++;
            setTimeout(typeText, 45);
          } else {
            setTimeout(() => {
              setMessageStage('preview');
              setTimeout(() => {
                setShowAssistantMessage(false);
                setCurrentMessageIndex(0);
                setTypingText('');
                setCurrentSequenceIndex((prev) => 
                  prev === chatSequences.length - 1 ? 0 : prev + 1
                );
                setIsAnimating(false);
              }, 5000);
            }, 800);
          }
        };

        typeText();
      }, 1500);
    }
  }, [currentSequenceIndex, currentMessageIndex, isAnimating, t, chatSequences]);

  useEffect(() => {
    if (!isAnimating) {
      startChatSequence();
    }
  }, [isAnimating, startChatSequence]);

  const renderTimelinePreview = (timeline: TimelineItem[]) => (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-3"
    >
      {timeline.map((item, index) => (
        <div key={index} className="flex items-start gap-3">
          <div className="mt-1">{item.icon}</div>
          <div>
            <div className="font-medium text-sm text-gray-900 dark:text-gray-100">{t(item.titleKey)}</div>
            <div className="text-xs text-gray-700 dark:text-gray-300">{t(item.descriptionKey)}</div>
          </div>
        </div>
      ))}
    </motion.div>
  );

  const renderFeaturesPreview = (features: FeatureItem[]) => (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="grid grid-cols-1 gap-4"
    >
      {features.map((feature, index) => (
        <div key={index} className="space-y-1">
          <div className="flex items-center gap-2">
            {feature.icon}
            <div className="font-medium text-sm text-gray-900 dark:text-gray-100">{t(feature.titleKey)}</div>
          </div>
          <div className="text-xs text-gray-700 dark:text-gray-300 ml-6">{t(feature.descriptionKey)}</div>
        </div>
      ))}
    </motion.div>
  );

  const renderPreview = (preview: Preview) => {
    switch (preview.type) {
      case 'timeline':
        return preview.content.timeline && renderTimelinePreview(preview.content.timeline);
      case 'features':
        return preview.content.features && renderFeaturesPreview(preview.content.features);
      default:
        return null;
    }
  };

  const currentSequence = chatSequences[currentSequenceIndex];
  const currentMessage = currentSequence[currentMessageIndex];

  return (
    <div 
      ref={chatRef}
      className="relative w-full bg-none backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-none dark:border-gray-800 h-full"
    >
      {/* Container with minimum height to prevent layout shifts */}
      <div className="min-h-[400px] flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div 
            key={`user-${currentSequenceIndex}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
            className="flex items-start gap-2 md:gap-3 justify-end mb-3 md:mb-4"
          >
            <div className="space-y-1">
              <div className="text-xs text-gray-400 dark:text-gray-500 text-right">
                {t(currentMessage.user.nameKey)}
              </div>
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl rounded-tr-none px-3 md:px-4 py-2 text-xs md:text-sm inline-block shadow-lg shadow-blue-500/20">
                {t(currentMessage.user.messageKey)}
              </div>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 rounded-full p-1.5 hidden sm:block">
              <User className="h-3 w-3 md:h-4 md:w-4 text-blue-400" />
            </div>
          </motion.div>

          {showAssistantMessage && (
            <motion.div 
              key={`assistant-${currentSequenceIndex}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.5 }}
              className="flex items-start gap-2 md:gap-3"
            >
              <div className="h-6 w-6 md:h-7 md:w-7 flex-shrink-0 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 p-1.5 shadow-lg shadow-blue-500/20">
                <Send className="h-3 w-3 md:h-4 md:w-4 text-white" />
              </div>
              <div className="space-y-2 md:space-y-3 max-w-[85%]">
                <div className="bg-gray-100 dark:bg-gray-800 backdrop-blur-sm rounded-2xl rounded-tl-none px-3 md:px-4 py-2 text-xs md:text-sm text-gray-900 dark:text-gray-100 shadow-lg border border-gray-200 dark:border-gray-700">
                  {isTyping ? (
                    <motion.span 
                      className="flex items-center gap-1"
                      initial={{ opacity: 0.5 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                    >
                      <span className="h-1 w-1 md:h-1.5 md:w-1.5 rounded-full bg-blue-400 animate-bounce"></span>
                      <span className="h-1 w-1 md:h-1.5 md:w-1.5 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                      <span className="h-1 w-1 md:h-1.5 md:w-1.5 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                    </motion.span>
                  ) : (
                    <span>{typingText}</span>
                  )}
                </div>
                {messageStage === 'preview' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className="bg-gray-100 dark:bg-gray-800 backdrop-blur-md rounded-2xl p-3 md:p-4 transform duration-500 border border-gray-200 dark:border-gray-700 shadow-lg"
                  >
                    {renderPreview(currentMessage.preview)}
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default HeroChat;