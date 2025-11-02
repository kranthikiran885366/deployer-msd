import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Database, Plus, Zap, Settings } from "lucide-react"
import { cn } from "@/lib/utils"

export function DatabaseGrid({ databases = [] }) {
  const getDbIcon = (type) => {
    switch (type?.toLowerCase()) {
      case "postgresql":
        return "🐘"
      case "mysql":
        return "🐬"
      case "mongodb":
        return "🍃"
      case "redis":
        return "⚡"
      case "dynamodb":
        return "📊"
      case "supabase":
        return "🟢"
      case "sqlite":
        return "📁"
      default:
        return "💾"
    }
  }

  const getUsagePercent = (db) => {
    // Mock calculation based on available data
    return db.usage || Math.floor(Math.random() * 85) + 15
  }

  const getUsageColor = (percent) => {
    if (percent > 80) return "bg-red-500"
    if (percent > 60) return "bg-yellow-500"
    return "bg-green-500"
  }

  if (!databases || databases.length === 0) {
    return (
      <Card className="col-span-full border-0 shadow-lg bg-gradient-to-br from-card via-card/95 to-card/80">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="w-5 h-5 text-purple-500" />
            Databases
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Database className="w-12 h-12 text-muted-foreground/50 mx-auto mb-3" />
            <p className="text-muted-foreground">No databases connected</p>
            <Button size="sm" className="mt-4 gap-2">
              <Plus className="w-4 h-4" />
              Add Database
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="col-span-full border-0 shadow-lg bg-gradient-to-br from-card via-card/95 to-card/80">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Database className="w-5 h-5 text-purple-500" />
            Databases
            <span className="text-sm font-normal text-muted-foreground ml-2">
              ({databases.length})
            </span>
          </CardTitle>
          <Button variant="outline" size="sm" className="gap-2">
            <Plus className="w-4 h-4" />
            Add
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {databases.map((db, index) => {
            const usage = getUsagePercent(db)
            return (
              <div
                key={db.id || index}
                className="p-4 rounded-lg border border-border/50 bg-muted/30 hover:bg-muted/50 transition-all hover:border-border group hover:shadow-md"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <span className="text-2xl flex-shrink-0 mt-1">
                      {getDbIcon(db.type)}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate group-hover:text-blue-400 transition-colors">
                        {db.name || `Database #${index + 1}`}
                      </p>
                      <Badge variant="secondary" className="text-xs mt-1">
                        {db.type || "Unknown"}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Usage Bar */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Storage</span>
                    <span className="font-medium">{usage}%</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className={cn(
                        "h-full transition-all",
                        getUsageColor(usage)
                      )}
                      style={{ width: `${usage}%` }}
                    />
                  </div>
                </div>

                {/* Status */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-xs text-muted-foreground/70">
                      {db.status || "Connected"}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 hover:bg-muted"
                  >
                    <Settings className="w-4 h-4 text-muted-foreground/70" />
                  </Button>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
