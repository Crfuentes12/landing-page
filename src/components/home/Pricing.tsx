//landing-page/src/components/home/Pricing.tsx
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { 
  Send, 
  RefreshCw, 
  Lock,
  Info,
  BarChart2,
  CheckCircle2,
  Building2,
  Cpu,
  Timer,
  Shield,
  TrendingDown
} from 'lucide-react';
import Lottie from 'lottie-react';
import typingAnimation from '@/assets/typing-animation.json';

// Constants
const INITIAL_PRICE_RANGE = { min: 10000, max: 15000 };
const TARGET_PRICE_RANGE = { min: 5000, max: 5300 };

interface PriceRange {
  min: number;
  max: number;
}

interface Timeline {
  min: number;
  max: number;
  unit: 'weeks' | 'days' | 'months';
}

interface ProjectRequirement {
  description: string;
  complexity: 'low' | 'medium' | 'high';
  impact: number;
}

interface ConversationContext {
  projectType?: string;
  industry?: string;
  scale?: 'startup' | 'small' | 'medium' | 'enterprise';
  technicalComplexity: number;
  projectClarity: number;
  clientEngagement: number;
  riskFactors: string[];
  conversationProgress: number;
  priceReductionFactor: number;
}

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
}

interface ChatState {
  sessionId: string | null;
  conversationId: string | null;
  messages: Message[];
  priceRange: PriceRange;
  confidence: number;
  requirements: ProjectRequirement[];
  timeline: Timeline;
  context: ConversationContext;
  isLocked: boolean;
  suggestedQuestions: string[];
  nextAction: 'gather_info' | 'refine_price' | 'finalize' | 'locked' | null;
}

