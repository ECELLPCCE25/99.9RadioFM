import { Menu } from "lucide-react"
import type { Group } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Sidebar } from "./sidebar"

interface MobileSidebarProps {
  groups: Group[]
  selectedGroup: Group | null
  onSelectGroup: (group: Group) => void
  onCreateGroup: () => void
}

export function MobileSidebar({ groups, selectedGroup, onSelectGroup, onCreateGroup }: MobileSidebarProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 w-64">
        <Sidebar
          groups={groups}
          selectedGroup={selectedGroup}
          onSelectGroup={onSelectGroup}
          onCreateGroup={onCreateGroup}
        />
      </SheetContent>
    </Sheet>
  )
}
