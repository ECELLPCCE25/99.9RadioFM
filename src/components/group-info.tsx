"use client"

import { X } from "lucide-react"
import type { Group } from "@/lib/types"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { formatDistanceToNow } from "@/lib/utils"

interface GroupInfoProps {
  group: Group
  onClose: () => void
}

export function GroupInfo({ group, onClose }: GroupInfoProps) {
  return (
    <>
      <div className="flex items-center justify-between border-b border-border p-4">
        <h2 className="font-semibold">Group Info</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-5 w-5" />
          <span className="sr-only">Close</span>
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-6">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Group Name</h3>
            <p className="text-sm">{group.name}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Description</h3>
            <p className="text-sm">{group.description}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Created</h3>
            <p className="text-sm">{formatDistanceToNow(group.createdAt.getDate())}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">
              Participants ({group.participants.length})
            </h3>
            <div className="space-y-3">
              {group.participants.map((participant) => (
                <div key={participant.id} className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={participant.avatar || "/placeholder.svg"} alt={participant.name} />
                    <AvatarFallback>
                      {participant.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium text-sm">{participant.name}</div>
                    <div className="text-xs text-muted-foreground">{participant.email}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>
    </>
  )
}
