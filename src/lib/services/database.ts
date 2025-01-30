// lib/services/database.ts
import { supabase } from '@/lib/supabase/client';
import { v4 as uuidv4 } from 'uuid';

export class DatabaseService {
  // Session Management
  static async createSession(userId?: string) {
    const { data, error } = await supabase
      .from('analysis_sessions')
      .insert([{ user_id: userId }])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async getSession(sessionId: string) {
    const { data, error } = await supabase
      .from('analysis_sessions')
      .select(`
        *,
        context_analysis (*),
        price_analysis (*),
        timeline_analysis (*),
        specifications (*),
        chat_messages (*)
      `)
      .eq('id', sessionId)
      .single();

    if (error) throw error;
    return data;
  }

  static async updateSessionLock(sessionId: string, isLocked: boolean) {
    const { data, error } = await supabase
      .from('analysis_sessions')
      .update({ is_locked: isLocked })
      .eq('id', sessionId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Context Analysis
  static async storeContextAnalysis(sessionId: string, analysisData: any, confidenceScore: number) {
    const { data: existing } = await supabase
      .from('context_analysis')
      .select()
      .eq('session_id', sessionId)
      .single();

    if (existing) {
      const { data, error } = await supabase
        .from('context_analysis')
        .update({
          analysis_data: analysisData,
          confidence_score: confidenceScore
        })
        .eq('session_id', sessionId)
        .select()
        .single();

      if (error) throw error;
      return data;
    }

    const { data, error } = await supabase
      .from('context_analysis')
      .insert([{
        session_id: sessionId,
        analysis_data: analysisData,
        confidence_score: confidenceScore
      }])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Price Analysis
  static async storePriceAnalysis(
    sessionId: string,
    priceData: any,
    isConverged: boolean,
    confidenceScore: number
  ) {
    const { data: existing } = await supabase
      .from('price_analysis')
      .select()
      .eq('session_id', sessionId)
      .single();

    if (existing) {
      const { data, error } = await supabase
        .from('price_analysis')
        .update({
          price_data: priceData,
          is_converged: isConverged,
          confidence_score: confidenceScore
        })
        .eq('session_id', sessionId)
        .select()
        .single();

      if (error) throw error;
      return data;
    }

    const { data, error } = await supabase
      .from('price_analysis')
      .insert([{
        session_id: sessionId,
        price_data: priceData,
        is_converged: isConverged,
        confidence_score: confidenceScore
      }])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Timeline Analysis
  static async storeTimelineAnalysis(
    sessionId: string,
    timelineData: any,
    confidenceScore: number
  ) {
    const { data: existing } = await supabase
      .from('timeline_analysis')
      .select()
      .eq('session_id', sessionId)
      .single();

    if (existing) {
      const { data, error } = await supabase
        .from('timeline_analysis')
        .update({
          timeline_data: timelineData,
          confidence_score: confidenceScore
        })
        .eq('session_id', sessionId)
        .select()
        .single();

      if (error) throw error;
      return data;
    }

    const { data, error } = await supabase
      .from('timeline_analysis')
      .insert([{
        session_id: sessionId,
        timeline_data: timelineData,
        confidence_score: confidenceScore
      }])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Specifications
  static async storeSpecifications(sessionId: string, specData: any) {
    const { data: latest } = await supabase
      .from('specifications')
      .select('version')
      .eq('session_id', sessionId)
      .order('version', { ascending: false })
      .limit(1)
      .single();

    const nextVersion = latest ? latest.version + 1 : 1;

    const { data, error } = await supabase
      .from('specifications')
      .insert([{
        session_id: sessionId,
        spec_data: specData,
        version: nextVersion
      }])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Chat Messages
  static async storeChatMessage(
    sessionId: string,
    role: 'user' | 'assistant' | 'system',
    content: string,
    metadata?: any
  ) {
    const { data, error } = await supabase
      .from('chat_messages')
      .insert([{
        session_id: sessionId,
        role,
        content,
        metadata
      }])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async getChatHistory(sessionId: string) {
    const { data, error } = await supabase
      .from('chat_messages')
      .select('*')
      .eq('session_id', sessionId)
      .order('created_at', { ascending: true });

    if (error) throw error;
    return data;
  }

  // Reset Session
  static async resetSession(sessionId: string) {
    const { error } = await supabase
      .from('analysis_sessions')
      .update({
        is_locked: false,
        updated_at: new Date().toISOString()
      })
      .eq('id', sessionId);

    if (error) throw error;

    // Delete all related analyses
    await Promise.all([
      supabase.from('context_analysis').delete().eq('session_id', sessionId),
      supabase.from('price_analysis').delete().eq('session_id', sessionId),
      supabase.from('timeline_analysis').delete().eq('session_id', sessionId),
      supabase.from('specifications').delete().eq('session_id', sessionId),
      supabase.from('chat_messages').delete().eq('session_id', sessionId)
    ]);

    return true;
  }

  // Error handling wrapper
  static handleError(error: any): never {
    console.error('Database Error:', error);
    throw error;
  }
}