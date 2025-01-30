//src/types/price.ts
import { z } from 'zod';

export const PriceResponseSchema = z.object({
  message: z.string(),
  priceRange: z.object({
    min: z.number(),
    max: z.number(),
  }),
  requirements: z.array(z.string()),
  confidence: z.enum(['low', 'medium', 'high']),
  timeline: z.object({
    min: z.number(),
    max: z.number(),
    unit: z.enum(['days', 'weeks', 'months'])
  })
});

export type PriceResponse = z.infer<typeof PriceResponseSchema>;

export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
  priceData?: {
    priceRange: {
      min: number;
      max: number;
    };
    requirements?: string[];
    confidence?: 'low' | 'medium' | 'high';
    timeline?: {
      min: number;
      max: number;
      unit: 'days' | 'weeks' | 'months';
    };
  };
}

export interface ChatRequest {
  messages: Message[];
}
export interface PriceRange {
    min: number;
    max: number;
  }
  
  export interface Timeline {
    min: number;
    max: number;
    unit: 'weeks' | 'days' | 'months';
  }
  
  export interface Requirement {
    id: string;
    description: string;
    priority: 'high' | 'medium' | 'low';
    category: 'functional' | 'technical' | 'business' | 'other';
    addedAt: string;
  }
  
  export interface Message {
    role: 'user' | 'assistant' | 'system';
    content: string;
  }
  
  export interface PriceData {
    priceRange: PriceRange;
    confidence?: 'high' | 'medium' | 'low';
    requirements?: Requirement[];
    timeline?: Timeline;
    context?: any;
  }