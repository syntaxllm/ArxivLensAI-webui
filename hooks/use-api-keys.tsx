"use client"

import { createContext, useContext, useEffect, useState } from "react"

// Default API key that will be used for initial 3 chats
const DEFAULT_API_KEY = "AIzaSyAYqEVojzmSLv101fVPvEzDHLhpuR7SYso" // Replace with your API key

type ApiKeysState = {
  googleApiKey: string | null
  remainingFreeChats: number
}

type ApiKeysContextType = {
  apiKeys: ApiKeysState | null
  setApiKeys: (keys: ApiKeysState | null) => void
  hasApiKeys: boolean
  remainingFreeChats: number
  decrementFreeChats: () => void
}

const ApiKeysContext = createContext<ApiKeysContextType | undefined>(undefined)

export function ApiKeysProvider({ children }: { children: React.ReactNode }) {
  const [apiKeys, setApiKeys] = useState<ApiKeysState | null>({
    googleApiKey: DEFAULT_API_KEY,
    remainingFreeChats: 3
  })

  const decrementFreeChats = () => {
    setApiKeys(prev => {
      if (!prev) return null
      const remaining = prev.remainingFreeChats - 1
      if (remaining <= 0) {
        return null // Reset API keys when free chats are exhausted
      }
      return { ...prev, remainingFreeChats: remaining }
    })
  }

  return (
    <ApiKeysContext.Provider
      value={{
        apiKeys,
        setApiKeys,
        hasApiKeys: !!apiKeys?.googleApiKey,
        remainingFreeChats: apiKeys?.remainingFreeChats || 0,
        decrementFreeChats
      }}
    >
      {children}
    </ApiKeysContext.Provider>
  )
}

export function useApiKeys() {
  const context = useContext(ApiKeysContext)
  if (context === undefined) {
    throw new Error("useApiKeys must be used within an ApiKeysProvider")
  }
  return context
}

