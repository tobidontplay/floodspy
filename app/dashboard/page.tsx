import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FloodDataProcessor } from "@/components/flood-data-processor"
import { BarChart, LineChart, PieChart } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">FloodSpy Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,853</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">-3% from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Prediction Accuracy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87%</div>
            <p className="text-xs text-muted-foreground">+5% from initial model</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Flood Reports Over Time</CardTitle>
            <CardDescription>Weekly report submissions</CardDescription>
          </CardHeader>
          <CardContent className="h-80 flex items-center justify-center">
            <div className="w-full h-full flex items-center justify-center border border-dashed border-muted-foreground/20 rounded-md">
              <div className="flex flex-col items-center text-muted-foreground">
                <LineChart className="h-8 w-8 mb-2" />
                <span>Time-series chart would render here</span>
                <span className="text-xs">(Using real chart library in production)</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Reports by Severity</CardTitle>
            <CardDescription>Distribution of water levels reported</CardDescription>
          </CardHeader>
          <CardContent className="h-80 flex items-center justify-center">
            <div className="w-full h-full flex items-center justify-center border border-dashed border-muted-foreground/20 rounded-md">
              <div className="flex flex-col items-center text-muted-foreground">
                <PieChart className="h-8 w-8 mb-2" />
                <span>Pie chart would render here</span>
                <span className="text-xs">(Using real chart library in production)</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Flood Risk Analysis</CardTitle>
            <CardDescription>Process and analyze flood data from multiple sources</CardDescription>
          </CardHeader>
          <CardContent>
            <FloodDataProcessor />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Reports by Location</CardTitle>
            <CardDescription>Number of reports per area</CardDescription>
          </CardHeader>
          <CardContent className="h-80 flex items-center justify-center">
            <div className="w-full h-full flex items-center justify-center border border-dashed border-muted-foreground/20 rounded-md">
              <div className="flex flex-col items-center text-muted-foreground">
                <BarChart className="h-8 w-8 mb-2" />
                <span>Bar chart would render here</span>
                <span className="text-xs">(Using real chart library in production)</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

