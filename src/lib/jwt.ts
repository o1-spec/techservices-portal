/* eslint-disable @typescript-eslint/no-unused-vars */
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key'
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'fallback-refresh-secret-key'

export interface TokenPayload {
  userId: string  // Use string for ObjectId.toString()
  email: string
  role: string
}

export function generateAccessToken(payload: TokenPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' })
}

export function generateRefreshToken(payload: TokenPayload): string {
  return jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: '7d' })
}

export function verifyAccessToken(token: string): TokenPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload
  } catch (error) {
    return null
  }
}

export function verifyRefreshToken(token: string): TokenPayload | null {
  try {
    return jwt.verify(token, JWT_REFRESH_SECRET) as TokenPayload
  } catch (error) {
    return null
  }
}

export function generateEmailVerificationToken(email: string): string {
  return jwt.sign({ email, purpose: 'email-verification' }, JWT_SECRET, { expiresIn: '1d' })
}

export function generatePasswordResetToken(email: string): string {
  return jwt.sign({ email, purpose: 'password-reset' }, JWT_SECRET, { expiresIn: '1h' })
}

export function verifyEmailToken(token: string): { email: string; purpose: string } | null {
  try {
    return jwt.verify(token, JWT_SECRET) as { email: string; purpose: string }
  } catch (error) {
    return null
  }
}