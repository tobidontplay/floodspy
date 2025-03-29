"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { AlertTriangle, Upload, DollarSign, Users, TrendingUp, CheckCircle2, Search, Info } from "lucide-react"
import { mockCreators } from "@/lib/mock-data"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function ProjectCreator() {
  const [activeTab, setActiveTab] = useState("create")
  const [revenueShare, setRevenueShare] = useState([50])
  const [searchTerm, setSearchTerm] = useState("")

  const filteredCreators = searchTerm
    ? mockCreators.filter(
        (creator) =>
          creator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          creator.username.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    : mockCreators

  return (
    <ScrollArea className="h-[calc(100vh-8.5rem)]">
      <div className="container max-w-4xl mx-auto py-6 px-4">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">PROJECT CREATOR</h1>
          <p className="text-muted-foreground">
            Collaborate with content creators to promote disaster relief initiatives
          </p>
        </div>

        <Tabs defaultValue="create" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="create">Create Project</TabsTrigger>
            <TabsTrigger value="creators">Find Creators</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="create">
            <Card>
              <CardHeader>
                <CardTitle>Create a Relief Project</CardTitle>
                <CardDescription>Set up a new disaster relief campaign with content creators</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="project-name">Project Name</Label>
                  <Input id="project-name" placeholder="e.g., Lagos Flood Relief 2023" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="project-description">Description</Label>
                  <Textarea
                    id="project-description"
                    placeholder="Describe your relief initiative and goals..."
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="disaster-type">Disaster Type</Label>
                    <Select>
                      <SelectTrigger id="disaster-type">
                        <SelectValue placeholder="Select disaster type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="flood">Flood</SelectItem>
                        <SelectItem value="earthquake">Earthquake</SelectItem>
                        <SelectItem value="hurricane">Hurricane/Cyclone</SelectItem>
                        <SelectItem value="drought">Drought</SelectItem>
                        <SelectItem value="wildfire">Wildfire</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" placeholder="e.g., Lagos, Nigeria" />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Revenue Sharing Split</Label>
                    <span className="text-sm text-muted-foreground">
                      Creator: {revenueShare[0]}% | Relief Fund: {100 - revenueShare[0]}%
                    </span>
                  </div>
                  <Slider
                    defaultValue={[50]}
                    max={90}
                    min={10}
                    step={5}
                    value={revenueShare}
                    onValueChange={setRevenueShare}
                    className="py-4"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>10% Creator</span>
                    <span>90% Relief</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Upload Campaign Assets</Label>
                  <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center">
                    <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground mb-2">Drag and drop files or click to browse</p>
                    <p className="text-xs text-muted-foreground">Supports images, videos, and PDFs (max 100MB)</p>
                    <Button variant="outline" size="sm" className="mt-4">
                      Select Files
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Save Draft</Button>
                <Button onClick={() => setActiveTab("creators")}>Continue to Creator Selection</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="creators">
            <Card>
              <CardHeader>
                <CardTitle>Find Content Creators</CardTitle>
                <CardDescription>Partner with creators who can amplify your disaster relief message</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search creators by name or username"
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredCreators.map((creator) => (
                    <Card key={creator.id} className="overflow-hidden">
                      <div className="h-24 bg-gradient-to-r from-blue-500 to-purple-500" />
                      <CardContent className="pt-0 relative">
                        <Avatar className="h-16 w-16 border-4 border-background absolute -top-8">
                          <AvatarImage src={creator.avatar} alt={creator.name} />
                          <AvatarFallback>{creator.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div className="pt-10">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-semibold">{creator.name}</h3>
                              <p className="text-sm text-muted-foreground">@{creator.username}</p>
                            </div>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <div
                                    className={`px-2 py-1 rounded text-xs ${
                                      creator.reliefExperience
                                        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                        : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400"
                                    }`}
                                  >
                                    {creator.reliefExperience ? "Relief Expert" : "New to Relief"}
                                  </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                  {creator.reliefExperience
                                    ? "Has experience with disaster relief campaigns"
                                    : "First time participating in relief efforts"}
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>

                          <div className="grid grid-cols-3 gap-2 mt-3 text-center text-xs">
                            <div>
                              <p className="font-semibold">{creator.followers.toLocaleString()}</p>
                              <p className="text-muted-foreground">Followers</p>
                            </div>
                            <div>
                              <p className="font-semibold">{creator.engagementRate.toFixed(1)}%</p>
                              <p className="text-muted-foreground">Engagement</p>
                            </div>
                            <div>
                              <p className="font-semibold">{creator.completedProjects}</p>
                              <p className="text-muted-foreground">Projects</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 mt-4">
                            <Users className="h-4 w-4 text-blue-500" />
                            <span className="text-xs">{creator.audience}</span>
                          </div>

                          <div className="mt-4 flex justify-between">
                            <Button variant="outline" size="sm">
                              View Profile
                            </Button>
                            <Button size="sm">Invite to Project</Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setActiveTab("create")}>
                  Back
                </Button>
                <Button onClick={() => setActiveTab("analytics")}>Review Project</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Project Analytics</CardTitle>
                <CardDescription>Track the performance and impact of your relief campaigns</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-3">
                        <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full">
                          <DollarSign className="h-6 w-6 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Total Raised</p>
                          <p className="text-2xl font-bold">$24,850</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full">
                          <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Total Reach</p>
                          <p className="text-2xl font-bold">1.2M</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-3">
                        <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full">
                          <TrendingUp className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Engagement</p>
                          <p className="text-2xl font-bold">4.8%</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Revenue Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-center justify-center border border-dashed rounded-md">
                      <div className="text-center">
                        <p className="text-muted-foreground mb-2">Revenue Split Visualization</p>
                        <div className="flex items-center justify-center gap-4">
                          <div className="flex flex-col items-center">
                            <div className="w-24 h-24 rounded-full border-8 border-blue-500 flex items-center justify-center">
                              <span className="text-lg font-bold">60%</span>
                            </div>
                            <span className="mt-2 text-sm">Relief Fund</span>
                            <span className="text-sm font-bold">$14,910</span>
                          </div>
                          <div className="flex flex-col items-center">
                            <div className="w-24 h-24 rounded-full border-8 border-green-500 flex items-center justify-center">
                              <span className="text-lg font-bold">40%</span>
                            </div>
                            <span className="mt-2 text-sm">Creators</span>
                            <span className="text-sm font-bold">$9,940</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Active Relief Projects</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <AlertTriangle className="h-5 w-5 text-red-500" />
                          <div>
                            <p className="font-medium">Lagos Flood Relief 2023</p>
                            <p className="text-xs text-muted-foreground">8 creators • $12,450 raised</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                          <span className="text-xs text-green-600 dark:text-green-400">Active</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <AlertTriangle className="h-5 w-5 text-yellow-500" />
                          <div>
                            <p className="font-medium">Abuja Drought Response</p>
                            <p className="text-xs text-muted-foreground">5 creators • $8,320 raised</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                          <span className="text-xs text-green-600 dark:text-green-400">Active</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <AlertTriangle className="h-5 w-5 text-blue-500" />
                          <div>
                            <p className="font-medium">Port Harcourt Clean Water Initiative</p>
                            <p className="text-xs text-muted-foreground">3 creators • $4,080 raised</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Info className="h-4 w-4 text-yellow-500" />
                          <span className="text-xs text-yellow-600 dark:text-yellow-400">Pending</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setActiveTab("creators")}>
                  Back
                </Button>
                <Button>Launch Campaign</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </ScrollArea>
  )
}

