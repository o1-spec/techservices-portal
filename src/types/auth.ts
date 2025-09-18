export interface RegisterResponse {
  message: string
  user: {
    id: string
    name: string
    email: string
    role: string
    isEmailVerified: boolean
  }
  accessToken: string
  verificationUrl?: string // Only included in development mode
}

export interface LoginResponse {
  message: string
  user: {
    id: string
    name: string
    email: string
    role: string
    isEmailVerified: boolean
  }
  accessToken: string
}

export interface VerifyEmailResponse {
  message: string
  user: {
    id: string
    name: string
    email: string
    isEmailVerified: boolean
  }
}

export interface ResendVerificationResponse {
  message: string
  email: string
}