"use client"

import { useState, useEffect } from "react"
import { Loader2 } from "lucide-react"
import ContentCard from "@/components/feed/content-card"
import { mockFeedData } from "@/lib/mock-data"

interface ContentFeedProps {
  feedType: string
}

export default function ContentFeed({ feedType }: ContentFeedProps) {
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API fetch with different data based on feed type
    setLoading(true)

    setTimeout(() => {
      // In a real app, this would be an API call
      const filteredPosts = feedType === "following" ? mockFeedData.filter((post) => post.isFollowing) : mockFeedData

      setPosts(filteredPosts)
      setLoading(false)
    }, 1000)
  }, [feedType])

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
        <p className="text-sm text-muted-foreground">Loading feed...</p>
      </div>
    )
  }

  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <p className="text-lg font-medium mb-2">No posts found</p>
        <p className="text-sm text-muted-foreground">
          {feedType === "following"
            ? "Follow more accounts to see their content here"
            : "Check back later for more content"}
        </p>
      </div>
    )
  }

  return (
    <div className="pb-4">
      {posts.map((post) => (
        <ContentCard key={post.id} post={post} />
      ))}
    </div>
  )
}