const Pricing = () => {
  // State management
  const [chatState, setChatState] = useState<ChatState>({
    sessionId: null,
    conversationId: null,
    messages: [
      {
        role: 'assistant',
        content: "Hi! I'm here to help you get a competitive price for your project. Our standard development rates typically start at $10,000-$15,000, but through our conversation, I'll help identify ways to optimize the scope and reduce costs significantly. What type of project are you looking to build?",
        timestamp: Date.now()
      }
    ],
    priceRange: INITIAL_PRICE_RANGE,
    confidence: 0.5,
    requirements: [],
    timeline: {
      min: 4,
      max: 6,
      unit: 'weeks'
    },
    context: {
      projectClarity: 0.5,
      technicalComplexity: 0.5,
      clientEngagement: 0.5,
      riskFactors: [],
      conversationProgress: 0,
      priceReductionFactor: 0
    },
    isLocked: false,
    suggestedQuestions: [],
    nextAction: 'gather_info'
  });

  // Local state
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('chat');
  const [isClient, setIsClient] = useState(false);
  const [previousPrice, setPreviousPrice] = useState<PriceRange>(INITIAL_PRICE_RANGE);

  // Refs
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Storage helpers
  const getStorageValue = (key: string): string | null => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(key);
    }
    return null;
  };

  const setStorageValue = (key: string, value: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, value);
    }
  };

  const removeStorageValue = (key: string) => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(key);
    }
  };

  // Set isClient to true once component mounts
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Initialize session from localStorage
  useEffect(() => {
    if (isClient) {
      const storedSessionId = getStorageValue('chat_session_id');
      const storedConversationId = getStorageValue('chat_conversation_id');
      
      if (storedSessionId) {
        setChatState(prev => ({
          ...prev,
          sessionId: storedSessionId,
          conversationId: storedConversationId
        }));
      }
    }
  }, [isClient]);

  // Track price changes for animation
  useEffect(() => {
    if (chatState.priceRange.min !== previousPrice.min || 
        chatState.priceRange.max !== previousPrice.max) {
      setPreviousPrice(chatState.priceRange);
    }
  }, [chatState.priceRange, previousPrice]);

  // Auto-scroll chat
  useEffect(() => {
    if (chatContainerRef.current) {
      const scrollContainer = chatContainerRef.current;
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
  }, [chatState.messages]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(
        Math.max(textareaRef.current.scrollHeight, 40),
        160
      )}px`;
    }
  }, [inputMessage]);

  // Helper Functions
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const calculateSavings = () => {
    const initialTotal = INITIAL_PRICE_RANGE.max;
    const currentTotal = chatState.priceRange.max;
    const savings = initialTotal - currentTotal;
    const savingsPercentage = (savings / initialTotal) * 100;
    return {
      amount: savings,
      percentage: savingsPercentage
    };
  };

  // Reset chat
  const handleReset = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      removeStorageValue('chat_session_id');
      removeStorageValue('chat_conversation_id');

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [{ role: 'user', content: 'reset' }],
          sessionId: null,
          conversationId: null
        })
      });

      if (!response.ok) {
        throw new Error('Failed to reset chat');
      }
      
      const data = await response.json();

      if (isClient) {
        if (data.sessionId) {
          setStorageValue('chat_session_id', data.sessionId);
        }
        if (data.conversationId) {
          setStorageValue('chat_conversation_id', data.conversationId);
        }
      }

      setChatState({
        sessionId: data.sessionId,
        conversationId: data.conversationId,
        messages: [
          {
            role: 'assistant',
            content: "Hi! I'm here to help you get a competitive price for your project. Our standard development rates typically start at $10,000-$15,000, but through our conversation, I'll help identify ways to optimize the scope and reduce costs significantly. What type of project are you looking to build?",
            timestamp: Date.now()
          }
        ],
        priceRange: INITIAL_PRICE_RANGE,
        confidence: 0.5,
        requirements: [],
        timeline: data.timeline,
        context: {
          projectClarity: 0.5,
          technicalComplexity: 0.5,
          clientEngagement: 0.5,
          riskFactors: [],
          conversationProgress: 0,
          priceReductionFactor: 0
        },
        isLocked: false,
        suggestedQuestions: data.suggestedQuestions || [],
        nextAction: 'gather_info'
      });
      setPreviousPrice(INITIAL_PRICE_RANGE);
      setActiveTab('chat');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to reset chat';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Send message
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
          })),
          sessionId: chatState.sessionId,
          conversationId: chatState.conversationId
        })
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }
      
      const data = await response.json();

      if (isClient) {
        if (data.sessionId) {
          setStorageValue('chat_session_id', data.sessionId);
        }
        if (data.conversationId) {
          setStorageValue('chat_conversation_id', data.conversationId);
        }
      }

      setChatState(prev => ({
        ...prev,
        sessionId: data.sessionId,
        conversationId: data.conversationId,
        messages: [
          ...prev.messages,
          newMessage,
          {
            role: 'assistant',
            content: data.message,
            timestamp: Date.now()
          }
        ],
        priceRange: data.priceRange,
        confidence: data.confidence,
        requirements: data.requirements,
        timeline: data.timeline,
        context: data.context,
        isLocked: data.nextAction === 'locked',
        suggestedQuestions: data.suggestedQuestions || [],
        nextAction: data.nextAction || null
      }));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to send message';
      setError(errorMessage);
      setChatState(prev => ({
        ...prev,
        messages: [...prev.messages, newMessage]
      }));
    } finally {
      setIsLoading(false);
    }
  };

  // Handle key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // UI Helper Functions
  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'high': return 'text-red-500 bg-red-100';
      case 'medium': return 'text-yellow-500 bg-yellow-100';
      case 'low': return 'text-green-500 bg-green-100';
      default: return 'text-gray-500 bg-gray-100';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'text-green-600';
    if (confidence >= 0.5) return 'text-yellow-600';
    return 'text-blue-600';
  };

  // Render functions
  const renderPriceDisplay = () => {
    const savings = calculateSavings();
    return (
      <div className="space-y-4">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-2">Price Estimate</h3>
          <div className="text-4xl font-bold text-primary">
            {formatCurrency(chatState.priceRange.min)} - {formatCurrency(chatState.priceRange.max)}
          </div>
          {savings.amount > 0 && (
            <div className="mt-2 text-green-600 flex items-center justify-center gap-1">
              <TrendingDown className="h-4 w-4" />
              <span className="text-sm">
                Saved {formatCurrency(savings.amount)} ({Math.round(savings.percentage)}%)
              </span>
            </div>
          )}
        </div>
        {/* Original market rate display */}
        <div className="text-center text-sm text-muted-foreground">
          <p>Market rate: {formatCurrency(INITIAL_PRICE_RANGE.min)} - {formatCurrency(INITIAL_PRICE_RANGE.max)}</p>
        </div>
      </div>
    );
  };

  const renderRequirements = () => {
    if (!chatState.requirements.length) {
      return (
        <div className="text-center text-muted-foreground p-4">
          No requirements gathered yet. Continue the conversation to identify project requirements.
        </div>
      );
    }
    return (
      <div className="space-y-3">
        {chatState.requirements.map((req, index) => (
          <div key={index} className="p-3 bg-muted rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <Badge variant="outline" className={getComplexityColor(req.complexity)}>
                {req.complexity.toUpperCase()}
              </Badge>
              <span className="text-sm text-muted-foreground">
                Impact: {Math.round(req.impact * 100)}%
              </span>
            </div>
            <p className="text-sm">{req.description}</p>
          </div>
        ))}
      </div>
    );
  };

  const renderContext = () => {
    const progressPercentage = (chatState.context.conversationProgress || 0) * 100;
    
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Info className="h-5 w-5 text-muted-foreground" />
          <div>
            <div className="text-sm font-medium">Conversation Progress</div>
            <Progress value={progressPercentage} className="h-2 w-32" />
            <div className="text-xs text-muted-foreground mt-1">
              {Math.round(progressPercentage)}% Complete
            </div>
          </div>
        </div>
        {chatState.context.projectType && (
          <div className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-muted-foreground" />
            <div>
              <div className="text-sm font-medium">Project Type</div>
              <div className="text-sm text-muted-foreground">{chatState.context.projectType}</div>
            </div>
          </div>
        )}
        {chatState.context.industry && (
          <div className="flex items-center gap-2">
            <BarChart2 className="h-5 w-5 text-muted-foreground" />
            <div>
              <div className="text-sm font-medium">Industry</div>
              <div className="text-sm text-muted-foreground">{chatState.context.industry}</div>
            </div>
          </div>
        )}
        <div className="flex items-center gap-2">
          <Cpu className="h-5 w-5 text-muted-foreground" />
          <div>
            <div className="text-sm font-medium">Technical Complexity</div>
            <Progress 
              value={(chatState.context.technicalComplexity || 0) * 100} 
              className="h-2 w-32"
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-muted-foreground" />
          <div>
            <div className="text-sm font-medium">Risk Factors</div>
            <div className="flex flex-wrap gap-2 mt-1">
              {chatState.context.riskFactors.length > 0 ? (
                chatState.context.riskFactors.map((risk, index) => (
                  <Badge key={index} variant="outline" className="text-yellow-600 bg-yellow-50">
                    {risk}
                  </Badge>
                ))
              ) : (
                <span className="text-sm text-muted-foreground">No risk factors identified</span>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderTimeline = () => {
    return (
      <div className="flex items-center gap-2">
        <Timer className="h-5 w-5 text-muted-foreground" />
        <div>
          <div className="text-sm font-medium">Estimated Timeline</div>
          <div className="text-sm text-muted-foreground">
            {chatState.timeline.min}-{chatState.timeline.max} {chatState.timeline.unit}
          </div>
        </div>
      </div>
    );
  };

  // Only render after client-side hydration
  if (!isClient) {
    return null;
  }

  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Get Your Project Estimate
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our AI assistant helps optimize your project scope to provide the most competitive pricing.
            Standard market rates start at {formatCurrency(INITIAL_PRICE_RANGE.min)}, but through smart planning,
            we can significantly reduce costs while maintaining quality.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Chat Section */}
          <Card className="h-[600px] flex flex-col">
            <CardContent className="flex flex-col h-full p-0">
              {/* Messages Container */}
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
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{message.content}</p>
                      <span className="text-xs opacity-50 mt-1 block">
                        {new Date(message.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="rounded-lg p-3 w-24 h-24">
                      <Lottie
                        animationData={typingAnimation}
                        loop={true}
                        className="w-full h-full"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Error Alert */}
              {error && (
                <Alert variant="destructive" className="mx-4 mb-4">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* Suggested Questions */}
              {!chatState.isLocked && chatState.suggestedQuestions.length > 0 && (
                <div className="p-4 border-t">
                  <p className="text-sm text-muted-foreground mb-2">Suggested questions:</p>
                  <div className="flex flex-wrap gap-2">
                    {chatState.suggestedQuestions.map((question, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="text-sm"
                        onClick={() => setInputMessage(question)}
                      >
                        {question}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input Area */}
              <div className="border-t p-4 bg-background">
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
                    className="flex-1 resize-none rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50"
                    rows={1}
                  />
                  <div className="flex gap-2">
                    {chatState.isLocked ? (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            onClick={handleReset}
                            disabled={isLoading}
                            variant="outline"
                          >
                            <RefreshCw className="h-5 w-5" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          Start a new estimation
                        </TooltipContent>
                      </Tooltip>
                    ) : (
                      <Button
                        onClick={handleSendMessage}
                        disabled={isLoading || !inputMessage.trim()}
                      >
                        <Send className="h-5 w-5" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Analysis Section */}
          <Card className="h-[600px]">
            <CardContent className="p-6">
              <Tabs defaultValue="estimate" className="h-full flex flex-col">
                <TabsList className="mb-4">
                  <TabsTrigger 
                    value="estimate" 
                    onClick={() => setActiveTab('estimate')}
                    className={activeTab === 'estimate' ? 'font-medium' : ''}
                  >
                    Estimate
                  </TabsTrigger>
                  <TabsTrigger 
                    value="requirements"
                    onClick={() => setActiveTab('requirements')}
                    className={activeTab === 'requirements' ? 'font-medium' : ''}
                  >
                    Requirements
                  </TabsTrigger>
                  <TabsTrigger 
                    value="analysis"
                    onClick={() => setActiveTab('analysis')}
                    className={activeTab === 'analysis' ? 'font-medium' : ''}
                  >
                    Analysis
                  </TabsTrigger>
                </TabsList>

                {error && (
                  <Alert variant="destructive" className="mb-4">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <TabsContent value="estimate" className="flex-1 mt-0">
                  <div className="space-y-6">
                    {renderPriceDisplay()}
                    
                    {/* Confidence Indicator */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Estimate Confidence</span>
                        <span className={`text-sm font-medium ${getConfidenceColor(chatState.confidence)}`}>
                          {Math.round(chatState.confidence * 100)}%
                        </span>
                      </div>
                      <Progress value={chatState.confidence * 100} className="h-2" />
                    </div>

                    {/* Timeline */}
                    {renderTimeline()}

                    {/* Status Indicators */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <BarChart2 className="h-5 w-5 text-muted-foreground" />
                        <span className="text-sm">
                          Estimation Status:
                          {chatState.isLocked ? (
                            <span className="text-green-600 ml-1">Complete</span>
                          ) : (
                            <span className="text-blue-600 ml-1">In Progress</span>
                          )}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Lock className="h-5 w-5 text-muted-foreground" />
                        <span className="text-sm">
                          Chat Status:
                          {chatState.isLocked ? (
                            <span className="text-green-600 ml-1">Locked</span>
                          ) : (
                            <span className="text-blue-600 ml-1">Active</span>
                          )}
                        </span>
                      </div>
                    </div>

                    {/* Information Box */}
                    <div className="mt-auto">
                      <Alert>
                        <AlertDescription>
                          {chatState.isLocked ? (
                            <>
                              <CheckCircle2 className="h-4 w-4 inline-block mr-2 text-green-600" />
                              Estimation complete! Press reset to start a new estimation.
                            </>
                          ) : (
                            <>
                              <Info className="h-4 w-4 inline-block mr-2" />
                              Continue the conversation to optimize your price further.
                            </>
                          )}
                        </AlertDescription>
                      </Alert>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="requirements" className="flex-1 mt-0">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Project Requirements</h3>
                    <div className="overflow-y-auto max-h-[400px]">
                      {renderRequirements()}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="analysis" className="flex-1 mt-0">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Project Analysis</h3>
                    <div className="overflow-y-auto max-h-[400px]">
                      {renderContext()}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Pricing;