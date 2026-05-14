import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import logger from './logger.js';

dotenv.config();

// Using names from your snippet for compatibility
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NODEMAILER_EMAIL || process.env.SMTP_USER,
    pass: process.env.NODEMAILER_PASSWORD || process.env.SMTP_PASS,
  },
});

export const sendTicketUpdateEmail = async (to: string, customerName: string, ticketTitle: string, message: string) => {
  const year = new Date().getFullYear();
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Ticket Update</title>
      <style>
        body { margin: 0; padding: 0; font-family: 'EB Garamond', serif, 'Segoe UI'; background-color: #f7f9fb; }
        .container { max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 24px; overflow: hidden; box-shadow: 0 20px 40px rgba(7, 2, 53, 0.05); border: 1px solid #eef2f6; }
        .header { background-color: #070235; padding: 40px; text-align: center; border-bottom: 4px solid #D4AF37; }
        .header h1 { color: #ffffff; margin: 0; font-size: 28px; letter-spacing: 2px; text-transform: uppercase; }
        .content { padding: 40px; color: #070235; line-height: 1.8; }
        .greeting { font-size: 20px; font-weight: bold; margin-bottom: 20px; color: #070235; }
        .ticket-info { background-color: #f8fafc; border-radius: 12px; padding: 20px; margin-bottom: 30px; border-left: 4px solid #7C3AED; }
        .message-box { white-space: pre-wrap; font-style: italic; color: #475569; padding: 20px 0; border-top: 1px solid #f1f5f9; }
        .footer { background-color: #f8fafc; padding: 30px; text-align: center; font-size: 11px; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px; }
        .button { display: inline-block; background-color: #070235; color: #ffffff; padding: 16px 32px; text-decoration: none; border-radius: 12px; font-weight: bold; margin-top: 20px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>PRYMAGE SUPPORT</h1>
        </div>
        <div class="content">
          <p class="greeting">Hello ${customerName},</p>
          <p>An update has been posted to your support request.</p>
          
          <div className="ticket-info">
            <strong>Ticket:</strong> ${ticketTitle}
          </div>

          <div class="message-box">
            "${message}"
          </div>

          <p>To view your full history or add more details, please visit our support portal.</p>
          
          <div style="text-align: center;">
            <a href="${process.env.CLIENT_URL || 'http://localhost:5173'}/login" class="button">Access Support Portal</a>
          </div>
        </div>
        <div class="footer">
          <p>&copy; ${year} PRYMAGE ERP & Accounting Software. Ghana | Nigeria.</p>
          <p>Secure Enterprise Communication</p>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    const info = await transporter.sendMail({
      from: `"PRYMAGE Support" <${process.env.NODEMAILER_EMAIL || process.env.SMTP_USER}>`,
      to,
      subject: `Update on Ticket: ${ticketTitle}`,
      html,
    });
    logger.info(`Reply email sent to ${to}: ${info.messageId}`);
  } catch (error) {
    logger.error('Error sending reply email:', error);
  }
};

// Original generic sender
export const sendEmail = async (to: string, subject: string, text: string) => {
  try {
    await transporter.sendMail({
      from: `"PRYMAGE Support" <${process.env.NODEMAILER_EMAIL || process.env.SMTP_USER}>`,
      to,
      subject,
      text,
    });
  } catch (error) {
    logger.error('Email sending failed', error);
  }
};
