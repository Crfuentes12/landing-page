// app/api/contact/route.ts
import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { sendContactNotificationEmail } from '@/lib/email';
import { ContactFormData, ContactSubmission } from '@/types';

export async function POST(request: Request) {
  try {
    // Parse request body
    const formData = await request.json() as ContactFormData;
    const { email, message } = formData;

    // Basic validation
    if (!email || !email.includes('@') || !message || message.trim().length < 3) {
      return NextResponse.json(
        { success: false, error: 'Email and message are required and must be valid' },
        { status: 400 }
      );
    }

    // Create submission object
    const submission: ContactSubmission = {
      email,
      message,
      status: 'pending',
      submitted_at: new Date().toISOString(),
    };

    // Save to Supabase
    const { data, error } = await supabaseAdmin
      .from('contact_submissions')
      .insert([submission])
      .select()
      .single();

    if (error) {
      console.error('Error saving to Supabase:', error);
      
      // Try to send email anyway, even if DB storage failed
      try {
        const emailSent = await sendContactNotificationEmail({
          ...submission,
          id: 'not-saved-' + Date.now() // Generate a temporary ID
        });
        
        if (emailSent) {
          return NextResponse.json({
            success: true,
            warning: 'Failed to save to database, but email was sent',
            error: error.message
          }, { status: 207 }); // Partial success
        }
      } catch (emailError) {
        console.error('Email also failed:', emailError);
      }
      
      return NextResponse.json(
        { success: false, error: 'Failed to save contact submission: ' + error.message },
        { status: 500 }
      );
    }

    // Successfully saved to database, now send email
    const savedSubmission = data as ContactSubmission;
    const emailSent = await sendContactNotificationEmail(savedSubmission);

    if (!emailSent) {
      // Email failed but DB saved
      return NextResponse.json({
        success: true,
        data: savedSubmission,
        warning: 'Your message was saved but email notification failed'
      }, { status: 207 }); // Partial success
    }

    // Everything succeeded
    return NextResponse.json({
      success: true,
      data: savedSubmission,
      message: 'Contact form submitted successfully'
    });
  } catch (error) {
    console.error('Server error processing contact form:', error);
    
    // Generic error response
    return NextResponse.json(
      { 
        success: false, 
        error: 'An unexpected error occurred. Please try again later.' 
      },
      { status: 500 }
    );
  }
}