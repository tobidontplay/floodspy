"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { AlertTriangle, Users, MapPin, BarChart2 } from "lucide-react"

export default function StatsOverview() {
  const [stats, setStats] = useState({
    activeAlerts: 0,
    reportsToday: 0,
    areasMonitored: 0,
    riskLevel: 0,
  })

  useEffect(() => {
    // Simulate loading stats
    const timer = setTimeout(() => {
      setStats({
        activeAlerts: 12,
        reportsToday: 87,
        areasMonitored: 34,
        riskLevel: 65,
      })
    }, 800)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardContent className="p-4 flex items-center gap-4">
          <div className="bg-red-100 dark:bg-red-900/30 p-3 rounded-full">
            <AlertTriangle className="h-6 w-6 text-red-500 dark:text-red-400" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Active Alerts</p>
            <h3 className="text-2xl font-bold">{stats.activeAlerts}</h3>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4 flex items-center gap-4">
          <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full">
            <Users className="h-6 w-6 text-blue-500 dark:text-blue-400" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Reports Today</p>
            <h3 className="text-2xl font-bold">{stats.reportsToday}</h3>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4 flex items-center gap-4">
          <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full">
            <MapPin className="h-6 w-6 text-green-500 dark:text-green-400" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Areas Monitored</p>
            <h3 className="text-2xl font-bold">{stats.areasMonitored}</h3>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4 flex items-center gap-4">
          <div className="bg-yellow-100 dark:bg-yellow-900/30 p-3 rounded-full">
            <BarChart2 className="h-6 w-6 text-yellow-500 dark:text-yellow-400" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Overall Risk Level</p>
            <div className="flex items-center gap-2">
              <h3 className="text-2xl font-bold">{stats.riskLevel}%</h3>
              <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full ${
                    stats.riskLevel > 66 ? "bg-red-500" : stats.riskLevel > 33 ? "bg-yellow-500" : "bg-green-500"
                  }`}
                  style={{ width: `${stats.riskLevel}%` }}
                ></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

