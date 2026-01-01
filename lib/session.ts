'use server'

import { cookies } from 'next/headers';
import { randomBytes } from 'crypto';

const COOKIE_NAME = 'babyshower_session_token';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 90; // 90 days

export async function generateSessionToken(): Promise<string> {
  return randomBytes(32).toString('hex');
}

export async function setSessionToken(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: COOKIE_MAX_AGE,
    path: '/'
  });
}

export async function getSessionToken(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(COOKIE_NAME)?.value;
}

export async function clearSessionToken() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}
