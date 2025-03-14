"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { useApiKeys } from "@/hooks/use-api-keys"

export default function Home() {
  const router = useRouter()
  const { hasApiKeys } = useApiKeys()

  // Check if API keys are set
  useEffect(() => {
    if (!hasApiKeys) {
      router.push("/api-setup")
    }
  }, [hasApiKeys, router])

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)] px-4 py-10">
      <div className="max-w-3xl text-center space-y-6">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">AI-Powered Personal Research Assistant</h1>
        <p className="text-xl text-muted-foreground">
          Upload research papers, extract insights, and get AI-generated answers to your research questions.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Link href="/upload">
            <Button size="lg" className="gap-2">
              Upload Papers <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/chat">
            <Button size="lg" variant="outline" className="gap-2">
              Start Chatting <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full">
        <div className="bg-card rounded-lg p-6 shadow-sm border">
          <h3 className="text-lg font-semibold mb-2">Upload Research Papers</h3>
          <p className="text-muted-foreground">
            Upload PDF research papers and let our system extract text, tables, and figures.
          </p>
        </div>
        <div className="bg-card rounded-lg p-6 shadow-sm border">
          <h3 className="text-lg font-semibold mb-2">Intelligent Indexing</h3>
          <p className="text-muted-foreground">
            Our system builds a FAISS index for efficient retrieval of information from your papers.
          </p>
        </div>
        <div className="bg-card rounded-lg p-6 shadow-sm border">
          <h3 className="text-lg font-semibold mb-2">AI-Powered Answers</h3>
          <p className="text-muted-foreground">
            Get research-oriented answers to your questions using advanced AI models.
          </p>
        </div>
      </div>
    </div>
  )
}

