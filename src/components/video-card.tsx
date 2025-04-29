import { Play } from "lucide-react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import Video from 'next-video';
import T1 from '@/assets/thumbnail1.avif'

interface VideoCardProps {
  title: string
  description: string
  duration: string
  level: "beginner" | "intermediate" | "advanced"
  views: string
}

export function VideoCard({ title, description, duration, level, views }: VideoCardProps) {
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
      <div className="relative">
        <Image src={T1.src} width={T1.width} height={T1.height} alt=""  className="w-full object-contain"/>
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
          <div className="rounded-full bg-white/90 p-3">
            <Play className="h-6 w-6 text-teal-700 fill-teal-700" />
          </div>
        </div>
        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">{duration}</div>
      </div>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <Badge variant="outline" className={getLevelColor(level)}>
            {level.charAt(0).toUpperCase() + level.slice(1)}
          </Badge>
          <span className="text-xs text-muted-foreground">{views} views</span>
        </div>
        <h3 className="font-semibold text-base mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
      </CardContent>
    </Card>
  )
}
