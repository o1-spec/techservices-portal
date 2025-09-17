'use client'

import { useToast } from '@/hooks/use-toast'
import { Toast } from './toast'

export function Toaster() {
  const { toasts, removeToast } = useToast()

  return (
    <div className="fixed top-0 right-0 z-50 w-full sm:w-96 p-4 space-y-2">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          id={toast.id}
          title={toast.title}
          description={toast.description}
          type={toast.type}
          onClose={removeToast}
        />
      ))}
    </div>
  )
}
