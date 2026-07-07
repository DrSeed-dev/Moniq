// src/components/ui/Toast.tsx
//
// WHAT THIS TEACHES:
// ─────────────────────────────────────────────────────────────────
// This is your first shared UI state pattern — state that multiple
// components need to READ and WRITE from different parts of the tree.
//
// The problem: Footer is deep in the component tree.
// LandingPage is at the top. The Toast renders at the top level.
// How does a Footer link trigger a Toast that lives elsewhere?
//
// SOLUTION: React Context
// We create a ToastContext that any component can access.
// Footer calls `showToast("message")` from anywhere.
// The Toast component reads from the same context and renders.
//
// This is a simplified version of how toast libraries like
// react-hot-toast and sonner work internally.
//
// PATTERN:
//   1. createContext()      — creates the shared state container
//   2. ToastProvider        — wraps the app, holds the actual state
//   3. useToast()           — hook any component uses to call showToast
//   4. <Toast />            — renders the notification, reads from context
//
// The `export` at the bottom of this file gives you everything
// you need in one import.

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  type ReactNode,
} from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Info } from 'lucide-react'

// ─── Types ────────────────────────────────────────────────────────────────────

interface ToastMessage {
  id:      string
  message: string
  type:    'info' | 'success' | 'warning'
}

interface ToastContextValue {
  showToast: (message: string, type?: ToastMessage['type']) => void
}

// ─── Context ──────────────────────────────────────────────────────────────────

// createContext with a default value of null — we'll guard against
// using it outside the provider with a helpful error message
const ToastContext = createContext<ToastContextValue | null>(null)

// ─── Provider ─────────────────────────────────────────────────────────────────
// Wraps the app. Holds the toast state and exposes showToast.

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([])

  // useRef to store timeout IDs so we can clear them if needed
  const timeoutRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map())

  const showToast = useCallback((message: string, type: ToastMessage['type'] = 'info') => {
    const id = `toast-${Date.now()}`

    setToasts((prev) => [...prev, { id, message, type }])

    // Auto-dismiss after 3.5 seconds
    const timeout = setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
      timeoutRef.current.delete(id)
    }, 3500)

    timeoutRef.current.set(id, timeout)
  }, [])

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
    const timeout = timeoutRef.current.get(id)
    if (timeout) {
      clearTimeout(timeout)
      timeoutRef.current.delete(id)
    }
  }, [])

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* Toast container — fixed bottom-right, above everything */}
      <div
        className="fixed bottom-6 right-6 z-[200] flex flex-col gap-2 pointer-events-none"
        aria-live="polite"
        aria-label="Notifications"
      >
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 16, scale: 0.95 }}
              animate={{ opacity: 1, y: 0,  scale: 1    }}
              exit={{   opacity: 0, y: 8,  scale: 0.95 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-2xl bg-navy border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] min-w-[260px] max-w-[320px]"
            >
              {/* Icon */}
              <div className="w-7 h-7 rounded-lg bg-blue-accent/20 flex items-center justify-center flex-shrink-0">
                <Info size={14} className="text-blue-accent" aria-hidden="true" />
              </div>

              {/* Message */}
              <p className="text-sm font-body text-white/80 flex-1 leading-snug">
                {toast.message}
              </p>

              {/* Dismiss button */}
              <button
                onClick={() => dismiss(toast.id)}
                aria-label="Dismiss notification"
                className="text-white/30 hover:text-white/70 transition-colors duration-150 flex-shrink-0"
              >
                <X size={14} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}

// ─── useToast Hook ────────────────────────────────────────────────────────────
// Call this from any component to access showToast.

export function useToast(): ToastContextValue {
  const context = useContext(ToastContext)

  // Guard: if used outside provider, give a clear developer error
  if (!context) {
    throw new Error('useToast must be used within a <ToastProvider>. Wrap your app in <ToastProvider>.')
  }

  return context
}
