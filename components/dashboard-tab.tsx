"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { DashboardData } from "@/lib/types"
import { Utensils, Droplets, Clock } from "lucide-react"

function formatTimeSince(isoString: string | null): string {
  if (!isoString) return "Never"
  
  const date = new Date(isoString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  
  const minutes = Math.floor(diffMs / 60000)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  
  if (days > 0) return `${days}d ${hours % 24}h ago`
  if (hours > 0) return `${hours}h ${minutes % 60}m ago`
  if (minutes > 0) return `${minutes}m ago`
  return "Just now"
}

export function DashboardTab() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/dashboard")
        if (!res.ok) throw new Error("Failed to fetch data")
        const json = await res.json()
        setData(json)
      } catch (e) {
        setError(e instanceof Error ? e.message : "Unknown error")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
    const interval = setInterval(fetchData, 30000) // Refresh every 30s
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div className="mt-4 grid gap-4">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <Skeleton className="h-4 w-24" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-32" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <Card className="mt-4 border-destructive">
        <CardContent className="pt-6">
          <p className="text-destructive">Error: {error}</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="mt-4 grid gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center gap-2 pb-2">
          <Utensils className="h-5 w-5 text-muted-foreground" />
          <CardTitle className="text-sm font-medium">Latest Feed</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">
            {data?.latestFeedGrams != null
              ? `${Math.round(data.latestFeedGrams * 10) / 10}g`
              : "—"}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center gap-2 pb-2">
          <Clock className="h-5 w-5 text-muted-foreground" />
          <CardTitle className="text-sm font-medium">Time Since Last Feed</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{formatTimeSince(data?.lastFeedTime ?? null)}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center gap-2 pb-2">
          <Droplets className="h-5 w-5 text-muted-foreground" />
          <CardTitle className="text-sm font-medium">Latest Water Drop</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">
            {data?.latestWaterDrop != null ? `${data.latestWaterDrop}g` : "—"}
          </p>
          {data?.lastWaterTime && (
            <p className="text-sm text-muted-foreground">
              {formatTimeSince(data.lastWaterTime)}
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
