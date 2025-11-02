import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Rocket, MoreVertical, ArrowUpRight, Clock } from "lucide-react"
import { cn } from "@/lib/utils"

export function RecentDeploymentsList({ deployments = [], onRefresh }) {
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "running":
      case "success":
        return "#10b981"
      case "building":
        return "#f59e0b"
      case "failed":
        return "#ef4444"
      default:
        return "#6b7280"
    }
  }

  const getStatusBadgeVariant = (status) => {
    switch (status?.toLowerCase()) {
      case "running":
      case "success":
        return "default"
      case "building":
        return "secondary"
      case "failed":
        return "destructive"
      default:
        return "outline"
    }
  }

  const formatTime = (timestamp) => {
    if (!timestamp) return "Unknown"
    const date = new Date(timestamp)
    const now = new Date()
    const diff = now - date
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (minutes < 1) return "just now"
    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    return `${days}d ago`
  }

  if (!deployments || deployments.length === 0) {
    return (
      <Card className="col-span-full lg:col-span-2 border-0 shadow-lg bg-gradient-to-br from-card via-card/95 to-card/80 backdrop-blur">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Rocket className="w-5 h-5 text-blue-500" />
            Recent Deployments
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Rocket className="w-12 h-12 text-muted-foreground/50 mx-auto mb-3" />
            <p className="text-muted-foreground">No deployments yet</p>
            <p className="text-sm text-muted-foreground/70">Start by creating your first deployment</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="col-span-full lg:col-span-2 border-0 shadow-lg bg-gradient-to-br from-card via-card/95 to-card/80 backdrop-blur hover:shadow-xl transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Rocket className="w-5 h-5 text-blue-500" />
            Recent Deployments
            <span className="text-sm font-normal text-muted-foreground ml-2">
              ({deployments.length})
            </span>
          </CardTitle>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={onRefresh}
            className="hover:bg-muted"
          >
            Refresh
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {deployments.slice(0, 5).map((deploy, index) => (
            <div
              key={deploy.id || index}
              className="flex items-center justify-between p-3 rounded-lg bg-muted/40 hover:bg-muted/60 transition-all duration-300 group border border-border/50 hover:border-border"
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                {/* Status Indicator */}
                <div
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0 animate-pulse"
                  style={{ backgroundColor: getStatusColor(deploy.status) }}
                />

                {/* Deployment Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate group-hover:text-blue-400 transition-colors">
                    {deploy.name || `Deployment #${deploy.id}`}
                  </p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <Clock className="w-3 h-3 text-muted-foreground/70" />
                    <p className="text-xs text-muted-foreground/70">
                      {formatTime(deploy.createdAt || deploy.timestamp)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Status Badge */}
              <div className="flex items-center gap-2 ml-2 flex-shrink-0">
                <Badge
                  variant={getStatusBadgeVariant(deploy.status)}
                  className="text-xs capitalize"
                >
                  {deploy.status || "unknown"}
                </Badge>
              </div>
            </div>
          ))}

          {deployments.length > 5 && (
            <div className="pt-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                asChild
              >
                <a href="/deployments">
                  View all deployments
                  <ArrowUpRight className="w-3 h-3 ml-2" />
                </a>
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
