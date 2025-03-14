"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { FileText, Search, Trash2, Plus } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuAction,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { usePapers } from "@/hooks/use-papers"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export function AppSidebar() {
  const { papers, removePaper } = usePapers()
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredPapers, setFilteredPapers] = useState(papers)

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredPapers(papers)
    } else {
      const filtered = papers.filter((paper) => paper.title.toLowerCase().includes(searchQuery.toLowerCase()))
      setFilteredPapers(filtered)
    }
  }, [searchQuery, papers])

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="px-4 py-2">
          <h2 className="text-lg font-semibold">Research Papers</h2>
          <p className="text-sm text-muted-foreground">Browse and manage your papers</p>
        </div>
        <div className="px-2 pt-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search papers..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Uploaded Papers</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {filteredPapers.length > 0 ? (
                filteredPapers.map((paper) => (
                  <SidebarMenuItem key={paper.id}>
                    <SidebarMenuButton asChild tooltip={paper.title}>
                      <Link href={`/papers/${paper.id}`}>
                        <FileText className="h-4 w-4" />
                        <span>{paper.title}</span>
                      </Link>
                    </SidebarMenuButton>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <SidebarMenuAction showOnHover>
                          <Trash2 className="h-4 w-4" />
                        </SidebarMenuAction>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Paper</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete "{paper.title}"? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => removePaper(paper.id)}
                            className="bg-destructive text-destructive-foreground"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </SidebarMenuItem>
                ))
              ) : (
                <div className="px-4 py-2 text-sm text-muted-foreground">
                  {papers.length === 0 ? "No papers uploaded yet" : "No matching papers found"}
                </div>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel>Default Papers</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/papers/default-attention">
                    <FileText className="h-4 w-4" />
                    <span>Attention Is All You Need</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div className="p-2">
          <Link href="/upload">
            <Button className="w-full">
              <Plus className="mr-2 h-4 w-4" />
              Upload Paper
            </Button>
          </Link>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}

