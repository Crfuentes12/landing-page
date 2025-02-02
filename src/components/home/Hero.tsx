//landing-page/src/components/home/Hero.tsx
"use client";

import { useState, useEffect, useRef, JSX } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowDown, User, Send, Target, Code, Rocket, Calendar, Lightbulb } from "lucide-react";
import { useScroll } from "@/providers/scroll-provider";
import { useTheme } from "@/providers/theme-provider";
import { useLanguage } from "@/providers/language-provider";

interface Stat {
  label: string;
  value: string;
  accent: string;
}

interface TimelineItem {
  title: string;
  description: string;
  icon: JSX.Element;
}

interface ComparisonItem {
  traditional: string[];
  ourApproach: string[];
}

interface FeatureItem {
  title: string;
  description: string;
  icon: JSX.Element;
}

interface PreviewContent {
  timeline?: TimelineItem[];
  comparison?: ComparisonItem;
  features?: FeatureItem[];
}

interface Preview {
  type: 'timeline' | 'comparison' | 'features';
  content: PreviewContent;
}

interface ChatMessage {
  user: {
    name: string;
    message: string;
  };
  assistant: string;
  preview: Preview;
}

const stats: Stat[] = [
  { label: 'hero.stats.mvps', value: '10+', accent: 'from-[#4285F4] to-[#2B63D9]' },
  { label: 'hero.stats.experience', value: '12+', accent: 'from-[#4285F4] to-[#2B63D9]' },
  { label: 'hero.stats.clients', value: '50+', accent: 'from-[#4285F4] to-[#2B63D9]' },
  { label: 'hero.stats.team', value: '2', accent: 'from-[#4285F4] to-[#2B63D9]' }
];

const createChatSequences = (t: (key: string) => string): ChatMessage[][] => [
  [
    {
      user: { 
        name: t('chat.sarah.name'), 
        message: t('chat.sarah.message') 
      },
      assistant: t('chat.sarah.response'),
      preview: {
        type: 'timeline',
        content: {
          timeline: [
            {
              title: t('chat.sarah.timeline.discovery.title'),
              description: t('chat.sarah.timeline.discovery.desc'),
              icon: <Target className="h-5 w-5 text-[#4285F4]" />
            },
            {
              title: t('chat.sarah.timeline.mvp.title'),
              description: t('chat.sarah.timeline.mvp.desc'),
              icon: <Code className="h-5 w-5 text-[#4285F4]" />
            },
            {
              title: t('chat.sarah.timeline.launch.title'),
              description: t('chat.sarah.timeline.launch.desc'),
              icon: <Rocket className="h-5 w-5 text-[#4285F4]" />
            }
          ]
        }
      }
    }
  ],
  [
    {
      user: { 
        name: t('chat.alex.name'), 
        message: t('chat.alex.message')
      },
      assistant: t('chat.alex.response'),
      preview: {
        type: 'features',
        content: {
          features: [
            {
              title: t('chat.alex.features.ai.title'),
              description: t('chat.alex.features.ai.desc'),
              icon: <Lightbulb className="h-5 w-5 text-[#4285F4]" />
            },
            {
              title: t('chat.alex.features.dev.title'),
              description: t('chat.alex.features.dev.desc'),
              icon: <Calendar className="h-5 w-5 text-[#4285F4]" />
            },
            {
              title: t('chat.alex.features.arch.title'),
              description: t('chat.alex.features.arch.desc'),
              icon: <Code className="h-5 w-5 text-[#4285F4]" />
            }
          ]
        }
      }
    }
  ],
  [
    {
      user: { 
        name: t('chat.michael.name'), 
        message: t('chat.michael.message')
      },
      assistant: t('chat.michael.response'),
      preview: {
        type: 'comparison',
        content: {
          comparison: {
            traditional: [
              t('chat.michael.comp.trad.1'),
              t('chat.michael.comp.trad.2'),
              t('chat.michael.comp.trad.3'),
              t('chat.michael.comp.trad.4')
            ],
            ourApproach: [
              t('chat.michael.comp.our.1'),
              t('chat.michael.comp.our.2'),
              t('chat.michael.comp.our.3'),
              t('chat.michael.comp.our.4')
            ]
          }
        }
      }
    }
  ]
];

