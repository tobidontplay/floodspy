"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal, AlertTriangle, DollarSign, MapPin } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import CommentsSection from "@/components/feed/comments-section"

interface ContentCardProps {
  post: any
}

export default function ContentCard({ post }: ContentCardProps) {
  const [liked, setLiked] = useState(post.isLiked || false)
  const [likesCount, setLikesCount] = useState(post.likes)
  const [saved, setSaved] = useState(post.isSaved || false)
  const [showComments, setShowComments] = useState(false)

  const handleLike = () => {
    if (liked) {
      setLikesCount(likesCount - 1)
    } else {
      setLikesCount(likesCount + 1)
    }
    setLiked(!liked)
  }

  const handleSave = () => {
    setSaved(!saved)
  }

  return (
    <div className="border-b pb-4 pt-4">
      {/* Header */}
      <div className="flex items-start px-4 mb-3">
        <Avatar className="h-10 w-10 mr-3">
          <AvatarImage src={post.user.avatar} alt={post.user.username} />
          <AvatarFallback>{post.user.username.substring(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center">
            <span className="font-semibold text-sm">{post.user.username}</span>
            {post.user.verified && (
              <Badge variant="outline" className="ml-1 h-4 text-xs">
                Verified
              </Badge>
            )}
          </div>
          <div className="flex items-center text-xs text-muted-foreground">
            <span>{formatDistanceToNow(new Date(post.timestamp), { addSuffix: true })}</span>
            {post.location && (
              <div className="flex items-center ml-2">
                <MapPin className="h-3 w-3 mr-1" />
                <span>{post.location}</span>
              </div>
            )}
          </div>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreHorizontal className="h-5 w-5" />
        </Button>
      </div>

      {/* Caption */}
      <div className="px-4 mb-3">
        <p className="text-sm">{post.caption}</p>
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1">
            {post.tags.map((tag: string) => (
              <span key={tag} className="text-xs text-blue-500">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Media */}
      <div className="relative aspect-[9/16] max-h-[80vh] bg-black flex items-center justify-center mb-3 overflow-hidden">
        {post.mediaType === "video" ? (
          <video src={post.mediaUrl} className="w-full h-full object-contain" controls loop playsInline />
        ) : (
          <img src={post.mediaUrl || "/placeholder.svg"} alt={post.caption} className="w-full h-full object-contain" />
        )}

        {/* Overlay for disaster relief info */}
        {post.disasterInfo && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
            <div className="flex items-center gap-2 mb-1">
              <AlertTriangle className="h-4 w-4 text-red-500" />
              <span className="text-white font-medium text-sm">{post.disasterInfo.type}</span>
            </div>
            {post.disasterInfo.donationEnabled && (
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-green-500" />
                <span className="text-white text-xs">Donations enabled</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between px-4 mb-2">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="h-9 w-9" onClick={handleLike}>
            <Heart className={`h-6 w-6 ${liked ? "fill-red-500 text-red-500" : ""}`} />
          </Button>
          <Button variant="ghost" size="icon" className="h-9 w-9" onClick={() => setShowComments(!showComments)}>
            <MessageCircle className="h-6 w-6" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Share2 className="h-6 w-6" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem>Share to Twitter</DropdownMenuItem>
              <DropdownMenuItem>Share to Facebook</DropdownMenuItem>
              <DropdownMenuItem>Share to WhatsApp</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Copy link</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Button variant="ghost" size="icon" className="h-9 w-9" onClick={handleSave}>
          <Bookmark className={`h-6 w-6 ${saved ? "fill-primary text-primary" : ""}`} />
        </Button>
      </div>

      {/* Likes Count */}
      <div className="px-4 mb-1">
        <p className="text-sm font-medium">{likesCount.toLocaleString()} likes</p>
      </div>

      {/* Comments Preview */}
      {!showComments && post.comments && post.comments.length > 0 && (
        <div className="px-4">
          <Button
            variant="ghost"
            className="p-0 h-auto text-muted-foreground text-sm"
            onClick={() => setShowComments(true)}
          >
            View all {post.comments.length} comments
          </Button>
          <div className="mt-1">
            <p className="text-sm">
              <span className="font-medium">{post.comments[0].username}</span> {post.comments[0].text}
            </p>
          </div>
        </div>
      )}

      {/* Full Comments Section */}
      {showComments && (
        <CommentsSection comments={post.comments} onClose={() => setShowComments(false)} postId={post.id} />
      )}
    </div>
  )
}

