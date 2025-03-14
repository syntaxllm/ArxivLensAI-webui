"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useApiKeys } from "@/hooks/use-api-keys"
import { Card } from "@/components/ui/card"
import { InfoIcon } from "lucide-react"

export default function ApiSetupPage() {
  const router = useRouter()
  const { setApiKeys } = useApiKeys()
  const [googleApiKey, setGoogleApiKey] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setApiKeys({
      googleApiKey,
      remainingFreeChats: 0 // No more free chats once user sets their own key
    })
    router.push("/chat")
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">API Setup</h1>

      <Card className="p-6 mb-6 bg-blue-50 dark:bg-blue-900/30">
        <div className="flex items-start gap-4">
          <InfoIcon className="w-6 h-6 text-blue-500 mt-1" />
          <div>
            <h2 className="font-semibold mb-2">How to get a Google API Key:</h2>
            <ol className="list-decimal pl-4 space-y-2">
              <li>Go to the Google Cloud Console (console.cloud.google.com)</li>
              <li>Create a new project or select an existing one</li>
              <li>Enable the required APIs (e.g., Cloud Vision API)</li>
              <li>Go to Credentials and click "Create Credentials"</li>
              <li>Select "API Key" and copy your new API key</li>
            </ol>
            <p className="mt-4 text-sm text-blue-600 dark:text-blue-400">
              Note: You have 3 free chats with our default API key. After that, you'll need to enter your own API key.
            </p>
          </div>
        </div>
      </Card>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Google API Key</label>
          <Input
            type="password"
            value={googleApiKey}
            onChange={(e) => setGoogleApiKey(e.target.value)}
            placeholder="Enter your Google API key"
            required
          />
        </div>
        <Button type="submit">Save API Keys</Button>
      </form>
    </div>
  )
}
