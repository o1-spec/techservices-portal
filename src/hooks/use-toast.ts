"use client"

import * as React from "react"

export interface Toast {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  type?: 'success' | 'error' | 'warning' | 'info'
  duration?: number
}

const TOAST_LIMIT = 3
const TOAST_REMOVE_DELAY = 5000

let count = 0
function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

// Global state for toasts
let globalToasts: Toast[] = []
const listeners: Array<(toasts: Toast[]) => void> = []

function dispatch(toasts: Toast[]) {
  globalToasts = toasts
  listeners.forEach((listener) => listener(toasts))
}

export function useToast() {
  const [toasts, setToasts] = React.useState<Toast[]>(globalToasts)

  React.useEffect(() => {
    listeners.push(setToasts)
    return () => {
      const index = listeners.indexOf(setToasts)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [])

  const addToast = React.useCallback((newToast: Omit<Toast, 'id'>) => {
    const id = genId()
    const toast: Toast = {
      ...newToast,
      id,
    }
        
    const updatedToasts = [toast, ...globalToasts].slice(0, TOAST_LIMIT)
    dispatch(updatedToasts)
    
    // Auto remove after duration
    setTimeout(() => {
      const filteredToasts = globalToasts.filter(t => t.id !== id)
      dispatch(filteredToasts)
    }, newToast.duration || TOAST_REMOVE_DELAY)
    
    return id
  }, [])

  const removeToast = React.useCallback((id: string) => {
    const filteredToasts = globalToasts.filter(toast => toast.id !== id)
    dispatch(filteredToasts)
  }, [])

  const toast = {
    success: (title: string, description?: string, duration: number = 5000) => {
      return addToast({ title, description, type: 'success', duration })
    },
    error: (title: string, description?: string, duration: number = 5000) => {
      return addToast({ title, description, type: 'error', duration })
    },
    warning: (title: string, description?: string, duration: number = 5000) => {
      return addToast({ title, description, type: 'warning', duration })
    },
    info: (title: string, description?: string, duration: number = 5000) => {
      return addToast({ title, description, type: 'info', duration })
    }
  }

  return { toasts, removeToast, toast }
}