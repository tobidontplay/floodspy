import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Video } from "lucide-react"
import FloodMap from "@/components/flood-map"
import ReportForm from "@/components/report-form"
import AlertsList from "@/components/alerts-list"
import StatsOverview from "@/components/stats-overview"
import { MainNav } from "@/components/main-nav"
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <MainNav />

      <main className="container mx-auto px-4 py-6">
        <div className="mb-8">
          <h2 className="text-2xl font-bold tracking-tight mb-2">Crowdsourced Flood Monitoring</h2>
          <p className="text-muted-foreground">
            Help your community by reporting and tracking flood conditions in real-time
          </p>
        </div>

        <div className="mb-6">
          <Link href="/feed">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2">
              <Video className="h-4 w-4" />
              <span>Explore Relief Feed</span>
            </Button>
          </Link>
        </div>

        <StatsOverview />

        <Tabs defaultValue="map" className="mt-8">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="map">Flood Map</TabsTrigger>
            <TabsTrigger value="report">Report Flood</TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
          </TabsList>

          <TabsContent value="map">
            <Card>
              <CardHeader>
                <CardTitle>Flood Map</CardTitle>
                <CardDescription>Current flood reports and risk areas across Nigeria</CardDescription>
              </CardHeader>
              <CardContent>
                <FloodMap />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="report">
            <Card>
              <CardHeader>
                <CardTitle>Report a Flood</CardTitle>
                <CardDescription>Submit information about flooding in your area</CardDescription>
              </CardHeader>
              <CardContent>
                <ReportForm />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="alerts">
            <Card>
              <CardHeader>
                <CardTitle>Flood Alerts</CardTitle>
                <CardDescription>Recent warnings and notifications</CardDescription>
              </CardHeader>
              <CardContent>
                <AlertsList />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

