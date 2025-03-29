"use client"

import type React from "react"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { formatDistanceToNow } from "date-fns"
import { Heart, X } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Comment {
  id: string
  username: string
  avatar?: string
  text: string
  timestamp: string
  likes: number
}

interface CommentsSectionProps {
  comments: Comment[]
  onClose: () => void
  postId: string
}

export default function CommentsSection({ comments, onClose, postId }: CommentsSectionProps) {
  const [allComments, setAllComments] = useState<Comment[]>(comments)
  const [newComment, setNewComment] = useState("")
  const [likedComments, setLikedComments] = useState<Record<string, boolean>>({})

  const handleLikeComment = (commentId: string, currentLikes: number) => {
    const isLiked = likedComments[commentId]

    setLikedComments({
      ...likedComments,
      [commentId]: !isLiked,
    })

    setAllComments(
      allComments.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            likes: isLiked ? currentLikes - 1 : currentLikes + 1,
          }
        }
        return comment
      }),
    )
  }

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault()

    if (!newComment.trim()) return

    const newCommentObj: Comment = {
      id: `comment-${Date.now()}`,
      username: "currentUser", // In a real app, this would be the logged-in user
      avatar: "/placeholder.svg?height=40&width=40",
      text: newComment,
      timestamp: new Date().toISOString(),
      likes: 0,
    }

    setAllComments([...allComments, newCommentObj])
    setNewComment("")
  }

  return (
    <div className="px-4 pt-2">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-medium">Comments ({allComments.length})</h3>
        <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
          <X className="h-4 w-4" />
        </Button>
      </div>

      <ScrollArea className="h-[300px] pr-4 -mr-4">
        <div className="space-y-4">
          {allComments.map((comment) => (
            <div key={comment.id} className="flex gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={comment.avatar} alt={comment.username} />
                <AvatarFallback>{comment.username.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-medium text-sm">{comment.username}</span>{" "}
                    <span className="text-sm">{comment.text}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => handleLikeComment(comment.id, comment.likes)}
                  >
                    <Heart className={`h-3.5 w-3.5 ${likedComments[comment.id] ? "fill-red-500 text-red-500" : ""}`} />
                  </Button>
                </div>
                <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                  <span>{formatDistanceToNow(new Date(comment.timestamp), { addSuffix: true })}</span>
                  {comment.likes > 0 && (
                    <span>
                      {comment.likes} {comment.likes === 1 ? "like" : "likes"}
                    </span>
                  )}
                  <Button variant="ghost" className="h-auto p-0 text-xs">
                    Reply
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <form onSubmit={handleAddComment} className="flex items-center gap-2 mt-4">
        <Avatar className="h-8 w-8">
          <AvatarImage src="/placeholder.svg?height=40&width=40" alt="You" />
          <AvatarFallback>YOU</AvatarFallback>
        </Avatar>
        <Input
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="flex-1"
        />
        <Button type="submit" variant="ghost" size="sm" disabled={!newComment.trim()}>
          Post
        </Button>
      </form>
    </div>
  )
}

