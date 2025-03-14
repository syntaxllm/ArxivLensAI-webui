"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Download, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { useApiKeys } from "@/hooks/use-api-keys"

export default function DefaultPaperPage() {
  const router = useRouter()
  const { hasApiKeys } = useApiKeys()
  const [loading, setLoading] = useState(true)

  // Check if API keys are set
  useEffect(() => {
    if (!hasApiKeys) {
      router.push("/api-setup")
    }
    setLoading(false)
  }, [hasApiKeys, router])

  if (loading) {
    return <div className="flex justify-center items-center h-[60vh]">Loading...</div>
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" asChild className="mr-4">
          <Link href="/upload">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">Attention Is All You Need</h1>
      </div>

      <div className="flex flex-wrap gap-4 mb-6">
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Download PDF
        </Button>
        <Button className="gap-2" asChild>
          <Link href="/chat">
            <MessageSquare className="h-4 w-4" />
            Ask Questions
          </Link>
        </Button>
      </div>

      <Tabs defaultValue="summary">
        <TabsList className="mb-4">
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="tables">Tables</TabsTrigger>
          <TabsTrigger value="figures">Figures</TabsTrigger>
          <TabsTrigger value="metadata">Metadata</TabsTrigger>
        </TabsList>

        <TabsContent value="summary">
          <Card>
            <CardHeader>
              <CardTitle>Paper Summary</CardTitle>
              <CardDescription>AI-generated summary of the research paper</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none">
                <p>
                  "Attention Is All You Need" introduces the Transformer, a novel neural network architecture based on
                  self-attention mechanisms, eliminating the need for recurrence and convolutions that were dominant in
                  sequence modeling tasks.
                </p>
                <p>
                  The paper demonstrates that the Transformer outperforms previous state-of-the-art models on machine
                  translation tasks while being more parallelizable and requiring significantly less training time.
                </p>
                <h3>Key Contributions</h3>
                <ul>
                  <li>Introduction of the multi-head self-attention mechanism</li>
                  <li>Positional encodings to retain sequence order information</li>
                  <li>Encoder-decoder architecture based entirely on attention</li>
                  <li>
                    State-of-the-art results on WMT 2014 English-to-German and English-to-French translation tasks
                  </li>
                </ul>
                <p>
                  The Transformer architecture has since become the foundation for numerous advances in natural language
                  processing, including models like BERT, GPT, and T5.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tables">
          <Card>
            <CardHeader>
              <CardTitle>Extracted Tables</CardTitle>
              <CardDescription>Tables extracted from the research paper</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="px-4 py-2 text-left">Model</th>
                      <th className="px-4 py-2 text-left">BLEU</th>
                      <th className="px-4 py-2 text-left">Training Cost (FLOPs)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="px-4 py-2">ByteNet</td>
                      <td className="px-4 py-2">23.75</td>
                      <td className="px-4 py-2">High</td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-4 py-2">ConvS2S</td>
                      <td className="px-4 py-2">25.16</td>
                      <td className="px-4 py-2">Medium</td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-4 py-2">GNMT + RL</td>
                      <td className="px-4 py-2">24.6</td>
                      <td className="px-4 py-2">High</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2">Transformer (base)</td>
                      <td className="px-4 py-2">27.3</td>
                      <td className="px-4 py-2">Low</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2">Transformer (big)</td>
                      <td className="px-4 py-2">28.4</td>
                      <td className="px-4 py-2">Medium</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="figures">
          <Card>
            <CardHeader>
              <CardTitle>Extracted Figures</CardTitle>
              <CardDescription>Figures and images extracted from the research paper</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border rounded-lg p-4">
                  <div className="aspect-video bg-muted rounded-md flex items-center justify-center mb-2">
                    <img
                      src="/placeholder.svg?height=300&width=400"
                      alt="Transformer Architecture"
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <p className="font-medium">Figure 1</p>
                  <p className="text-sm text-muted-foreground">
                    Caption: The Transformer architecture with encoder and decoder stacks
                  </p>
                </div>
                <div className="border rounded-lg p-4">
                  <div className="aspect-video bg-muted rounded-md flex items-center justify-center mb-2">
                    <img
                      src="/placeholder.svg?height=300&width=400"
                      alt="Attention Visualization"
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <p className="font-medium">Figure 2</p>
                  <p className="text-sm text-muted-foreground">
                    Caption: Visualization of multi-head attention weights
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="metadata">
          <Card>
            <CardHeader>
              <CardTitle>Paper Metadata</CardTitle>
              <CardDescription>Additional information about the research paper</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">Publication Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                    <div className="flex items-center">
                      <span className="text-sm">Authors: Ashish Vaswani, Noam Shazeer, Niki Parmar, et al.</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm">Year: 2017</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm">Conference: NIPS 2017</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm">Citations: 65,000+</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium">Processing Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                    <div className="flex items-center">
                      <span className="text-sm">Text Chunks: 312</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm">Tables Extracted: 5</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm">Figures Extracted: 4</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm">FAISS Index: Built</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

