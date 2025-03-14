"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Send, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { usePapers } from "@/hooks/use-papers"
import { useToast } from "@/hooks/use-toast"
import { useApiKeys } from "@/hooks/use-api-keys"

type Message = {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

export default function ChatPage() {
  const router = useRouter()
  const { papers } = usePapers()
  const { toast } = useToast()
  const { apiKeys, hasApiKeys, remainingFreeChats, decrementFreeChats } = useApiKeys()
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Check if API keys are set and show remaining free chats
  useEffect(() => {
    if (!hasApiKeys && remainingFreeChats <= 0) {
      router.push("/api-setup")
    } else if (remainingFreeChats > 0) {
      toast({
        title: `Free Trial`,
        description: `You have ${remainingFreeChats} free messages remaining.`,
      })
    }
  }, [hasApiKeys, remainingFreeChats, router, toast])

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Add initial welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: "welcome",
          role: "assistant",
          content: `Hello! I'm your research assistant. You have ${remainingFreeChats} free messages remaining. Ask me anything about the papers you've uploaded.`,
          timestamp: new Date(),
        },
      ])
    }
  }, [messages, remainingFreeChats])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!input.trim()) return

    // Check if user has remaining free chats or valid API key
    if (!hasApiKeys && remainingFreeChats <= 0) {
      toast({
        title: "Free trial ended",
        description: "Please set up your API key to continue.",
        variant: "destructive",
      })
      router.push("/api-setup")
      return
    }

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Decrement free chats if using trial
    if (!hasApiKeys && remainingFreeChats > 0) {
      decrementFreeChats()
    }

    // Simulate AI response with delay
    setTimeout(() => {
      generateResponse(input)
    }, 1500)
  }

  const generateResponse = (query: string) => {
    // Simulate AI response
    let response = ""

    if (query.toLowerCase().includes("attention") || query.toLowerCase().includes("transformer")) {
      response =
        "The 'Attention Is All You Need' paper introduced the Transformer architecture, which relies entirely on attention mechanisms rather than recurrence or convolution. The key innovation is the multi-head self-attention mechanism that allows the model to focus on different parts of the input sequence simultaneously."
    } else {
      const responses = [
        "Based on the papers you've uploaded, I found that the research indicates several key findings related to your question. The authors propose a novel approach that addresses the limitations of previous methods.",
        "The papers suggest that this approach has been studied extensively across multiple domains. The results consistently show improvements over baseline methods, particularly in scenarios with limited training data.",
        "According to the research papers, there are several key findings related to your question. The methodology section outlines a rigorous experimental setup that controls for confounding variables.",
      ]

      response = responses[Math.floor(Math.random() * responses.length)]
    }

    const aiMessage: Message = {
      id: Date.now().toString(),
      role: "assistant",
      content: response,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, aiMessage])
    setIsLoading(false)

    // Check remaining messages after response
    if (remainingFreeChats === 1) {
      toast({
        title: "Last free message used",
        description: "Set up your API key to continue using the chat.",
        variant: "warning",
      })
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-theme(spacing.16))]"> {/* Adjusted for fixed header */}
      <div className="flex-1 overflow-y-auto pb-4">
        <div className="max-w-3xl mx-auto space-y-4 pt-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`flex gap-3 max-w-[80%] ${message.role === "user" ? "flex-row-reverse" : ""}`}>
                <Avatar className="h-8 w-8">
                  {message.role === "user" ? (
                    <>
                      <AvatarFallback>U</AvatarFallback>
                      <AvatarImage src="/placeholder.svg?height=32&width=32" />
                    </>
                  ) : (
                    <>
                      <AvatarFallback>AI</AvatarFallback>
                      <AvatarImage src="/placeholder.svg?height=32&width=32" />
                    </>
                  )}
                </Avatar>
                <div
                  className={`rounded-lg px-4 py-2 ${
                    message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                  }`}
                >
                  <p>{message.content}</p>
                  <div
                    className={`text-xs mt-1 ${
                      message.role === "user" ? "text-primary-foreground/70" : "text-muted-foreground"
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex gap-3 max-w-[80%]">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>AI</AvatarFallback>
                  <AvatarImage src="/placeholder.svg?height=32&width=32" />
                </Avatar>
                <div className="rounded-lg px-4 py-2 bg-muted">
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <p className="text-sm text-muted-foreground">Thinking...</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="sticky bottom-0 bg-background pt-4">
        <Card className="max-w-3xl mx-auto border-t">
          <CardContent className="p-4">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                placeholder="Ask a question about your research papers..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}
                className="flex-1"
              />
              <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
