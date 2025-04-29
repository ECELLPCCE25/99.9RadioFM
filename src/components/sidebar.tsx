"use client"

import { PlusCircle } from "lucide-react"
import type { Group } from "@/lib/types"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

interface SidebarProps {
  groups: Group[]
  selectedGroup: Group | null
  onSelectGroup: (group: Group) => void
  onCreateGroup: () => void
}

export function Sidebar({ groups, selectedGroup, onSelectGroup, onCreateGroup }: SidebarProps) {
  return (
    <div className="w-64 border-r border-border flex flex-col bg-muted/40 hidden md:flex">
      <div className="p-4 border-b border-border flex justify-between items-center">
        <h1 className="font-semibold text-lg">Group Chat</h1>
        <button
          onClick={onCreateGroup}
          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9"
          aria-label="Create new group"
        >
          <PlusCircle className="h-5 w-5" />
        </button>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-2">
          <h2 className="text-xs font-semibold text-muted-foreground mb-2 px-2">YOUR GROUPS</h2>
          <div className="space-y-1">
            {groups.map((group) => (
              <button
                key={group.id}
                onClick={() => onSelectGroup(group)}
                className={cn(
                  "w-full text-left px-3 py-2 rounded-md text-sm transition-colors",
                  selectedGroup?.id === group.id ? "bg-accent text-accent-foreground" : "hover:bg-accent/50",
                )}
              >
                <div className="font-medium">{group.name}</div>
                <div className="text-xs text-muted-foreground truncate">
                  {group.messages.length > 0
                    ? `${group.messages[group.messages.length - 1].sender.name.split(" ")[0]}: ${group.messages[group.messages.length - 1].content.substring(0, 20)}${group.messages[group.messages.length - 1].content.length > 20 ? "..." : ""}`
                    : "No messages yet"}
                </div>
              </button>
            ))}
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}
