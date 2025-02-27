// lib/email.ts
import nodemailer from 'nodemailer';
import { ContactSubmission } from '@/types';

/**
 * Creates and configures the email transporter with settings from environment variables
 */
function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.EMAIL_SERVER_HOST,
    port: Number(process.env.EMAIL_SERVER_PORT),
    secure: process.env.EMAIL_SERVER_SECURE === 'true', // Use SSL
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    },
    tls: {
      rejectUnauthorized: process.env.NODE_ENV === 'production' // Only reject unauthorized in production
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
        /* Reset styles for email clients */
        body, html {
          margin: 0;
          padding: 0;
          width: 100% !important;
          font-family: Arial, Helvetica, sans-serif;
          line-height: 1.6;
          color: #333333;
        }
        * {
          -ms-text-size-adjust: 100%;
          -webkit-text-size-adjust: 100%;
          box-sizing: border-box;
        }
        table, td {
          mso-table-lspace: 0pt;
          mso-table-rspace: 0pt;
        }
        img {
          -ms-interpolation-mode: bicubic;
          border: 0;
          height: auto;
          line-height: 100%;
          outline: none;
          text-decoration: none;
        }
        /* Main container */
        .email-container {
          max-width: 600px !important;
          margin: 0 auto !important;
          background-color: #ffffff;
        }
        /* Header styles */
        .header {
          background: linear-gradient(45deg, #4285F4, #2B63D9);
          color: white;
          padding: 30px 20px;
          text-align: center;
          border-radius: 8px 8px 0 0;
        }
        .header h1 {
          margin: 0;
          font-size: 28px;
          font-weight: 700;
          letter-spacing: -0.5px;
        }
        .header p {
          margin: 10px 0 0;
          font-size: 16px;
          opacity: 0.9;
        }
        /* Content area */
        .content {
          padding: 30px;
          border: 1px solid #e1e1e8;
          border-top: none;
          border-radius: 0 0 8px 8px;
          background-color: #ffffff;
        }
        /* Info rows */
        .info-section {
          margin-bottom: 25px;
        }
        .info-row {
          margin-bottom: 12px;
          display: block;
        }
        .info-label {
          font-weight: bold;
          color: #555555;
          display: inline-block;
          width: 130px;
        }
        .info-value {
          color: #333333;
        }
        /* Message box */
        .message-box {
          background-color: #f8f9fc;
          border-left: 4px solid #4285F4;
          padding: 20px;
          margin: 25px 0;
          border-radius: 0 4px 4px 0;
        }
        .message-box h3 {
          margin-top: 0;
          color: #4285F4;
          font-size: 18px;
        }
        .message-content {
          white-space: pre-line;
          color: #333333;
          font-size: 15px;
        }
        /* Footer */
        .footer {
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #e1e1e8;
          text-align: center;
          color: #777777;
          font-size: 13px;
        }
        .footer p {
          margin: 5px 0;
        }
        /* Logo */
        .logo-container {
          margin-bottom: 15px;
        }
        .logo {
          max-width: 140px;
          height: auto;
        }
        /* Button */
        .button {
          display: inline-block;
          background-color: #4285F4;
          color: #ffffff !important;
          text-decoration: none;
          font-weight: bold;
          padding: 12px 30px;
          border-radius: 4px;
          margin: 20px 0;
          font-size: 16px;
          text-align: center;
          transition: background-color 0.3s;
        }
        .button:hover {
          background-color: #2B63D9;
        }
        @media screen and (max-width: 600px) {
          .email-container {
            width: 100% !important;
          }
          .content, .header {
            padding: 20px 15px !important;
          }
          .info-label {
            display: block;
            margin-bottom: 4px;
            width: 100%;
          }
        }
      </style>
    </head>
    <body>
      <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" width="100%" class="email-container">
        <tr>
          <td>
            <div class="header">
              <h1>Sprint Launchers</h1>
              <p>Nuevo Formulario de Contacto</p>
            </div>
            
            <div class="content">
              <div class="info-section">
                <div class="info-row">
                  <span class="info-label">De:</span>
                  <span class="info-value">${submission.email}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">Fecha:</span>
                  <span class="info-value">${submissionDate}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">ID de Referencia:</span>
                  <span class="info-value">${submission.id || 'N/A'}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">Estado:</span>
                  <span class="info-value">${submission.status === 'pending' ? 'Pendiente' : 
                                          submission.status === 'contacted' ? 'Contactado' : 
                                          submission.status === 'resolved' ? 'Resuelto' : 'Pendiente'}</span>
                </div>
              </div>
              
              <div class="message-box">
                <h3>Mensaje:</h3>
                <div class="message-content">${submission.message}</div>
              </div>
              
              <a href="${process.env.NEXT_PUBLIC_SITE_URL}/admin/contacts" class="button">
                Ver en el Panel Admin
              </a>
              
              <div class="footer">
                <p>Este es un mensaje automático del sitio web de Sprint Launchers.</p>
                <p>Por favor, no responda directamente a este correo.</p>
                <p>Para contactar con el remitente, utilice la dirección: ${submission.email}</p>
                <p>© ${new Date().getFullYear()} Sprint Launchers. Todos los derechos reservados.</p>
              </div>
            </div>
          </td>
        </tr>
      </table>
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

  const status = submission.status === 'pending' ? 'Pendiente' : 
                submission.status === 'contacted' ? 'Contactado' : 
                submission.status === 'resolved' ? 'Resuelto' : 'Pendiente';

  return `
    SPRINT LAUNCHERS - NUEVO FORMULARIO DE CONTACTO
    ===============================================
    
    De: ${submission.email}
    Fecha: ${submissionDate}
    ID de Referencia: ${submission.id || 'N/A'}
    Estado: ${status}
    
    MENSAJE:
    ${submission.message}
    
    -----------------------------------------------
    Este es un mensaje automático del sitio web de Sprint Launchers.
    Por favor, no responda directamente a este correo.
    Para contactar con el remitente, utilice la dirección: ${submission.email}
    
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
      from: `"Sprint Launchers Website" <${process.env.EMAIL_FROM}>`,
      to: process.env.COMPANY_EMAIL,
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