//landing-page/src/components/home/HeroChat.tsx
"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { User, Send, Target, Code, Rocket, Lightbulb, Sparkles, ShoppingCart, Brain, ClipboardList, MessageSquare, Bot, Zap } from "lucide-react";
import { motion, AnimatePresence } from 'framer-motion';

interface Position {
  x: number;
  y: number;
}

interface TimelineItem {
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface ComparisonItem {
  traditional: string[];
  ourApproach: string[];
}

interface FeatureItem {
  title: string;
  description: string;
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
    name: string;
    message: string;
  };
  assistant: string;
  preview: Preview;
}

const chatSequences: ChatMessage[][] = [
  [
    {
      user: { 
        name: "Sarah Chen", 
        message: "Can you build a mobile-first SaaS platform?" 
      },
      assistant: "We specialize in modern SaaS development. Here's our proven approach to building scalable platforms:",
      preview: {
        type: 'timeline',
        content: {
          timeline: [
            {
              title: "Design Sprint",
              description: "UX research & modern UI design",
              icon: <Target className="h-4 w-4 text-blue-400" />
            },
            {
              title: "Rapid Development",
              description: "Progressive web app build",
              icon: <Code className="h-4 w-4 text-blue-400" />
            },
            {
              title: "Launch",
              description: "3-week MVP deployment",
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
        name: "Marcus Thompson", 
        message: "Looking to build an AI-powered B2B SaaS for startups" 
      },
      assistant: "Perfect timing! We'll create a cutting-edge AI platform tailored for startups. Here's what we deliver:",
      preview: {
        type: 'features',
        content: {
          features: [
            {
              title: "AI Core Integration",
              description: "Custom LLM implementation & API management",
              icon: <Brain className="h-4 w-4 text-blue-400" />
            },
            {
              title: "Startup-Ready Features",
              description: "Multi-tenant architecture & scalable infrastructure",
              icon: <Zap className="h-4 w-4 text-blue-400" />
            },
            {
              title: "Analytics Dashboard",
              description: "Real-time metrics & AI insights",
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
        name: "Elena Rodriguez",
        message: "Need a premium e-commerce platform, not the usual Shopify template"
      },
      assistant: "We'll create a distinctive e-commerce experience that sets you apart. Here's our custom approach:",
      preview: {
        type: 'features',
        content: {
          features: [
            {
              title: "Custom Shopping Experience",
              description: "Unique UI/UX with AR product previews",
              icon: <ShoppingCart className="h-4 w-4 text-blue-400" />
            },
            {
              title: "Advanced Analytics",
              description: "AI-powered customer insights & recommendations",
              icon: <Brain className="h-4 w-4 text-blue-400" />
            },
            {
              title: "Seamless Integration",
              description: "Custom payment & inventory systems",
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
        name: "James Wilson",
        message: "I want to build a habit tracking app with social features"
      },
      assistant: "We'll create an engaging habit tracking platform that keeps users motivated. Here's our development roadmap:",
      preview: {
        type: 'timeline',
        content: {
          timeline: [
            {
              title: "User Experience Design",
              description: "Gamified tracking & social interactions",
              icon: <Target className="h-4 w-4 text-blue-400" />
            },
            {
              title: "Core Features",
              description: "Habit streaks, challenges & social graph",
              icon: <ClipboardList className="h-4 w-4 text-blue-400" />
            },
            {
              title: "Analytics & Insights",
              description: "Progress visualization & AI recommendations",
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
        name: "Lisa Chang",
        message: "Need AI consultancy for our value proposition"
      },
      assistant: "We'll help you leverage AI to create compelling value for your customers. Our consultation process includes:",
      preview: {
        type: 'features',
        content: {
          features: [
            {
              title: "AI Opportunity Analysis",
              description: "Market research & competitive positioning",
              icon: <Lightbulb className="h-4 w-4 text-blue-400" />
            },
            {
              title: "Strategy Workshop",
              description: "AI integration roadmap & ROI projection",
              icon: <Target className="h-4 w-4 text-blue-400" />
            },
            {
              title: "Implementation Guide",
              description: "Technical requirements & resource planning",
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
        name: "David Park",
        message: "Looking to build an AI note-taking app with voice recording"
      },
      assistant: "We'll create a powerful AI-enhanced note-taking platform. Here's what we'll deliver:",
      preview: {
        type: 'features',
        content: {
          features: [
            {
              title: "Voice Recognition",
              description: "Real-time transcription & semantic search",
              icon: <MessageSquare className="h-4 w-4 text-blue-400" />
            },
            {
              title: "AI Processing",
              description: "Auto-summarization & topic extraction",
              icon: <Brain className="h-4 w-4 text-blue-400" />
            },
            {
              title: "Smart Organization",
              description: "AI-powered tagging & categorization",
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
        name: "Rachel Martinez",
        message: "Can you help create a fast content generation platform for our marketing team?"
      },
      assistant: "We'll build an AI-powered content acceleration platform tailored to your brand. Here's our solution:",
      preview: {
        type: 'timeline',
        content: {
          timeline: [
            {
              title: "AI Engine Setup",
              description: "Custom LLM training & brand voice integration",
              icon: <Brain className="h-4 w-4 text-blue-400" />
            },
            {
              title: "Content Workflow",
              description: "Templates, scheduling & approval system",
              icon: <ClipboardList className="h-4 w-4 text-blue-400" />
            },
            {
              title: "Analytics Suite",
              description: "Performance tracking & content optimization",
              icon: <Sparkles className="h-4 w-4 text-blue-400" />
            }
          ]
        }
      }
    }
  ]
];

const HeroChat: React.FC<{ position: Position; setPosition: (position: Position) => void }> = ({ position, setPosition }) => {
  const [currentSequenceIndex, setCurrentSequenceIndex] = useState(0);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [typingText, setTypingText] = useState('');
  const [showAssistantMessage, setShowAssistantMessage] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [messageStage, setMessageStage] = useState<'typing' | 'preview'>('typing');
  
  const chatRef = useRef<HTMLDivElement>(null);

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
        const message = currentSequence[currentMessageIndex].assistant;
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
  }, [currentSequenceIndex, currentMessageIndex, isAnimating]);

  useEffect(() => {
    if (!isAnimating) {
      startChatSequence();
    }

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      
      const moveX = (clientX - centerX) / 35;
      const moveY = (clientY - centerY) / 35;
      
      setPosition({ x: moveX, y: moveY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isAnimating, setPosition, startChatSequence]);

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
            <div className="font-medium text-sm text-gray-900 dark:text-gray-100">{item.title}</div>
            <div className="text-xs text-gray-700 dark:text-gray-300">{item.description}</div>
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
            <div className="font-medium text-sm text-gray-900 dark:text-gray-100">{feature.title}</div>
          </div>
          <div className="text-xs text-gray-700 dark:text-gray-300 ml-6">{feature.description}</div>
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
      className="relative w-full max-w-md"
      style={{
        transform: `perspective(2000px) rotateY(${position.x}deg) rotateX(${-position.y}deg)`,
        transition: 'transform 0.2s ease-out'
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div 
          key={`user-${currentSequenceIndex}`}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
          className="flex items-start gap-3 justify-end mb-4"
        >
          <div className="space-y-1">
            <div className="text-xs text-gray-400 dark:text-gray-500 text-right">{currentMessage.user.name}</div>
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl rounded-tr-none px-4 py-2 text-sm inline-block shadow-lg shadow-blue-500/20">
              {currentMessage.user.message}
            </div>
          </div>
          <div className="bg-gray-100 dark:bg-gray-800 rounded-full p-1.5">
            <User className="h-4 w-4 text-blue-400" />
          </div>
        </motion.div>

        {showAssistantMessage && (
          <motion.div 
            key={`assistant-${currentSequenceIndex}`}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.5 }}
            className="flex items-start gap-3"
          >
            <div className="h-7 w-7 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 p-1.5 shadow-lg shadow-blue-500/20">
              <Send className="h-4 w-4 text-white" />
            </div>
            <div className="space-y-3 max-w-[85%]">
              <div className="bg-gray-100 dark:bg-gray-800 backdrop-blur-sm rounded-2xl rounded-tl-none px-4 py-2 text-sm text-gray-900 dark:text-gray-100 shadow-lg border border-gray-200 dark:border-gray-700">
                {isTyping ? (
                  <motion.span 
                    className="flex items-center gap-1"
                    initial={{ opacity: 0.5 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-bounce"></span>
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '0.4s' }}></span>
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
                  className="bg-gray-100 dark:bg-gray-800 backdrop-blur-md rounded-2xl p-4 transform duration-500 border border-gray-200 dark:border-gray-700 shadow-lg"
                >
                  {renderPreview(currentMessage.preview)}
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HeroChat;