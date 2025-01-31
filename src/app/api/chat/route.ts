// app/api/chat/route.ts
import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { z } from 'zod';
import type { ChatCompletionMessageParam } from 'openai/resources/chat/completions';
import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';
import { INITIAL_PRICE_RANGE, TARGET_PRICE_RANGE, type PriceRange} from '@/lib/constants';


// Initialize Supabase client
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

// Keywords related to different types of projects
const PROJECT_TYPE_KEYWORDS = [
  'web', 'mobile', 'app', 'website', 'application', 'platform', 'system',
  'dashboard', 'e-commerce', 'marketplace', 'saas', 'api', 'backend', 'frontend',
  'crm', 'cms', 'erp', 'iot', 'ai', 'machine learning', 'automation', 
  'data pipeline', 'data warehouse', 'blockchain', 'game', 'software', 
  'low-code', 'no-code', 'plugin', 'extension', 'service'
];

// Keywords related to technical aspects of development
const TECHNICAL_KEYWORDS = [
  'api', 'database', 'cloud', 'security', 'scalability', 'integration',
  'authentication', 'performance', 'microservices', 'architecture',
  'infrastructure', 'deployment', 'testing', 'monitoring', 'analytics',
  'CI/CD', 'load balancing', 'serverless', 'containerization', 'docker',
  'kubernetes', 'graphql', 'websockets', 'caching', 'logging', 'data encryption',
  'firewall', 'DDoS protection', 'backup', 'migration', 'devops',
  'multi-tenancy', 'edge computing', 'distributed computing', 'AI model deployment',
  'vector databases', 'ETL', 'MLops'
];

// Keywords related to core features in applications
const FEATURE_KEYWORDS = [
  'login', 'signup', 'payment', 'search', 'filter', 'notification',
  'messaging', 'profile', 'dashboard', 'admin', 'reporting', 'analytics',
  'integration', 'api', 'authentication', 'user management', 
  'social login', 'two-factor authentication', 'dark mode', 'multilingual support',
  'role-based access', 'file upload', 'media processing', 'AI chatbot',
  'web scraping', 'OCR', 'voice recognition', 'video streaming',
  'push notifications', 'offline mode', 'real-time updates', 'live chat',
  'customizable themes', 'workflow automation', 'collaboration tools',
  'calendar integration', 'content moderation', 'recommendation system'
];

// Keywords related to business, revenue, and growth
const BUSINESS_KEYWORDS = [
  'revenue', 'cost', 'profit', 'customer', 'user', 'market',
  'business', 'monetization', 'subscription', 'pricing', 'sales',
  'marketing', 'growth', 'scale', 'enterprise', 'acquisition',
  'churn', 'conversion rate', 'customer retention', 'funnel',
  'LTV', 'CAC', 'ROI', 'ARPU', 'B2B', 'B2C', 'SaaS metrics',
  'freemium', 'upsell', 'cross-sell', 'partnership', 'affiliates',
  'branding', 'customer loyalty', 'competitor analysis', 'SEO',
  'advertising', 'fundraising', 'investment', 'valuation',
  'venture capital', 'angel investors', 'bootstrapping'
];

// Enhanced type definitions
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
  meaningfulInteractions: number;
}

// Constants
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

// Constants
const ANONYMOUS_SESSION_COOKIE = 'anonymous_session_id';
const MAX_MEANINGFUL_INTERACTIONS = 5; // Number of meaningful interactions before reaching target price

// Information detection class
class InformationDetector {
  private content: string;

  constructor(content: string) {
    this.content = content.toLowerCase();
  }

  private checkKeywords(keywords: string[]): number {
    return keywords.filter(keyword => this.content.includes(keyword)).length;
  }

  isMeaningfulMessage(): boolean {
    const projectTypeMatches = this.checkKeywords(PROJECT_TYPE_KEYWORDS);
    const technicalMatches = this.checkKeywords(TECHNICAL_KEYWORDS);
    const featureMatches = this.checkKeywords(FEATURE_KEYWORDS);
    const businessMatches = this.checkKeywords(BUSINESS_KEYWORDS);

    const totalMatches = projectTypeMatches + technicalMatches + featureMatches + businessMatches;
    return totalMatches > 0;
  }

  getProjectClarity(): number {
    const projectTypeMatches = this.checkKeywords(PROJECT_TYPE_KEYWORDS);
    const featureMatches = this.checkKeywords(FEATURE_KEYWORDS);
    
    return Math.min((projectTypeMatches + featureMatches) * 0.2, 1);
  }

  getTechnicalComplexity(): number {
    const technicalMatches = this.checkKeywords(TECHNICAL_KEYWORDS);
    return Math.min(technicalMatches * 0.2, 1);
  }
}

// Price calculation class with meaningful interaction check
class PriceCalculator {
  private initialRange: PriceRange = INITIAL_PRICE_RANGE;
  private targetRange: PriceRange = TARGET_PRICE_RANGE;
  private context: ConversationContext;

  constructor(context: ConversationContext) {
    this.context = context;
  }

  private calculateProgressivePriceReduction(): PriceRange {
    // Only consider meaningful interactions for price reduction
    const progressFactor = Math.min(
      this.context.meaningfulInteractions / MAX_MEANINGFUL_INTERACTIONS,
      1
    );
    
    const minReduction = (this.initialRange.min - this.targetRange.min) * progressFactor;
    const maxReduction = (this.initialRange.max - this.targetRange.max) * progressFactor;

    return {
      min: Math.max(this.initialRange.min - minReduction, this.targetRange.min),
      max: Math.max(this.initialRange.max - maxReduction, this.targetRange.max)
    };
  }

