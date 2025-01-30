// app/api/chat/route.ts
import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { z } from 'zod';
import type { ChatCompletionMessageParam } from 'openai/resources/chat/completions';
import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import { v4 as uuidv4 } from 'uuid';

// Initialize Supabase client
console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Is set' : 'Not set');
console.log('Supabase Key:', process.env.SUPABASE_SERVICE_KEY ? 'Is set' : 'Not set');

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL environment variable');
}

if (!process.env.SUPABASE_SERVICE_KEY) {
  throw new Error('Missing SUPABASE_SERVICE_KEY environment variable');
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Enhanced type definitions for database
interface ConversationRecord {
  id: string;
  user_id: string;
  messages: ChatCompletionMessageParam[];
  context: ConversationContext;
  requirements: ProjectRequirement[];
  last_price_range: PriceRange;
  created_at: string;
  updated_at: string;
}

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

interface AIResponse {
  message: string;
  priceRange: PriceRange;
  confidence: number;
  requirements: ProjectRequirement[];
  timeline: Timeline;
  context: ConversationContext;
  suggestedQuestions?: string[];
  nextAction?: 'gather_info' | 'refine_price' | 'finalize' | 'locked';
  sessionId?: string;
}

// Constants for anonymous session management
const ANONYMOUS_SESSION_COOKIE = 'anonymous_session_id';

// Existing constants
const TECHNICAL_KEYWORDS = [
  'api', 'database', 'cloud', 'security', 'scalability', 'integration',
  'authentication', 'performance', 'microservices', 'architecture',
  'infrastructure', 'deployment', 'testing', 'monitoring', 'analytics'
];

const BUSINESS_KEYWORDS = [
  'revenue', 'users', 'customers', 'market', 'competition', 'strategy',
  'growth', 'scaling', 'monetization', 'conversion', 'retention',
  'acquisition', 'pricing', 'subscription', 'b2b', 'b2c'
];

const INDUSTRY_SECTORS = [
  'finance', 'healthcare', 'education', 'retail', 'ecommerce',
  'logistics', 'manufacturing', 'technology', 'media', 'entertainment',
  'real estate', 'automotive', 'energy', 'agriculture', 'government'
];

// Conversation Manager for Supabase with anonymous session support
class ConversationManager {
  private _conversationId: string;
  private _sessionId: string;

  constructor(conversationId?: string, sessionId?: string) {
    this._conversationId = conversationId || uuidv4();
    this._sessionId = sessionId || uuidv4();
  }

  get conversationId(): string {
    return this._conversationId;
  }

  get sessionId(): string {
    return this._sessionId;
  }

  async loadConversation(): Promise<ConversationRecord | null> {
    const { data, error } = await supabase
      .from('conversations')
      .select()
      .eq('id', this.conversationId)
      .eq('user_id', this.sessionId)
      .single();

    if (error) {
      console.error('Error loading conversation:', error);
      return null;
    }

    return data;
  }

  async saveConversation(
    messages: ChatCompletionMessageParam[],
    context: ConversationContext,
    requirements: ProjectRequirement[],
    priceRange: PriceRange
  ): Promise<void> {
    const timestamp = new Date().toISOString();
    const conversationData = {
      id: this.conversationId,
      user_id: this.sessionId,
      messages,
      context,
      requirements,
      last_price_range: priceRange,
      updated_at: timestamp
    };

    const { error } = await supabase
      .from('conversations')
      .upsert({
        ...conversationData,
        created_at: timestamp
      })
      .eq('id', this.conversationId);

    if (error) {
      console.error('Error saving conversation:', error);
      throw error;
    }
  }
}

// Price calculation class
class PriceCalculator {
  private basePrice = { min: 5000, max: 10000 };
  private context: ConversationContext;
  private requirements: ProjectRequirement[];

  constructor() {
    this.context = {
      projectClarity: 0.5,
      technicalComplexity: 0.5,
      clientEngagement: 0.5,
      riskFactors: []
    };
    this.requirements = [];
  }

  private calculateComplexityMultiplier(): number {
    const technicalFactor = this.context.technicalComplexity || 0.5;
    const clarityFactor = this.context.projectClarity || 0.5;
    const riskFactor = Math.max(0.1, 1 - (this.context.riskFactors.length * 0.1));
    
    return 1 + ((technicalFactor + (1 - clarityFactor)) * riskFactor);
  }

  private calculateScaleMultiplier(): number {
    switch (this.context.scale) {
      case 'enterprise': return 1.5;
      case 'medium': return 1.25;
      case 'small': return 1.1;
      default: return 1.0;
    }
  }

  private calculateRequirementsImpact(): number {
    if (!this.requirements.length) return 1;
    
    const avgComplexity = this.requirements.reduce((sum, req) => {
      const complexityValue = { low: 0.5, medium: 1, high: 1.5 }[req.complexity];
      return sum + (complexityValue * req.impact);
    }, 0) / this.requirements.length;

    return 1 + (avgComplexity * 0.5);
  }

  updateContext(newContext: Partial<ConversationContext>) {
    this.context = { ...this.context, ...newContext };
  }

  updateRequirements(requirements: ProjectRequirement[]) {
    this.requirements = requirements;
  }

  calculatePrice(): PriceRange {
    const complexityMultiplier = this.calculateComplexityMultiplier();
    const scaleMultiplier = this.calculateScaleMultiplier();
    const requirementsMultiplier = this.calculateRequirementsImpact();

    const finalMultiplier = complexityMultiplier * scaleMultiplier * requirementsMultiplier;

    return {
      min: Math.round(this.basePrice.min * finalMultiplier),
      max: Math.round(this.basePrice.max * finalMultiplier)
    };
  }
}

// Conversation analysis class
class ConversationAnalyzer {
  private messages: ChatCompletionMessageParam[];
  private currentContext: ConversationContext;

  constructor(messages: ChatCompletionMessageParam[]) {
    this.messages = messages;
    this.currentContext = {
      projectClarity: 0.5,
      technicalComplexity: 0.5,
      clientEngagement: 0.5,
      riskFactors: [],
      projectType: undefined,
      industry: undefined,
      scale: undefined
    };
  }

  private analyzeMessage(message: string): Partial<ConversationContext> {
    const lowercase = message.toLowerCase();
    
    // Technical complexity analysis
    const technicalTerms = TECHNICAL_KEYWORDS.filter(term => 
      lowercase.includes(term)
    );
    
    const technicalComplexity = Math.min(
      technicalTerms.length / TECHNICAL_KEYWORDS.length,
      1
    );

    // Project clarity analysis
    const hasSpecificRequirements = /specific|exact|precise|clear|defined/i.test(message);
    const hasUncertainty = /maybe|perhaps|might|possibly|not sure|unclear/i.test(message);
    const projectClarity = hasSpecificRequirements ? 0.8 : hasUncertainty ? 0.3 : 0.5;

    // Industry detection
    const industry = INDUSTRY_SECTORS.find(sector => 
      lowercase.includes(sector)
    );

    // Scale detection
    let scale: ConversationContext['scale'] | undefined;
    if (lowercase.includes('enterprise')) scale = 'enterprise';
    else if (lowercase.includes('medium')) scale = 'medium';
    else if (lowercase.includes('small')) scale = 'small';
    else if (lowercase.includes('startup')) scale = 'startup';

    // Risk factors analysis
    const riskFactors: string[] = [];
    if (lowercase.includes('urgent')) riskFactors.push('tight timeline');
    if (lowercase.includes('complex')) riskFactors.push('high complexity');
    if (lowercase.includes('integration')) riskFactors.push('integration requirements');
    if (lowercase.includes('scale')) riskFactors.push('scalability needs');

    return {
      technicalComplexity,
      projectClarity,
      industry,
      scale,
      riskFactors
    };
  }

  private generateRequirements(message: string): ProjectRequirement[] {
    const requirements: ProjectRequirement[] = [];
    
    // Extract potential requirements using keyword analysis
    const sentences = message.split(/[.!?]+/);
    
    for (const sentence of sentences) {
      const lowercase = sentence.toLowerCase();
      
      // Check for requirement indicators
      if (lowercase.includes('need') || 
          lowercase.includes('want') || 
          lowercase.includes('should') ||
          lowercase.includes('must')) {
        
        // Determine complexity
        const complexity = lowercase.includes('complex') || 
                         lowercase.includes('sophisticated') ? 'high' :
                         lowercase.includes('simple') || 
                         lowercase.includes('basic') ? 'low' : 'medium';
        
        // Calculate impact based on emphasis and context
        const impact = lowercase.includes('critical') || 
                      lowercase.includes('important') ? 0.8 :
                      lowercase.includes('nice to have') ? 0.3 : 0.5;
        
        requirements.push({
          description: sentence.trim(),
          complexity,
          impact
        });
      }
    }

    return requirements;
  }

  private generateSuggestedQuestions(): string[] {
    const context = this.currentContext;
    const questions: string[] = [];

    if (!context.projectType) {
      questions.push("What type of project are you looking to build?");
    }

    if (!context.industry) {
      questions.push("Which industry is this project focused on?");
    }

    const projectClarity = context.projectClarity ?? 0.5;
    if (projectClarity < 0.7) {
      questions.push("Could you describe your specific requirements in more detail?");
    }

    const technicalComplexity = context.technicalComplexity ?? 0;
    if (technicalComplexity > 0.7 && questions.length < 3) {
      questions.push("Would you like to discuss the technical architecture in more detail?");
    }

    return questions;
  }

  analyze(): {
    context: ConversationContext;
    requirements: ProjectRequirement[];
    suggestedQuestions: string[];
  } {
    const lastMessage = this.messages[this.messages.length - 1];
    if (!lastMessage || typeof lastMessage.content !== 'string') {
      return {
        context: this.currentContext,
        requirements: [],
        suggestedQuestions: []
      };
    }

    const messageAnalysis = this.analyzeMessage(lastMessage.content);
    const requirements = this.generateRequirements(lastMessage.content);

    // Update current context
    this.currentContext = {
      ...this.currentContext,
      ...messageAnalysis,
      riskFactors: [...new Set([
        ...this.currentContext.riskFactors,
        ...(messageAnalysis.riskFactors || [])
      ])]
    };

    return {
      context: this.currentContext,
      requirements,
      suggestedQuestions: this.generateSuggestedQuestions()
    };
  }
}

// Response Schema
// Define base schemas for reuse
const PriceRangeSchema = z.object({
  min: z.number(),
  max: z.number()
});

const TimelineSchema = z.object({
  min: z.number(),
  max: z.number(),
  unit: z.enum(['weeks', 'days', 'months'])
});

const RequirementSchema = z.object({
  description: z.string(),
  complexity: z.enum(['low', 'medium', 'high']),
  impact: z.number()
});

const ContextSchema = z.object({
  projectType: z.string().optional(),
  industry: z.string().optional(),
  scale: z.enum(['startup', 'small', 'medium', 'enterprise']).optional(),
  technicalComplexity: z.number(),
  projectClarity: z.number(),
  clientEngagement: z.number(),
  riskFactors: z.array(z.string())
});

// Response Schema modifications to include sessionId
const PriceResponseSchema = z.object({
  message: z.string(),
  priceRange: PriceRangeSchema,
  confidence: z.number(),
  requirements: z.array(RequirementSchema).default([]),
  timeline: TimelineSchema,
  context: ContextSchema,
  suggestedQuestions: z.array(z.string()).default([]),
  nextAction: z.enum(['gather_info', 'refine_price', 'finalize', 'locked']).default('gather_info'),
  sessionId: z.string().optional()
});

// Enhanced system prompt
const SYSTEM_PROMPT = `You are an AI sales assistant specialized in MVP development pricing. Your responses should be natural and conversational while gathering important project details. Focus on understanding the following aspects:

1. Project Scope & Requirements
2. Technical Complexity
3. Business Context
4. Timeline Constraints
5. Integration Requirements
6. Scalability Needs

Guidelines:
- Maintain a natural conversation flow
- Ask relevant follow-up questions
- Provide insights and suggestions
- Adjust pricing based on revealed complexity
- Be transparent about assumptions
- Focus on value proposition

Your response must be a valid JSON matching this EXACT structure:
{
  "message": "Your response message here",
  "confidence": 0.5,
  "timeline": {
    "min": 4,
    "max": 6,
    "unit": "weeks"
  },
  "requirements": [
    {
      "description": "Requirement description",
      "complexity": "low",
      "impact": 0.5
    }
  ],
  "suggestedQuestions": [
    "What type of project are you looking to build?",
    "Which industry is this project focused on?"
  ],
  "nextAction": "gather_info"
}

IMPORTANT:
- message: Must always be a string with your response
- confidence: Must be a number between 0 and 1
- timeline: Must always include min, max, and unit
- requirements: Array of requirements (can be empty)
- nextAction: Must be one of: "gather_info", "refine_price", "finalize", "locked"
`;

// Main route handler with anonymous session support
export async function POST(request: Request) {
  try {
    const { messages, conversationId, sessionId } = await request.json();
    
    // Get or create anonymous session ID
    const cookieStore = await cookies();
    let currentSessionId = sessionId;

    if (!currentSessionId) {
      const sessionCookie = cookieStore.get(ANONYMOUS_SESSION_COOKIE);
      currentSessionId = sessionCookie?.value || uuidv4();
      
      // Set the session cookie if it's new
      if (!sessionCookie) {
        const response = new Response();
        response.headers.set('Set-Cookie', `${ANONYMOUS_SESSION_COOKIE}=${currentSessionId}; Path=/; SameSite=Lax; HttpOnly`);
      }
    }

    // Initialize conversation manager with session support
    const conversationManager = new ConversationManager(conversationId, currentSessionId);
    
    // Load existing conversation if conversationId is provided
    let existingConversation = null;
    if (conversationId) {
      existingConversation = await conversationManager.loadConversation();
    }
    
    // Initialize analysis tools with existing context if available
    const analyzer = new ConversationAnalyzer(
      existingConversation?.messages || messages
    );
    const priceCalculator = new PriceCalculator();
    
    // Analyze conversation
    const analysis = analyzer.analyze();
    
    // Update price calculator with analysis results
    priceCalculator.updateContext(analysis.context);
    priceCalculator.updateRequirements(analysis.requirements);
    
    // Calculate new price range
    const priceRange = priceCalculator.calculatePrice();

    // Prepare conversation for OpenAI
    const conversation: ChatCompletionMessageParam[] = [
      {
        role: 'system',
        content: `${SYSTEM_PROMPT}\n\nCurrent Context: ${JSON.stringify(analysis.context, null, 2)}`
      },
      ...(existingConversation?.messages || messages)
    ];

    // Get AI response
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        ...conversation,
        {
          role: 'system',
          content: 'Remember to respond with valid JSON only. No other text before or after the JSON.'
        }
      ],
      temperature: 0.7,
      max_tokens: 500
    });

    const aiResponse = completion.choices[0].message.content;
    
    if (!aiResponse) {
      throw new Error('No response from AI');
    }

    // Parse and validate response
    const parsedResponse = JSON.parse(aiResponse);
    const validatedResponse = PriceResponseSchema.parse({
      ...parsedResponse,
      priceRange,
      context: analysis.context,
      requirements: analysis.requirements,
      suggestedQuestions: analysis.suggestedQuestions,
      sessionId: conversationManager.sessionId
    });

    // Save conversation to Supabase
    await conversationManager.saveConversation(
      conversation,
      analysis.context,
      analysis.requirements,
      priceRange
    );

    // Create the response with proper headers
    const response = NextResponse.json({
      ...validatedResponse,
      conversationId: conversationManager.conversationId,
      sessionId: conversationManager.sessionId
    });

    // Set session cookie if it's new
    if (!sessionId) {
      response.cookies.set(ANONYMOUS_SESSION_COOKIE, currentSessionId, {
        path: '/',
        sameSite: 'lax',
        httpOnly: true
      });
    }

    return response;

  } catch (error) {
    console.error('API Error:', error);
    
    // Generate a new session ID for fallback response
    const fallbackSessionId = uuidv4();
    
    // Provide fallback response
    const fallbackResponse: AIResponse = {
      message: "I'd love to help with your project. Could you tell me more about what you're looking to build?",
      priceRange: { min: 5000, max: 10000 },
      confidence: 0.5,
      requirements: [],
      timeline: {
        min: 4,
        max: 6,
        unit: "weeks"
      },
      context: {
        projectClarity: 0.5,
        technicalComplexity: 0.5,
        clientEngagement: 0.5,
        riskFactors: []
      },
      suggestedQuestions: [
        "What type of project are you looking to build?",
        "Which industry is this project focused on?",
        "Do you have any specific requirements in mind?"
      ],
      nextAction: 'gather_info',
      sessionId: fallbackSessionId
    };

    // Create error response with cookie
    const errorResponse = NextResponse.json(
      fallbackResponse,
      { status: error instanceof z.ZodError ? 422 : 500 }
    );

    // Set session cookie for fallback
    errorResponse.cookies.set(ANONYMOUS_SESSION_COOKIE, fallbackSessionId, {
      path: '/',
      sameSite: 'lax',
      httpOnly: true
    });

    return errorResponse;
  }
}