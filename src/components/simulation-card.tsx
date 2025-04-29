import type { ReactNode } from "react"
import { ChevronRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface ModuleCardProps {
  title: string
  description: string
  icon: ReactNode
  progress: number
  level: "beginner" | "intermediate" | "advanced"
  duration: string
}

export function SimulationCard({ title, description, icon, progress, level, duration }: ModuleCardProps) {
  const getLevelColor = (level: string) => {
    switch (level) {
      case "beginner":
        return "bg-teal-50 text-teal-700 hover:bg-teal-50 dark:bg-teal-950 dark:text-teal-400"
      case "intermediate":
        return "bg-blue-50 text-blue-700 hover:bg-blue-50 dark:bg-blue-950 dark:text-blue-400"
      case "advanced":
        return "bg-purple-50 text-purple-700 hover:bg-purple-50 dark:bg-purple-950 dark:text-purple-400"
      default:
        return ""
    }
  }

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          {icon}
          <Badge variant="outline" className={getLevelColor(level)}>
            {level.charAt(0).toUpperCase() + level.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <h3 className="font-semibold text-lg mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground mb-3">{description}</p>
      </CardContent>
      <CardFooter>
        <Button variant="ghost" className="w-full justify-between">
          {progress > 0 ? "Continue" : "Start Learning"}
          <ChevronRight className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}