const Hero = () => {
  const [chatVisible, setChatVisible] = useState<boolean>(true);
  const [currentSequenceIndex, setCurrentSequenceIndex] = useState<number>(0);
  const [currentMessageIndex, setCurrentMessageIndex] = useState<number>(0);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const [typingText, setTypingText] = useState<string>('');
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  const chatRef = useRef<HTMLDivElement>(null);
  const { scrollToSection } = useScroll();
  const { theme } = useTheme();
  const { t } = useLanguage();

  const chatSequences = createChatSequences(t);

  useEffect(() => {
    startChatSequence();

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      
      const moveX = (clientX - centerX) / 50;
      const moveY = (clientY - centerY) / 50;
      
      setPosition({ x: moveX, y: moveY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    // Reset chat sequence when language changes
    setCurrentSequenceIndex(0);
    setCurrentMessageIndex(0);
    setTypingText('');
    setChatVisible(true);
    setShowPreview(false);
    startChatSequence();
  }, [t]);

  const startChatSequence = () => {
    const currentSequence = chatSequences[currentSequenceIndex];
    
    if (currentMessageIndex < currentSequence.length) {
      setIsTyping(true);
      setTypingText('');
      
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
            setTimeout(typeText, 40);
          } else {
            setTimeout(() => {
              setShowPreview(true);
              setTimeout(() => {
                if (currentMessageIndex < currentSequence.length - 1) {
                  setCurrentMessageIndex(prev => prev + 1);
                  setShowPreview(false);
                  setTypingText('');
                  startChatSequence();
                } else {
                  setTimeout(() => {
                    setShowPreview(false);
                    setChatVisible(false);
                    setTimeout(() => {
                      setCurrentMessageIndex(0);
                      setTypingText('');
                      setCurrentSequenceIndex((prev) => 
                        prev === chatSequences.length - 1 ? 0 : prev + 1
                      );
                      setChatVisible(true);
                      startChatSequence();
                    }, 500);
                  }, 2000);
                }
              }, 3000);
            }, 500);
          }
        };

        typeText();
      }, 1500);
    }
  };

  const renderTimelinePreview = (timeline: TimelineItem[]) => (
    <div className="space-y-4">
      {timeline.map((item, index) => (
        <div key={index} className="flex items-start gap-4">
          <div className="mt-1">{item.icon}</div>
          <div>
            <div className="font-semibold text-base text-white">{item.title}</div>
            <div className="text-base text-white/70">{item.description}</div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderComparisonPreview = (comparison: ComparisonItem) => (
    <div className="grid grid-cols-2 gap-8 text-base">
      <div className="space-y-3">
        <div className="font-semibold text-red-400">{t('chat.comparison.traditional')}</div>
        {comparison.traditional.map((item, index) => (
          <div key={index} className="flex items-center gap-3 text-white/70">
            <div className="h-2 w-2 rounded-full bg-red-400" />
            {item}
          </div>
        ))}
      </div>
      <div className="space-y-3">
        <div className="font-semibold text-emerald-400">{t('chat.comparison.our')}</div>
        {comparison.ourApproach.map((item, index) => (
          <div key={index} className="flex items-center gap-3 text-white/70">
            <div className="h-2 w-2 rounded-full bg-emerald-400" />
            {item}
          </div>
        ))}
      </div>
    </div>
  );

  const renderFeaturesPreview = (features: FeatureItem[]) => (
    <div className="grid grid-cols-1 gap-6">
      {features.map((feature, index) => (
        <div key={index} className="space-y-2">
          <div className="flex items-center gap-3">
            {feature.icon}
            <div className="font-semibold text-base text-white">{feature.title}</div>
          </div>
          <div className="text-base text-white/70 ml-8">{feature.description}</div>
        </div>
      ))}
    </div>
  );

  const renderPreview = (preview: Preview) => {
    switch (preview.type) {
      case 'timeline':
        return preview.content.timeline && renderTimelinePreview(preview.content.timeline);
      case 'comparison':
        return preview.content.comparison && renderComparisonPreview(preview.content.comparison);
      case 'features':
        return preview.content.features && renderFeaturesPreview(preview.content.features);
      default:
        return null;
    }
  };

  const currentSequence = chatSequences[currentSequenceIndex];

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center px-6 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background/80" />
      
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 grid grid-cols-12 gap-px">
          {Array.from({ length: 144 }).map((_, i) => (
            <div 
              key={i}
              className="bg-[#4285F4] transition-opacity duration-1000"
              style={{
                opacity: Math.random() * 0.9,
                transitionDelay: `${Math.random() * 2000}ms`
              }}
            />
          ))}
        </div>
      </div>
      
      <div className="relative z-10 w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left side - Main content */}
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              <span className="block text-[#4285F4]">{t('hero.title.fast')}</span>
              <span>{t('hero.title.mvp')}</span>
            </h1>
            
            <p className="text-xl text-muted-foreground">
              {t('hero.description')}
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg" 
              className="bg-[#4285F4] hover:bg-[#2B63D9] text-white group transition-all duration-300 text-lg py-6"
              onClick={() => scrollToSection('pricing')}
            >
              {t('hero.button.estimate')}
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-[#4285F4] text-[#4285F4] hover:bg-[#4285F4]/10 transition-all duration-300 text-lg py-6"
              onClick={() => scrollToSection('about')}
            >
              {t('hero.button.learnMore')}
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className={`text-3xl font-bold bg-gradient-to-r ${stat.accent} bg-clip-text text-transparent`}>
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground mt-1">{t(stat.label)}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right side - Chat simulation */}
        <div 
          ref={chatRef}
          className="bg-black rounded-lg border border-[#4285F4]/20 overflow-hidden shadow-xl"
          style={{
            transform: `perspective(2000px) rotateY(${position.x * 0.5}deg) rotateX(${-position.y * 0.5}deg)`,
            transition: 'transform 0.3s ease-out'
          }}
        >
          {/* Chat header */}
          <div className="flex items-center gap-2 px-4 py-3 bg-black/50 border-b border-[#4285F4]/20">
            <div className="h-3 w-3 rounded-full bg-red-500"></div>
            <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
            <div className="h-3 w-3 rounded-full bg-green-500"></div>
            <div className="ml-4 text-sm text-white/50">{t('chat.header')}</div>
          </div>

          <div className="p-6 h-[36rem] overflow-y-auto space-y-8">
            <div className={`transition-opacity duration-500 ${chatVisible ? 'opacity-100' : 'opacity-0'}`}>
              {currentSequence.slice(0, currentMessageIndex + 1).map((message, index) => (
              <div key={index} className="space-y-6">
                {/* User message */}
                <div className="flex items-start gap-4 justify-end">
                  <div className="space-y-2 text-right">
                    <div className="text-sm text-white/70">{message.user.name}</div>
                    <div className="bg-[#4285F4] text-white rounded-2xl rounded-tr-none p-4 text-lg inline-block shadow-lg">
                      {message.user.message}
                    </div>
                  </div>
                  <div className="bg-white/10 rounded-full p-2">
                    <User className="h-6 w-6 text-[#4285F4]" />
                  </div>
                </div>

                {/* Assistant response */}
                {(index < currentMessageIndex || !isTyping) && (
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#4285F4] to-[#2B63D9] p-2">
                      <Send className="h-6 w-6 text-white" />
                    </div>
                    <div className="space-y-4 max-w-[85%]">
                      <div className="bg-white/10 backdrop-blur-sm rounded-2xl rounded-tl-none p-4 text-lg text-white shadow-lg">
                        {message.assistant}
                      </div>
                      {showPreview && index === currentMessageIndex && (
                        <div className="bg-white/5 rounded-2xl p-6 transform transition-all duration-500 border border-white/10 shadow-lg">
                          {renderPreview(message.preview)}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Typing indicator */}
                {index === currentMessageIndex && isTyping && (
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#4285F4] to-[#2B63D9] p-2">
                      <Send className="h-6 w-6 text-white" />
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl rounded-tl-none p-4 text-lg text-white shadow-lg max-w-[85%]">
                      {typingText}
                      <span className="inline-block align-middle ml-2">
                        <span className="inline-flex gap-1">
                          <span className="h-2 w-2 rounded-full bg-[#4285F4] animate-bounce"></span>
                          <span className="h-2 w-2 rounded-full bg-[#4285F4] animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                          <span className="h-2 w-2 rounded-full bg-[#4285F4] animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                        </span>
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
            </div>
          </div>

          {/* Chat input box */}
          <div className="p-6 bg-gradient-to-b from-transparent to-gray-900">
            <div className="flex items-center gap-3 px-6 py-4 rounded-xl bg-white/5 border border-white/10 shadow-lg">
              <input 
                type="text" 
                disabled 
                placeholder={t('hero.chat.placeholder')}
                className="flex-1 bg-transparent outline-none text-lg text-white placeholder:text-white/30"
              />
              <Button 
                size="icon"
                className="bg-[#4285F4] hover:bg-[#2B63D9] h-10 w-10 rounded-xl"
                disabled
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button 
        onClick={() => scrollToSection('about')}
        className="absolute bottom-8 animate-bounce z-10 transform transition-transform duration-800 hover:scale-110"
        aria-label="Scroll to About section"
      >
        <ArrowDown className="h-8 w-8 text-[#4285F4]" />
      </button>

      {/* Custom animations styles */}
      <style jsx global>{`
        @keyframes slideUp {
          0% { transform: translateY(20px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        .animate-slideUp {
          animation: slideUp 0.5s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default Hero;