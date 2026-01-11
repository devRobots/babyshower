import { Resend } from 'resend';

if (!process.env.RESEND_API_KEY) {
  throw new Error('RESEND_API_KEY is not defined in environment variables');
}

export const resend = new Resend(process.env.RESEND_API_KEY);

export const EMAIL_FROM = process.env.EMAIL_FROM || 'onboarding@resend.dev';

// Convert comma-separated email string to array for multiple recipients
const parentsEmailEnv = process.env.PARENTS_EMAIL || 'parents@example.com';
export const PARENTS_EMAIL = parentsEmailEnv.includes(',')
  ? parentsEmailEnv.split(',').map(email => email.trim())
  : parentsEmailEnv;
