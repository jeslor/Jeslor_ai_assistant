import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT) || 587, // default to 587 if not set
  secure: Number(process.env.EMAIL_PORT) === 465, // true for 465, false for others
  auth: {
    user: process.env.EMAIL_USER as string,
    pass: process.env.EMAIL_PASS as string,
  },
  connectionTimeout: 30000, // 30 seconds
  greetingTimeout: 30000, // 30 seconds
  tls: {
    rejectUnauthorized: false, // avoid cert issues in cloud environments
  },
});

interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail({ to, subject, html }: SendEmailOptions) {
  return transporter.sendMail({
    from: `"${process.env.APP_NAME || "Interview AI"}" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  });
}

export function buildResetEmailHtml(resetUrl: string, username?: string) {
  return `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px; background: #0f0f0f; border-radius: 16px; color: #e2e8f0;">
      <h2 style="color: #ffffff; margin-bottom: 8px;">Password Reset</h2>
      <p style="color: #94a3b8; font-size: 14px; line-height: 1.6;">
        Hi${username ? ` ${username}` : ""},<br/><br/>
        We received a request to reset your password. Click the button below to create a new password. This link expires in <strong>1 hour</strong>.
      </p>
      <a href="${resetUrl}"
         style="display: inline-block; margin: 24px 0; padding: 12px 32px; background: #6d28d9; color: #fff; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 14px;">
        Reset Password
      </a>
      <p style="color: #64748b; font-size: 12px; line-height: 1.5;">
        If you didn't request this, you can safely ignore this email.<br/>
        Or copy this link into your browser:<br/>
        <span style="color: #818cf8; word-break: break-all;">${resetUrl}</span>
      </p>
    </div>
  `;
}
