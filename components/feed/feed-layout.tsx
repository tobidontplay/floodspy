"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Home, Compass, PlusSquare, Heart, User, ArrowLeft } from "lucide-react"
import Link from "next/link"
import ContentFeed from "@/components/feed/content-feed"
import ProjectCreator from "@/components/feed/project-creator"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function FeedLayout() {
  const [activeTab, setActiveTab] = useState("for-you")
  const [showProjectCreator, setShowProjectCreator] = useState(false)

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <header className="border-b py-3 px-4 flex items-center justify-between sticky top-0 z-10 bg-background">
        <div className="flex items-center gap-3">
          <Link href="/">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-lg font-bold">FloodSpy Relief</h1>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button
            variant="default"
            size="sm"
            onClick={() => setShowProjectCreator(!showProjectCreator)}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            {showProjectCreator ? "View Feed" : "PROJECT CREATOR"}
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden">
        {showProjectCreator ? (
          <ProjectCreator />
        ) : (
          <>
            {/* Feed Tabs */}
            <div className="border-b">
              <Tabs
                defaultValue="for-you"
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full max-w-md mx-auto"
              >
                <TabsList className="grid grid-cols-2 w-full">
                  <TabsTrigger value="for-you">For You</TabsTrigger>
                  <TabsTrigger value="following">Following</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* Content Feed */}
            <ScrollArea className="h-[calc(100vh-8.5rem)]">
              <ContentFeed feedType={activeTab} />
            </ScrollArea>
          </>
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="border-t py-2 px-4 flex justify-around items-center bg-background">
        <Button variant="ghost" size="icon" className="flex flex-col items-center gap-1">
          <Home className="h-5 w-5" />
          <span className="text-xs">Home</span>
        </Button>
        <Button variant="ghost" size="icon" className="flex flex-col items-center gap-1">
          <Compass className="h-5 w-5" />
          <span className="text-xs">Discover</span>
        </Button>
        <Button variant="ghost" size="icon" className="flex flex-col items-center gap-1">
          <PlusSquare className="h-5 w-5" />
          <span className="text-xs">Create</span>
        </Button>
        <Button variant="ghost" size="icon" className="flex flex-col items-center gap-1">
          <Heart className="h-5 w-5" />
          <span className="text-xs">Activity</span>
        </Button>
        <Button variant="ghost" size="icon" className="flex flex-col items-center gap-1">
          <User className="h-5 w-5" />
          <span className="text-xs">Profile</span>
        </Button>
      </nav>
    </div>
  )
}

