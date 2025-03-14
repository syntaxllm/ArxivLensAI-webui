"use client"

import type React from "react"

import { PapersProvider } from "@/hooks/use-papers"
import { ApiKeysProvider } from "@/hooks/use-api-keys"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ApiKeysProvider>
      <PapersProvider>{children}</PapersProvider>
    </ApiKeysProvider>
  )
}

