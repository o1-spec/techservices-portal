'use client'

import { useToast } from '@/hooks/use-toast'
import { Toast } from './toast'

export function ToastContainer() {
  const { toasts, removeToast } = useToast()

  return (
    <div className="fixed top-4 right-4 z-[100] flex max-h-screen w-full flex-col gap-2 md:max-w-[420px]">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          id={toast.id}
          title={toast.title}
          description={toast.description}
          type={toast.type}
          duration={toast.duration}
          onClose={removeToast}
        />
      ))}
    </div>
  )
}