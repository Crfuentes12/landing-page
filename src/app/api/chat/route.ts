// app/api/chat/route.ts
import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { PriceResponseSchema } from '@/types/price';
import { z } from 'zod';
import type { ChatCompletionMessageParam } from 'openai/resources/chat/completions';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

interface PriceRange {
  min: number;
  max: number;
}

interface Timeline {
  min: number;
  max: number;
  unit: 'weeks' | 'days' | 'months';
}

interface AIResponse {
  message: string;
  priceRange: PriceRange;
  confidence: 'high' | 'medium' | 'low';
  requirements: string[];
  timeline: Timeline;
}

const PRICE_RANGES = [
  { min: 8000, max: 10000 }, // Initial
  { min: 7000, max: 8500 },  // After requirements
  { min: 6500, max: 8000 },  // After timeline
  { min: 6000, max: 7000 },  // After features
  { min: 5500, max: 6500 },  // After optimization
  { min: 5000, max: 5500 }   // Final target
];

const SYSTEM_PROMPT = `You are a friendly AI sales assistant specialized in MVP development for startups and businesses. Your goal is to help potential clients understand the value and cost of building their MVP.

CORE PRINCIPLES:
1. Be direct and conversational
2. Focus on the IMMEDIATE last message
3. Stay relevant to the current topic
4. Guide users towards sharing project details

RESPONSE PATTERNS:
For greetings/casual chat:
- Keep it brief and friendly
- Try to learn about their project
- Don't dive into pricing yet

For project discussions:
- Show genuine interest
- Ask specific questions
- Provide relevant pricing
- Suggest practical features

For technical questions:
- Give clear, concise answers
- Focus on MVP context
- Highlight quick delivery
- Emphasize scalability

PRICING STRATEGY:
- Start high ($8k-$10k)
- Reduce based on scope
- Target $5k-$5.5k final
- Always justify changes

Your response must be a valid JSON matching this structure:
{
  "message": "Your friendly, direct response to the last message",
  "priceRange": {
    "min": number,
    "max": number
  },
  "confidence": "high",
  "requirements": ["First requirement", "Second requirement"],
  "timeline": {
    "min": 4,
    "max": 6,
    "unit": "weeks"
  }
}`;

function isProjectRelatedMessage(message: string): boolean {
  const projectKeywords = [
    'project', 'app', 'website', 'build', 'develop', 'feature',
    'platform', 'system', 'application', 'mvp', 'product',
    'solution', 'software', 'timeline', 'budget', 'cost',
    'functionality', 'requirements', 'api', 'database',
    'mobile', 'web', 'design', 'development', 'integration',
    'saas', 'startup', 'business', 'company', 'enterprise'
  ];

  const lowercaseMessage = message.toLowerCase();
  return projectKeywords.some(keyword => lowercaseMessage.includes(keyword));
}

function determineProjectStage(message: string): number {
  const messageWords = message.toLowerCase().split(' ');
  let stage = 0;

  // Check for deeper project discussions
  if (messageWords.some(word => ['features', 'functionality', 'requirements'].includes(word))) {
    stage = Math.min(stage + 1, PRICE_RANGES.length - 1);
  }

  // Check for timeline/scope discussions
  if (messageWords.some(word => ['timeline', 'scope', 'schedule', 'time'].includes(word))) {
    stage = Math.min(stage + 1, PRICE_RANGES.length - 1);
  }

  // Check for budget/price discussions
  if (messageWords.some(word => ['budget', 'price', 'cost', 'money'].includes(word))) {
    stage = Math.min(stage + 1, PRICE_RANGES.length - 1);
  }

  return stage;
}

function getPriceForMessage(message: string): PriceRange {
  if (!isProjectRelatedMessage(message)) {
    return PRICE_RANGES[0];
  }

  const stage = determineProjectStage(message);
  return PRICE_RANGES[stage];
}

function getContextForLastMessage(lastMessage: string): string {
  const isProject = isProjectRelatedMessage(lastMessage);
  const stage = determineProjectStage(lastMessage);
  const priceRange = getPriceForMessage(lastMessage);

  return `
Current Message Context:
- Is Project Related: ${isProject}
- Discussion Stage: ${stage}
- Price Range: $${priceRange.min}-$${priceRange.max}
- Message: "${lastMessage}"

Remember to provide a direct and relevant response to this specific message.`;
}

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();
    const lastMessage = messages[messages.length - 1];

    const messageContext = getContextForLastMessage(lastMessage.content);
    const priceRange = getPriceForMessage(lastMessage.content);

    const conversation: ChatCompletionMessageParam[] = [
      {
        role: 'system',
        content: `${SYSTEM_PROMPT}\n\n${messageContext}`
      },
      {
        role: 'user',
        content: lastMessage.content
      }
    ];

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: conversation,
      temperature: 0.7,
      max_tokens: 500,
      response_format: { type: "json_object" }
    });

    const aiResponse = completion.choices[0].message.content;
    
    if (!aiResponse) {
      throw new Error('No response from AI');
    }

    const parsedResponse = JSON.parse(aiResponse);
    const validatedResponse = PriceResponseSchema.parse({
      ...parsedResponse,
      priceRange: priceRange // Override with our calculated price
    });

    return NextResponse.json(validatedResponse);

  } catch (error) {
    console.error('API Error:', error);
    
    const fallbackResponse: AIResponse = {
      message: "I'd love to help with your project. Could you tell me more about what you're looking to build?",
      priceRange: PRICE_RANGES[0],
      confidence: "high",
      requirements: ["Initial project scoping"],
      timeline: {
        min: 4,
        max: 6,
        unit: "weeks"
      }
    };

    return NextResponse.json(
      fallbackResponse,
      { status: error instanceof z.ZodError ? 422 : 500 }
    );
  }
}