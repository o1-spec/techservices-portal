import { LoginFormData, RegisterFormData, ForgotPasswordFormData, ResetPasswordFormData } from '@/schemas/auth'
import { RegisterResponse, LoginResponse, VerifyEmailResponse, ResendVerificationResponse } from '@/types/auth'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api'

// Generic API request function
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<{ data?: T; error?: string; status: number }> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      credentials: 'include', // Include cookies for authentication
      ...options,
    })

    const data = await response.json()

    if (!response.ok) {
      return { error: data.error || 'An error occurred', status: response.status }
    }

    return { data, status: response.status }
  } catch (error) {
    console.error('API request error:', error)
    return { error: 'Network error occurred', status: 500 }
  }
}

// Authentication API calls
export const authAPI = {
  login: async (data: LoginFormData) => {
    return apiRequest<LoginResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },

  register: async (data: RegisterFormData) => {
    return apiRequest<RegisterResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },

  logout: async () => {
    return apiRequest('/auth/logout', {
      method: 'POST',
    })
  },

  forgotPassword: async (data: ForgotPasswordFormData) => {
    return apiRequest('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },

  resetPassword: async (data: ResetPasswordFormData) => {
    return apiRequest('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },

  verifyEmail: async (token: string) => {
    return apiRequest<VerifyEmailResponse>('/auth/verify-email', {
      method: 'POST',
      body: JSON.stringify({ token }),
    })
  },

  resendVerification: async (email: string) => {
    return apiRequest<ResendVerificationResponse>('/auth/resend-verification', {
      method: 'POST',
      body: JSON.stringify({ email }),
    })
  },
}

// Employees API calls
export const employeesAPI = {
  getAll: async (params?: URLSearchParams) => {
    const query = params ? `?${params.toString()}` : ''
    return apiRequest(`/employees${query}`)
  },

  getById: async (id: string) => {
    return apiRequest(`/employees/${id}`)
  },

  create: async (data: Record<string, unknown>) => {
    return apiRequest('/employees', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },

  update: async (id: string, data: Record<string, unknown>) => {
    return apiRequest(`/employees/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  },

  delete: async (id: string) => {
    return apiRequest(`/employees/${id}`, {
      method: 'DELETE',
    })
  },
}

// Projects API calls
export const projectsAPI = {
  getAll: async (params?: URLSearchParams) => {
    const query = params ? `?${params.toString()}` : ''
    return apiRequest(`/projects${query}`)
  },

  getById: async (id: string) => {
    return apiRequest(`/projects/${id}`)
  },

  create: async (data: Record<string, unknown>) => {
    return apiRequest('/projects', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },

  update: async (id: string, data: Record<string, unknown>) => {
    return apiRequest(`/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  },

  delete: async (id: string) => {
    return apiRequest(`/projects/${id}`, {
      method: 'DELETE',
    })
  },
}

// Tasks API calls
export const tasksAPI = {
  getAll: async (projectId?: string, params?: URLSearchParams) => {
    const query = params ? `?${params.toString()}` : ''
    const endpoint = projectId ? `/projects/${projectId}/tasks${query}` : `/tasks${query}`
    return apiRequest(endpoint)
  },

  getById: async (id: string) => {
    return apiRequest(`/tasks/${id}`)
  },

  create: async (projectId: string, data: Record<string, unknown>) => {
    return apiRequest(`/projects/${projectId}/tasks`, {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },

  update: async (id: string, data: Record<string, unknown>) => {
    return apiRequest(`/tasks/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  },

  delete: async (id: string) => {
    return apiRequest(`/tasks/${id}`, {
      method: 'DELETE',
    })
  },
}

// Announcements API calls
export const announcementsAPI = {
  getAll: async (params?: URLSearchParams) => {
    const query = params ? `?${params.toString()}` : ''
    return apiRequest(`/announcements${query}`)
  },

  create: async (data: Record<string, unknown>) => {
    return apiRequest('/announcements', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },

  update: async (id: string, data: Record<string, unknown>) => {
    return apiRequest(`/announcements/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  },

  delete: async (id: string) => {
    return apiRequest(`/announcements/${id}`, {
      method: 'DELETE',
    })
  },
}

// Dashboard API calls
export const dashboardAPI = {
  getMetrics: async () => {
    return apiRequest('/dashboard/metrics')
  },
}

// Users API calls
export const usersAPI = {
  getProfile: async () => {
    return apiRequest('/users/profile')
  },

  updateProfile: async (data: Record<string, unknown>) => {
    return apiRequest('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  },
}

// Project search utility
export const createProjectSearchParams = (filters: {
  search?: string
  status?: string
  deadline?: string
  assignedTo?: string
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}) => {
  const params = new URLSearchParams()

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      params.append(key, value.toString())
    }
  })

  return params
}

// Employee search utility
export const createEmployeeSearchParams = (filters: {
  search?: string
  role?: string
  status?: 'active' | 'inactive'
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}) => {
  const params = new URLSearchParams()

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      params.append(key, value.toString())
    }
  })

  return params
}

// Task search utility
export const createTaskSearchParams = (filters: {
  status?: string
  assignedTo?: string
  projectId?: string
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}) => {
  const params = new URLSearchParams()

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      params.append(key, value.toString())
    }
  })

  return params
}