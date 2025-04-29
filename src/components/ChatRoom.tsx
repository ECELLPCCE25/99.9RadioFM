"use client"

import { useEffect, useState } from "react"
import { GroupChat } from "@/components/group-chat"
import { GroupInfo } from "@/components/group-info"
import { Sidebar } from "@/components/sidebar"
import { CreateGroupDialog } from "./create-group-dialog"
import type { Group, Message } from "@/lib/types"
import { api } from "../../convex/_generated/api"
import { useMutation, useQuery } from "convex/react"
import { useUser } from "@clerk/nextjs"
import { CreateGroupGoalDialog } from "./create-group-goal-dialog"

export function ChatRoom() {
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null)
  const [showGroupInfo, setShowGroupInfo] = useState(false)
  const [groups, setGroups] = useState<any[]>([])

  const [groupGoals, setGroupGoals] = useState<any[]>([])

  const [isCreatingGroup, setIsCreatingGroup] = useState(false)
  const [isCreatingGroupGoal, setIsCreatingGroupGoal] = useState(false)

  const { user } = useUser()
  const createGroup = useMutation(api.groups.createGroup)
  const createMessage = useMutation(api.groups.postMessage)
  const existingGroup = useQuery(api.groups.getAllGroups)

  const createGroupGoal = useMutation(api.group_goals.createGroupGoal)
  const existingGroupGoals = useQuery(api.group_goals.getGoalsOfGroup, { id: selectedGroup?.id || "" })

  useEffect(() => {
      setGroups(existingGroup || [])
  }, [existingGroup])

  useEffect(() => {
    if(!existingGroupGoals) return
    console.log(existingGroupGoals)
    const array = Object.values(existingGroupGoals);
    setGroupGoals(array || [])
}, [existingGroupGoals])

  const handleSelectGroup = (group: Group) => {
    setSelectedGroup(group)
    setShowGroupInfo(false)
  }

  const handleToggleGroupInfo = () => {
    setShowGroupInfo(!showGroupInfo)
  }

  const handleSendMessage = async(content: string) => {
    if (!selectedGroup || !content.trim()) return

    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: { id: "1", name: user?.fullName!, avatar: user?.imageUrl! },
      timestamp: new Date(),
    }

    const updatedGroups = groups.map((group) => {
      if (group.id === selectedGroup.id) {
        return {
          ...group,
          messages: [...group.messages, newMessage],
        }
      }
      return group
    })

    await createMessage({
        groupId:selectedGroup.id,
        content:content,
        sender:{
            id: user?.id!,
            name: user?.fullName!,
            avatar: user?.imageUrl!,
        }
    })

    setGroups(updatedGroups)
    setSelectedGroup(updatedGroups.find((g) => g.id === selectedGroup.id) || null)
  }

  const handleCreateGroup = async(name: string, description: string) => {
    const newGroup: Group = {
      id: Date.now().toString(),
      name,
      description,
      createdAt: new Date(),
      participants: [
        { id: "1", name: "Alex Johnson", email: "alex@example.com", avatar: "/placeholder.svg?height=40&width=40" },
      ],
      messages: [],
    }
    
    await createGroup({
        id: newGroup.id,
        name: newGroup.name,
        email: "joshi@doshi.com",
        description: newGroup.description,
        uid: user?.id || "1",
        uname: user?.fullName || "CHIRAG MAHAJAN",
        avatar: "https://sdmntprwestus.oaiusercontent.com/files/00000000-2f20-6230-b633-08a34b36529b/raw?se=2025-04-29T17%3A25%3A16Z&sp=r&sv=2024-08-04&sr=b&scid=48a1bb51-f259-5205-83a5-a4a809803dbf&skoid=de76bc29-7017-43d4-8d90-7a49512bae0f&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-04-29T03%3A11%3A11Z&ske=2025-04-30T03%3A11%3A11Z&sks=b&skv=2024-08-04&sig=X1nIB4b5%2BAiM1NzzdkuQ5ChzaSP2lE3YCJ%2B/f6f5rXY%3D",
    })

    setIsCreatingGroup(false)
    setSelectedGroup(newGroup)
  }

  const handleCreateGroupGoal = async(goal: string, date: string) => {
    
    await createGroupGoal({
        id: selectedGroup?.id!,
        goal: goal,
        end_date: date,
        progress: 0,
    })

    setIsCreatingGroupGoal(false)
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar
        groups={groups}
        selectedGroup={selectedGroup}
        onSelectGroup={handleSelectGroup}
        onCreateGroup={() => setIsCreatingGroup(true)}
      />

      <main className="flex flex-1 flex-col overflow-hidden">
        {selectedGroup ? (
          <div className="flex flex-1 overflow-hidden">
            <div className={`flex-1 relative ${showGroupInfo ? "hidden md:flex" : "flex"} flex-col`}>
              <GroupChat
                group={selectedGroup}
                goals={groupGoals}
                onSendMessage={handleSendMessage}
                onToggleInfo={handleToggleGroupInfo}
                showInfo={showGroupInfo}
                openGoalDialog={()=>setIsCreatingGroupGoal(true)}
              />
            </div>

            {showGroupInfo && (
              <div className={`w-full md:w-80 border-l border-border ${!showGroupInfo ? "hidden" : "flex"} flex-col`}>
                <GroupInfo group={selectedGroup} onClose={() => setShowGroupInfo(false)} />
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-1 items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-2">Welcome to Group Chat</h2>
              <p className="text-muted-foreground mb-4">Select a group to start chatting or create a new one</p>
              <button
                onClick={() => setIsCreatingGroup(true)}
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
              >
                Create New Group
              </button>
            </div>
          </div>
        )}
      </main>

      <CreateGroupDialog
        isOpen={isCreatingGroup}
        onClose={() => setIsCreatingGroup(false)}
        onCreateGroup={handleCreateGroup}
      />
      <CreateGroupGoalDialog
        isOpen={isCreatingGroupGoal}
        onClose={() => setIsCreatingGroupGoal(false)}
        onCreateGroupGoal={handleCreateGroupGoal}
      />
    </div>
  )
}
