import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function SettingsTab() {
  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>Configure your pet feeder preferences</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Settings coming soon...</p>
      </CardContent>
    </Card>
  )
}
