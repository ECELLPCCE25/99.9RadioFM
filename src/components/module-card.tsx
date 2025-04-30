import type { ReactNode } from "react"
import { ChevronRight, Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"

interface ModuleCardProps {
  title: string
  description: string
  icon: ReactNode
  progress: number
  level: "beginner" | "intermediate" | "advanced"
  duration: string
  id: string
}

export function ModuleCard({ id, title, description, icon, progress, level, duration }: ModuleCardProps) {
  const getLevelStyle = () => {
    switch (level) {
      case "beginner":
        return "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-300"
      case "intermediate":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "advanced":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
      default:
        return ""
    }
  }

  return (
    <Card className="overflow-hidden border border-border bg-background transition-all hover:shadow-lg hover:border-primary/30 duration-300">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="text-3xl">{icon}</div>
          <Badge variant="outline" className={`px-2 py-0.5 text-xs rounded-sm font-medium ${getLevelStyle()}`}>
            <Star className="inline-block w-3 h-3 mr-1 -mt-0.5" />
            {level.charAt(0).toUpperCase() + level.slice(1)}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="pb-3">
        <h3 className="font-semibold text-lg leading-tight mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground leading-snug mb-4">{description}</p>

        <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
          <span>{duration}</span>
          <span>{progress > 0 ? `${progress}% complete` : "Not started"}</span>
        </div>

        <Progress value={progress} className="h-1 rounded-full bg-muted" />
      </CardContent>

      <CardFooter>
        <Link href={`/learn/${id}`} className="w-full">
          <Button variant="ghost" className="w-full justify-between px-3 py-1.5 text-sm">
            {progress > 0 ? "Continue" : "Start Learning"}
            <ChevronRight className="h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}