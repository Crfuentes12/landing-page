// lib/email.ts
import nodemailer from 'nodemailer';
import { ContactSubmission } from '@/types';

// Company email where notifications should be sent
const COMPANY_EMAIL = 'info@sprintlaunchers.com';
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD || 'ProyectoBuscandoPijos-2025';

/**
 * Creates and configures the email transporter with Hostinger settings
 */
function createTransporter() {
  return nodemailer.createTransport({
    host: 'smtp.hostinger.com',
    port: 465,
    secure: true, // Use SSL
    auth: {
      user: COMPANY_EMAIL,
      pass: EMAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false // Accept all certificates for development
    }
  });
}

/**
 * Formats a contact submission into a professional HTML email
 */
function formatHtmlEmail(submission: ContactSubmission): string {
  const submissionDate = new Date(submission.submitted_at).toLocaleString('es-ES', { 
    timeZone: 'Europe/Madrid',
    dateStyle: 'full',
    timeStyle: 'medium'
  });

  return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Nuevo Formulario de Contacto</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
        }
        .header {
          background-color: #4285F4;
          color: white;
          padding: 20px;
          text-align: center;
          border-radius: 5px 5px 0 0;
        }
        .content {
          padding: 20px;
          border: 1px solid #ddd;
          border-top: none;
          border-radius: 0 0 5px 5px;
        }
        .message-box {
          background-color: #f9f9f9;
          border-left: 4px solid #4285F4;
          padding: 15px;
          margin: 20px 0;
        }
        .footer {
          font-size: 12px;
          text-align: center;
          margin-top: 30px;
          padding-top: 10px;
          border-top: 1px solid #eee;
          color: #666;
        }
        .info-row {
          margin-bottom: 10px;
        }
        .info-label {
          font-weight: bold;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>Sprint Launchers</h1>
        <p>Nuevo Formulario de Contacto</p>
      </div>
      <div class="content">
        <div class="info-row">
          <span class="info-label">De:</span> ${submission.email}
        </div>
        <div class="info-row">
          <span class="info-label">Fecha:</span> ${submissionDate}
        </div>
        <div class="info-row">
          <span class="info-label">ID de Referencia:</span> ${submission.id || 'N/A'}
        </div>
        
        <div class="message-box">
          <h3>Mensaje:</h3>
          <p style="white-space: pre-line;">${submission.message}</p>
        </div>
        
        <div class="footer">
          <p>Este es un mensaje automático del sitio web de Sprint Launchers.</p>
          <p>© ${new Date().getFullYear()} Sprint Launchers. Todos los derechos reservados.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

/**
 * Formats a contact submission into a plain text email (fallback)
 */
function formatTextEmail(submission: ContactSubmission): string {
  const submissionDate = new Date(submission.submitted_at).toLocaleString('es-ES', { 
    timeZone: 'Europe/Madrid' 
  });

  return `
    SPRINT LAUNCHERS - NUEVO FORMULARIO DE CONTACTO
    ===============================================
    
    De: ${submission.email}
    Fecha: ${submissionDate}
    ID de Referencia: ${submission.id || 'N/A'}
    
    MENSAJE:
    ${submission.message}
    
    -----------------------------------------------
    Este es un mensaje automático del sitio web de Sprint Launchers.
    © ${new Date().getFullYear()} Sprint Launchers. Todos los derechos reservados.
  `;
}

/**
 * Sends a contact form notification email to the company
 */
export async function sendContactNotificationEmail(submission: ContactSubmission): Promise<boolean> {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: `"Sprint Launchers Website" <${COMPANY_EMAIL}>`,
      to: COMPANY_EMAIL,
      subject: `Nuevo Contacto: ${submission.email}`,
      text: formatTextEmail(submission),
      html: formatHtmlEmail(submission),
      replyTo: submission.email, // Allow direct reply to the contact
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    return true;
  } catch (error) {
    console.error('Failed to send email notification:', error);
    return false;
  }
}