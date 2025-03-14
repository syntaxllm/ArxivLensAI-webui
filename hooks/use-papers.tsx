"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"

type Paper = {
  id: string
  title: string
  path: string
  uploadDate: string
}

type PapersContextType = {
  papers: Paper[]
  addPaper: (paper: Paper) => void
  removePaper: (id: string) => void
}

const PapersContext = createContext<PapersContextType | undefined>(undefined)

export function PapersProvider({ children }: { children: React.ReactNode }) {
  const [papers, setPapers] = useState<Paper[]>([])

  // Load papers from localStorage on mount
  useEffect(() => {
    const storedPapers = localStorage.getItem("research-papers")
    if (storedPapers) {
      setPapers(JSON.parse(storedPapers))
    } else {
      // Add default paper if no papers exist
      const defaultPaper = {
        id: "default-attention",
        title: "Attention Is All You Need",
        path: "/default-papers/attention.pdf",
        uploadDate: new Date().toISOString(),
      }
      setPapers([defaultPaper])
    }
  }, [])

  // Save papers to localStorage when they change
  useEffect(() => {
    localStorage.setItem("research-papers", JSON.stringify(papers))
  }, [papers])

  const addPaper = (paper: Paper) => {
    setPapers((prev) => [...prev, paper])
  }

  const removePaper = (id: string) => {
    // Don't allow removing the default paper
    if (id === "default-attention") return

    setPapers((prev) => prev.filter((paper) => paper.id !== id))
  }

  return <PapersContext.Provider value={{ papers, addPaper, removePaper }}>{children}</PapersContext.Provider>
}

export function usePapers() {
  const context = useContext(PapersContext)
  if (context === undefined) {
    throw new Error("usePapers must be used within a PapersProvider")
  }
  return context
}

