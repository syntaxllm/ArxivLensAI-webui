"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Upload, FileText, Check, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { usePapers } from "@/hooks/use-papers"
import { useToast } from "@/hooks/use-toast"

export default function UploadPage() {
  const router = useRouter()
  const { addPaper } = usePapers()
  const { toast } = useToast()
  const [files, setFiles] = useState<File[]>([])
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState<Record<string, number>>({})
  const [completed, setCompleted] = useState<Record<string, boolean>>({})

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).filter((file) => file.type === "application/pdf")

      if (newFiles.length === 0) {
        toast({
          title: "Invalid file type",
          description: "Please upload PDF files only",
          variant: "destructive",
        })
        return
      }

      setFiles((prev) => [...prev, ...newFiles])

      // Initialize progress for new files
      const newProgress = { ...progress }
      const newCompleted = { ...completed }

      newFiles.forEach((file) => {
        newProgress[file.name] = 0
        newCompleted[file.name] = false
      })

      setProgress(newProgress)
      setCompleted(newCompleted)
    }
  }

  const removeFile = (fileName: string) => {
    setFiles(files.filter((file) => file.name !== fileName))

    // Remove from progress and completed
    const newProgress = { ...progress }
    const newCompleted = { ...completed }
    delete newProgress[fileName]
    delete newCompleted[fileName]

    setProgress(newProgress)
    setCompleted(newCompleted)
  }

  const handleUpload = async () => {
    if (files.length === 0) return

    setUploading(true)

    // Simulate processing each file
    for (const file of files) {
      // Simulate upload progress
      for (let i = 0; i <= 100; i += 10) {
        setProgress((prev) => ({ ...prev, [file.name]: i }))
        await new Promise((r) => setTimeout(r, 200))
      }

      // Mark as completed
      setCompleted((prev) => ({ ...prev, [file.name]: true }))

      // Add to papers state
      addPaper({
        id: Date.now().toString(),
        title: file.name.replace(".pdf", ""),
        path: URL.createObjectURL(file),
        uploadDate: new Date().toISOString(),
      })

      toast({
        title: "Paper uploaded",
        description: `${file.name} has been processed successfully`,
      })
    }

    setUploading(false)

    // Clear files after successful upload
    setTimeout(() => {
      setFiles([])
      setProgress({})
      setCompleted({})
      router.push("/chat")
    }, 1500)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Upload Research Papers</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Upload Files</CardTitle>
          <CardDescription>Upload PDF research papers to extract text, tables, and figures.</CardDescription>
        </CardHeader>
        <CardContent>
          <div
            className="border-2 border-dashed rounded-lg p-10 text-center cursor-pointer hover:bg-muted/50 transition-colors"
            onClick={() => document.getElementById("file-upload")?.click()}
          >
            <Upload className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-medium mb-2">Drag and drop files here</h3>
            <p className="text-sm text-muted-foreground mb-4">or click to browse for PDF files</p>
            <Button variant="outline" type="button">
              Select Files
            </Button>
            <input id="file-upload" type="file" multiple accept=".pdf" className="hidden" onChange={handleFileChange} />
          </div>
        </CardContent>
      </Card>

      {files.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Selected Files</CardTitle>
            <CardDescription>
              {files.length} file{files.length !== 1 ? "s" : ""} selected for upload
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {files.map((file) => (
                <div key={file.name} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 mr-2 text-muted-foreground" />
                      <span className="font-medium">{file.name}</span>
                    </div>
                    {!uploading && (
                      <Button variant="ghost" size="sm" onClick={() => removeFile(file.name)}>
                        Remove
                      </Button>
                    )}
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                      <span className="font-medium">
                        {completed[file.name] ? (
                          <span className="text-green-500 flex items-center">
                            <Check className="h-4 w-4 mr-1" /> Completed
                          </span>
                        ) : (
                          `${progress[file.name] || 0}%`
                        )}
                      </span>
                    </div>
                    <Progress value={progress[file.name] || 0} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleUpload} disabled={uploading || files.length === 0} className="w-full">
              {uploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  Upload and Process {files.length} File{files.length !== 1 ? "s" : ""}
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}

