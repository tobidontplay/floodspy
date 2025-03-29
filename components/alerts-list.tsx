"use client"

import { useState, useEffect } from "react"
import { AlertTriangle, Bell, BellOff, MapPin, ExternalLink, Loader2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"

export default function AlertsList() {
  const [loading, setLoading] = useState(true)
  const [alerts, setAlerts] = useState<any[]>([])
  const [notificationsEnabled, setNotificationsEnabled] = useState(false)
  const [locationFilter, setLocationFilter] = useState("")

  useEffect(() => {
    // Simulate loading alerts
    const timer = setTimeout(() => {
      setAlerts([
        {
          id: 1,
          severity: "high",
          location: "Lagos Island",
          message: "Roads impassable near Marina. Seek higher ground immediately.",
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          source: "user_reports",
        },
        {
          id: 2,
          severity: "medium",
          location: "Abuja",
          message: "Heavy rainfall expected in next 24 hours. Prepare for possible flooding.",
          timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
          source: "nimet_forecast",
        },
        {
          id: 3,
          severity: "low",
          location: "Port Harcourt",
          message: "Minor flooding reported in some areas. Exercise caution when traveling.",
          timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
          source: "satellite_data",
        },
        {
          id: 4,
          severity: "high",
          location: "Lekki",
          message: "Flash flooding reported. Multiple roads closed.",
          timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
          source: "user_reports",
        },
      ])
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const formatTimeAgo = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffHrs = Math.floor(diffMs / (1000 * 60 * 60))

    if (diffHrs < 1) {
      const diffMins = Math.floor(diffMs / (1000 * 60))
      return `${diffMins} minute${diffMins !== 1 ? "s" : ""} ago`
    } else if (diffHrs < 24) {
      return `${diffHrs} hour${diffHrs !== 1 ? "s" : ""} ago`
    } else {
      const diffDays = Math.floor(diffHrs / 24)
      return `${diffDays} day${diffDays !== 1 ? "s" : ""} ago`
    }
  }

  const filteredAlerts = locationFilter
    ? alerts.filter((alert) => alert.location.toLowerCase().includes(locationFilter.toLowerCase()))
    : alerts

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-2">
          <Switch id="notifications" checked={notificationsEnabled} onCheckedChange={setNotificationsEnabled} />
          <Label htmlFor="notifications" className="cursor-pointer">
            {notificationsEnabled ? (
              <span className="flex items-center gap-1">
                <Bell className="h-4 w-4" /> Notifications enabled
              </span>
            ) : (
              <span className="flex items-center gap-1">
                <BellOff className="h-4 w-4" /> Notifications disabled
              </span>
            )}
          </Label>
        </div>

        <div className="relative w-full sm:w-64">
          <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Filter by location"
            className="pl-8"
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
          />
        </div>
      </div>

      <Separator />

      {loading ? (
        <div className="flex flex-col items-center justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500 mb-2" />
          <p className="text-sm text-muted-foreground">Loading alerts...</p>
        </div>
      ) : filteredAlerts.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No alerts found for this location</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-4 rounded-md border-l-4 ${
                alert.severity === "high"
                  ? "border-l-red-500 bg-red-500/10 dark:bg-red-950/20"
                  : alert.severity === "medium"
                    ? "border-l-yellow-500 bg-yellow-500/10 dark:bg-yellow-950/20"
                    : "border-l-green-500 bg-green-500/10 dark:bg-green-950/20"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-2">
                  <AlertTriangle
                    className={`h-5 w-5 mt-0.5 ${
                      alert.severity === "high"
                        ? "text-red-500"
                        : alert.severity === "medium"
                          ? "text-yellow-500"
                          : "text-green-500"
                    }`}
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{alert.location}</h4>
                      <Badge
                        variant={
                          alert.severity === "high"
                            ? "destructive"
                            : alert.severity === "medium"
                              ? "warning"
                              : "success"
                        }
                      >
                        {alert.severity}
                      </Badge>
                    </div>
                    <p className="text-sm mt-1">{alert.message}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <p className="text-xs text-muted-foreground">{formatTimeAgo(alert.timestamp)}</p>
                      <p className="text-xs text-muted-foreground">
                        Source:{" "}
                        {alert.source === "user_reports"
                          ? "User Reports"
                          : alert.source === "nimet_forecast"
                            ? "NiMet Forecast"
                            : "Satellite Data"}
                      </p>
                    </div>
                  </div>
                </div>

                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <ExternalLink className="h-4 w-4" />
                  <span className="sr-only">View details</span>
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-center">
        <Button variant="outline">Load more alerts</Button>
      </div>
    </div>
  )
}

