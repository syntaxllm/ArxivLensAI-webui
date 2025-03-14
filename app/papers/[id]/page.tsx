"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, FileText, Download, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { usePapers } from "@/hooks/use-papers"
import Link from "next/link"

export default function PaperDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const { papers } = usePapers()
  const [paper, setPaper] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (params.id) {
      const foundPaper = papers.find((p) => p.id === params.id)
      if (foundPaper) {
        setPaper(foundPaper)
      } else {
        // Paper not found, redirect to papers list
        router.push("/upload")
      }
    }
    setLoading(false)
  }, [params.id, papers, router])

  if (loading) {
    return <div className="flex justify-center items-center h-[60vh]">Loading...</div>
  }

  if (!paper) {
    return <div className="flex justify-center items-center h-[60vh]">Paper not found</div>
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
        <h1 className="text-2xl font-bold">{paper.title}</h1>
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
                  This is a simulated summary of the research paper. In a real implementation, this would be generated
                  by the AI based on the content of the paper.
                </p>
                <p>
                  The paper discusses key findings related to the research topic, methodology used, results obtained,
                  and conclusions drawn by the authors.
                </p>
                <h3>Key Points</h3>
                <ul>
                  <li>First major finding from the research</li>
                  <li>Second important conclusion</li>
                  <li>Methodology highlights</li>
                  <li>Limitations and future work</li>
                </ul>
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
                      <th className="px-4 py-2 text-left">Method</th>
                      <th className="px-4 py-2 text-left">Accuracy</th>
                      <th className="px-4 py-2 text-left">Precision</th>
                      <th className="px-4 py-2 text-left">Recall</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="px-4 py-2">Method A</td>
                      <td className="px-4 py-2">85.2%</td>
                      <td className="px-4 py-2">83.7%</td>
                      <td className="px-4 py-2">86.1%</td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-4 py-2">Method B</td>
                      <td className="px-4 py-2">87.9%</td>
                      <td className="px-4 py-2">86.3%</td>
                      <td className="px-4 py-2">88.5%</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2">Method C</td>
                      <td className="px-4 py-2">91.4%</td>
                      <td className="px-4 py-2">90.2%</td>
                      <td className="px-4 py-2">92.7%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                Note: These are sample tables. In a real implementation, tables would be extracted from the PDF.
              </p>
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
                      alt="Figure 1"
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <p className="font-medium">Figure 1</p>
                  <p className="text-sm text-muted-foreground">Caption: Overview of the proposed methodology</p>
                </div>
                <div className="border rounded-lg p-4">
                  <div className="aspect-video bg-muted rounded-md flex items-center justify-center mb-2">
                    <img
                      src="/placeholder.svg?height=300&width=400"
                      alt="Figure 2"
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <p className="font-medium">Figure 2</p>
                  <p className="text-sm text-muted-foreground">Caption: Results comparison across different datasets</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                Note: These are sample figures. In a real implementation, figures would be extracted from the PDF.
              </p>
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
                  <h3 className="font-medium">File Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm">Filename: {paper.title}.pdf</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm">Upload Date: {new Date(paper.uploadDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium">Processing Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                    <div className="flex items-center">
                      <span className="text-sm">Text Chunks: 245</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm">Tables Extracted: 3</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm">Figures Extracted: 5</span>
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

