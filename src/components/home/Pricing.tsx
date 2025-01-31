//landing-page/src/components/home/Pricing.tsx
"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
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
  Shield
} from 'lucide-react';
import Lottie from 'lottie-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import typingAnimation from '@/assets/typing-animation.json';

// Enhanced Types
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
  technicalComplexity?: number;
  projectClarity?: number;
  clientEngagement?: number;
  riskFactors: string[];
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
        content: "Hi! I'm here to help you calculate a precise price estimate for your project. Let's start by understanding what you're looking to build. What type of project do you have in mind?",
        timestamp: Date.now()
      }
    ],
    priceRange: { min: 5000, max: 10000 },
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
      riskFactors: []
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

  // Refs
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Initialize session from localStorage
  useEffect(() => {
    const storedSessionId = localStorage.getItem('chat_session_id');
    const storedConversationId = localStorage.getItem('chat_conversation_id');
    
    if (storedSessionId) {
      setChatState(prev => ({
        ...prev,
        sessionId: storedSessionId,
        conversationId: storedConversationId
      }));
    }
  }, []);

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

  // Reset chat
  const handleReset = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Clear stored session and conversation IDs
      localStorage.removeItem('chat_session_id');
      localStorage.removeItem('chat_conversation_id');

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [{ role: 'user', content: 'reset' }],
          sessionId: null,
          conversationId: null
        })
      });

      if (!response.ok) throw new Error('Failed to reset chat');
      const data = await response.json();

      // Store new session and conversation IDs
      localStorage.setItem('chat_session_id', data.sessionId);
      if (data.conversationId) {
        localStorage.setItem('chat_conversation_id', data.conversationId);
      }

      setChatState({
        sessionId: data.sessionId,
        conversationId: data.conversationId,
        messages: [
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
        isLocked: false,
        suggestedQuestions: data.suggestedQuestions || [],
        nextAction: 'gather_info'
      });
      setActiveTab('chat');
    } catch (error) {
      setError('Failed to reset chat. Please try again.');
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

      if (!response.ok) throw new Error('Failed to send message');
      const data = await response.json();

      // Store session and conversation IDs
      if (data.sessionId) {
        localStorage.setItem('chat_session_id', data.sessionId);
      }
      if (data.conversationId) {
        localStorage.setItem('chat_conversation_id', data.conversationId);
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
    } catch (error) {
      setError('Failed to send message. Please try again.');
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

  // Get complexity color based on level
  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'high': return 'text-red-500 bg-red-100';
      case 'medium': return 'text-yellow-500 bg-yellow-100';
      case 'low': return 'text-green-500 bg-green-100';
      default: return 'text-gray-500 bg-gray-100';
    }
  };

  // Get confidence color based on level
  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'text-green-600';
    if (confidence >= 0.5) return 'text-yellow-600';
    return 'text-blue-600';
  };

  // Render requirements section
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

  // Render context section
  const renderContext = () => {
    return (
      <div className="space-y-4">
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

  // Render timeline section
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

  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Get Your Project Estimate
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Chat with our AI assistant to get a precise price estimate for your project.
            We&apos;ll analyze your requirements and provide a detailed breakdown.
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
              // Add error handling in the UI
                {error && (
                  <Alert variant="destructive" className="mx-4 mb-4">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                <TabsContent value="estimate" className="flex-1 mt-0">
                  <div className="space-y-6">
                    {/* Price Display */}
                    <div className="text-center">
                      <h3 className="text-2xl font-bold mb-2">Price Estimate</h3>
                      <div className="text-4xl font-bold text-primary">
                        {formatCurrency(chatState.priceRange.min)} - {formatCurrency(chatState.priceRange.max)}
                      </div>
                    </div>
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
                              Continue providing details to refine the estimate.
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