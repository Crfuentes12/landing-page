// types/index.ts
export type ContactFormData = {
  email: string;
  message: string;
};

export type ContactFormResponse = {
  success: boolean;
  data?: any;
  error?: string;
};

export type ContactSubmission = {
  id?: string;
  email: string;
  message: string;
  status: 'pending' | 'contacted' | 'resolved';
  submitted_at: string;
  updated_at?: string;
};

// Define Supabase database types
export type Database = {
  public: {
    Tables: {
      contact_submissions: {
        Row: {
          id: string;
          email: string;
          message: string;
          status: 'pending' | 'contacted' | 'resolved';
          submitted_at: string;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          email: string;
          message: string;
          status?: 'pending' | 'contacted' | 'resolved';
          submitted_at?: string;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          email?: string;
          message?: string;
          status?: 'pending' | 'contacted' | 'resolved';
          submitted_at?: string;
          updated_at?: string | null;
        };
      };
    };
  };
};