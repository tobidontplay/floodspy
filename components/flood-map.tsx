"use client"

import { useState, useEffect, useRef } from "react"
import { Loader2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function FloodMap() {
  const [loading, setLoading] = useState(true)
  const [floodData, setFloodData] = useState<any[]>([])
  const [view, setView] = useState("satellite")
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Simulate loading flood data
    const timer = setTimeout(() => {
      setFloodData([
        { id: 1, location: "Lagos Island", severity: "high", lat: 6.455, lng: 3.424 },
        { id: 2, location: "Lekki", severity: "medium", lat: 6.4698, lng: 3.5852 },
        { id: 3, location: "Ikeja", severity: "low", lat: 6.6018, lng: 3.3515 },
        { id: 4, location: "Abuja Central", severity: "medium", lat: 9.0765, lng: 7.3986 },
        { id: 5, location: "Port Harcourt", severity: "high", lat: 4.8156, lng: 7.0498 },
      ])
      setLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  // In a real implementation, this would use a mapping library like Leaflet or Mapbox
  // For this prototype, we'll simulate a map with a placeholder

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Badge
            variant={view === "satellite" ? "default" : "outline"}
            onClick={() => setView("satellite")}
            className="cursor-pointer"
          >
            Satellite
          </Badge>
          <Badge
            variant={view === "terrain" ? "default" : "outline"}
            onClick={() => setView("terrain")}
            className="cursor-pointer"
          >
            Terrain
          </Badge>
          <Badge
            variant={view === "risk" ? "default" : "outline"}
            onClick={() => setView("risk")}
            className="cursor-pointer"
          >
            Risk Zones
          </Badge>
        </div>

        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by severity" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Severities</SelectItem>
            <SelectItem value="high">High Risk</SelectItem>
            <SelectItem value="medium">Medium Risk</SelectItem>
            <SelectItem value="low">Low Risk</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div
        ref={mapRef}
        className="aspect-[16/9] bg-muted rounded-md relative overflow-hidden border"
        style={{
          backgroundImage: "url('/placeholder.svg?height=600&width=800')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-white/80">
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
              <p className="text-sm text-muted-foreground">Loading flood data...</p>
            </div>
          </div>
        ) : (
          <>
            {/* Map markers - in a real implementation these would be positioned on the map */}
            <div className="absolute top-4 right-4 bg-background/90 p-3 rounded-md shadow-md">
              <h4 className="font-medium text-sm mb-2">Legend</h4>
              <div className="space-y-1 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500"></span>
                  <span>High Risk ({floodData.filter((d) => d.severity === "high").length})</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                  <span>Medium Risk ({floodData.filter((d) => d.severity === "medium").length})</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-green-500"></span>
                  <span>Low Risk ({floodData.filter((d) => d.severity === "low").length})</span>
                </div>
              </div>
            </div>

            {/* Sample markers - in a real implementation these would use actual coordinates */}
            {floodData.map((point, index) => {
              // Calculate position based on lat/lng (simplified for demo)
              const left = ((point.lng - 3) / 5) * 100
              const top = (1 - (point.lat - 4) / 6) * 100

              return (
                <div
                  key={point.id}
                  className={`absolute w-4 h-4 rounded-full flex items-center justify-center -ml-2 -mt-2 cursor-pointer
                             ${
                               point.severity === "high"
                                 ? "bg-red-500"
                                 : point.severity === "medium"
                                   ? "bg-yellow-500"
                                   : "bg-green-500"
                             }`}
                  style={{
                    left: `${Math.min(Math.max(left, 5), 95)}%`,
                    top: `${Math.min(Math.max(top, 5), 95)}%`,
                  }}
                  title={point.location}
                >
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-current"></span>
                </div>
              )
            })}
          </>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {floodData.map((point) => (
          <div key={point.id} className="p-3 bg-white rounded-md border">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">{point.location}</h4>
              <Badge
                variant={
                  point.severity === "high" ? "destructive" : point.severity === "medium" ? "warning" : "success"
                }
              >
                {point.severity}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Last updated: 2 hours ago</p>
            <Button variant="link" size="sm" className="px-0 h-auto mt-1">
              View details
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}