  private applyProjectClarityDiscount(price: PriceRange): PriceRange {
    const clarityDiscount = 1 - (this.context.projectClarity * 0.1);
    return {
      min: Math.round(price.min * clarityDiscount),
      max: Math.round(price.max * clarityDiscount)
    };
  }

  calculatePrice(): PriceRange {
    let price = this.calculateProgressivePriceReduction();
    price = this.applyProjectClarityDiscount(price);

    // Ensure we never go below target minimum
    return {
      min: Math.max(price.min, this.targetRange.min),
      max: Math.max(price.max, this.targetRange.max)
    };
  }
}

// Enhanced context analyzer with meaningful interaction tracking
class ConversationAnalyzer {
  private messages: ChatCompletionMessageParam[];
  private currentContext: ConversationContext;

  constructor(messages: ChatCompletionMessageParam[], previousContext?: ConversationContext) {
    this.messages = messages;
    this.currentContext = {
      ...previousContext || {
        projectClarity: 0.5,
        technicalComplexity: 0.5,
        clientEngagement: 0.5,
        riskFactors: [],
        conversationProgress: 0,
        priceReductionFactor: 0,
        meaningfulInteractions: 0
      }
    };
  }

  private analyzeMessage(message: ChatCompletionMessageParam): void {
    if (message.role !== 'user' || typeof message.content !== 'string') {
      return;
    }

    const detector = new InformationDetector(message.content);

    // Only update metrics if the message contains meaningful information
    if (detector.isMeaningfulMessage()) {
      this.currentContext.meaningfulInteractions++;
      
      // Update clarity and complexity based on message content
      const newClarity = detector.getProjectClarity();
      const newComplexity = detector.getTechnicalComplexity();
      
      if (newClarity > 0) {
        this.currentContext.projectClarity = Math.min(
          this.currentContext.projectClarity + newClarity,
          1
        );
      }
      
      if (newComplexity > 0) {
        this.currentContext.technicalComplexity = Math.min(
          this.currentContext.technicalComplexity + newComplexity,
          1
        );
      }
    }
  }

  analyze(): ConversationContext {
    // Analyze only the most recent message
    const lastMessage = this.messages[this.messages.length - 1];
    if (lastMessage) {
      this.analyzeMessage(lastMessage);
    }

    // Update general conversation progress
    this.currentContext.conversationProgress = Math.min(
      this.messages.filter(m => m.role !== 'system').length / 2,
      MAX_MEANINGFUL_INTERACTIONS
    );

    return this.currentContext;
  }
}

// Conversation Manager
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

// Main route handler
export async function POST(request: Request) {
  try {
    const { messages: incomingMessages, conversationId, sessionId } = await request.json();
    
    const conversationManager = new ConversationManager(conversationId, sessionId);
    const conversation = await conversationManager.loadConversation();
    const isNewConversation = !conversation;
    
    let messages: ChatCompletionMessageParam[] = [];
    
    if (isNewConversation) {
      messages = [
        { role: 'system', content: SYSTEM_PROMPT },
        ...incomingMessages
      ];
    } else {
      messages = [
        ...conversation.messages,
        ...incomingMessages.filter((msg: ChatCompletionMessageParam) => 
          msg.role !== 'system'
        )
      ];
    }

    // Analyze conversation and calculate new price
    const analyzer = new ConversationAnalyzer(
      messages,
      conversation?.context
    );
    
    const context = analyzer.analyze();
    const priceCalculator = new PriceCalculator(context);
    const priceRange = priceCalculator.calculatePrice();

    // Get AI response
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        ...messages,
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

    // Parse AI response
    const parsedResponse = JSON.parse(aiResponse);
    
    // Update messages with AI's response
    messages.push({
      role: 'assistant',
      content: parsedResponse.message
    });

    // Merge new requirements with existing ones
    const requirements = [
      ...(conversation?.requirements || []),
      ...(parsedResponse.requirements || [])
    ];

    // Save updated conversation
    await conversationManager.saveConversation(
      messages,
      context,
      requirements,
      priceRange
    );

    // Prepare response
    const responseData = {
      ...parsedResponse,
      conversationId: conversationManager.conversationId,
      sessionId: conversationManager.sessionId,
      priceRange,
      context,
      requirements
    };

    // Create response with cookie if needed
    const response = NextResponse.json(responseData);
    
    if (!sessionId) {
      response.cookies.set(ANONYMOUS_SESSION_COOKIE, conversationManager.sessionId, {
        path: '/',
        sameSite: 'lax',
        httpOnly: true
      });
    }

    return response;

  } catch (error) {
    console.error('API Error:', error);
    
    const fallbackSessionId = uuidv4();
    const fallbackResponse = {
      message: "I apologize, but I encountered an error. Could you please try again?",
      priceRange: INITIAL_PRICE_RANGE,
      confidence: 0.5,
      requirements: [],
      timeline: { min: 4, max: 6, unit: "weeks" as const },
      context: {
        projectClarity: 0.5,
        technicalComplexity: 0.5,
        clientEngagement: 0.5,
        riskFactors: [],
        conversationProgress: 0,
        priceReductionFactor: 0,
        meaningfulInteractions: 0
      },
      nextAction: 'gather_info' as const,
      sessionId: fallbackSessionId
    };

    const errorResponse = NextResponse.json(
      fallbackResponse,
      { status: error instanceof z.ZodError ? 422 : 500 }
    );

    errorResponse.cookies.set(ANONYMOUS_SESSION_COOKIE, fallbackSessionId, {
      path: '/',
      sameSite: 'lax',
      httpOnly: true
    });

    return errorResponse;
  }
}