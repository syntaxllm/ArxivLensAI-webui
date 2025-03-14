"use client"

import { useState, useEffect } from "react"
import { Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"

export default function SettingsPage() {
  const { toast } = useToast()
  const [googleApiKey, setGoogleApiKey] = useState("")
  const [huggingfaceApiKey, setHuggingfaceApiKey] = useState("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")
  const [useGpu, setUseGpu] = useState(false)
  const [cacheEmbeddings, setCacheEmbeddings] = useState(true)
  const [messageCount, setMessageCount] = useState(0)

  useEffect(() => {
    if (messageCount >= 3 && !googleApiKey) {
      const userGoogleApiKey = prompt("Please enter your Google AI API key to proceed:")
      if (userGoogleApiKey) {
        setGoogleApiKey(userGoogleApiKey)
      }
    }
  }, [messageCount, googleApiKey])

  const handleSaveSettings = () => {
    // In a real implementation, this would save the settings to a backend or localStorage
    toast({
      title: "Settings saved",
      description: "Your settings have been saved successfully",
    })
    setMessageCount(messageCount + 1)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>API Keys</CardTitle>
            <CardDescription>Configure API keys for AI services</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="google-api-key">Google AI API Key</Label>
              <Input
                id="google-api-key"
                type="password"
                placeholder="AIza....."
                value={googleApiKey}
                onChange={(e) => setGoogleApiKey(e.target.value)}
              />
              <p className="text-sm text-muted-foreground">Required for Gemini model access</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="huggingface-api-key">Hugging Face API Key</Label>
              <Input
                id="huggingface-api-key"
                type="password"
                placeholder="Enter your Hugging Face API key"
                value={huggingfaceApiKey}
                onChange={(e) => setHuggingfaceApiKey(e.target.value)}
                disabled
              />
              <p className="text-sm text-muted-foreground">Required for embedding models and some LLMs</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSaveSettings} className="gap-2">
              <Save className="h-4 w-4" />
              Save API Keys
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Performance Settings</CardTitle>
            <CardDescription>Configure performance options for the research assistant</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="use-gpu">Use GPU Acceleration</Label>
                <p className="text-sm text-muted-foreground">
                  Enable GPU acceleration for faster processing (if available)
                </p>
              </div>
              <Switch id="use-gpu" checked={useGpu} onCheckedChange={setUseGpu} />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="cache-embeddings">Cache Embeddings</Label>
                <p className="text-sm text-muted-foreground">
                  Store embeddings to improve performance for repeated queries
                </p>
              </div>
              <Switch id="cache-embeddings" checked={cacheEmbeddings} onCheckedChange={setCacheEmbeddings} />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSaveSettings} className="gap-2">
              <Save className="h-4 w-4" />
              Save Performance Settings
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

