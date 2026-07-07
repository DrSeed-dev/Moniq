// src/App.tsx
//
// ToastProvider wraps the entire app so any component —
// no matter how deep in the tree — can call useToast().
// This is the React Context pattern in practice.

import { ToastProvider } from '@/components/ui/Toast'
import { LandingPage  } from '@/pages/LandingPage'

function App() {
  return (
    <ToastProvider>
      <LandingPage />
    </ToastProvider>
  )
}

export default App
