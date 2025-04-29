"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Goal, Info, Send } from "lucide-react"
import type { Group, Message } from "@/lib/types"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MobileSidebar } from "./mobile-sidebar"
import { formatDistanceToNow } from "@/lib/utils"
import { Progress } from "./ui/progress"

interface GroupChatProps {
  group: Group
  goals: {goal:string, end_date:string, progress:number}[]
  onSendMessage: (content: string) => void
  onToggleInfo: () => void
  showInfo: boolean
  openGoalDialog:()=>void
}

export function GroupChat({ group, goals, onSendMessage, onToggleInfo, showInfo, openGoalDialog }: GroupChatProps) {
  const [message, setMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollToBottom()
  }, [group.messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
      onSendMessage(message)
      setMessage("")
    }
  }

  return (
    <>
      <div className="flex items-center border-b border-border p-4">
        <div className="md:hidden mr-2">
          <MobileSidebar groups={[group]} selectedGroup={group} onSelectGroup={() => {}} onCreateGroup={() => {}} />
        </div>
        <div className="flex-1">
          <h2 className="font-semibold">{group.name}</h2>
          <p className="text-xs text-muted-foreground">{group.participants.length} participants</p>
        </div>
        <Button variant="ghost" size="icon" onClick={onToggleInfo} className={showInfo ? "text-primary" : ""}>
          <Info className="h-5 w-5" />
          <span className="sr-only">Group Info</span>
        </Button>
      </div>

      <div className="flex-1 p-4 overflow-scroll">
        <div className="space-y-4">
          {group.messages.map((message) => (
            <MessageItem key={message.id} message={message} />
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div>
          <p className="text-2xl font-semibold mb-4">Group Goals</p>
          <div>
            {
              goals?.map((goal:{goal:string, end_date:string, progress:number}, i:number) => (
                <GoalItem key={i} goal={goal.goal} date={goal.end_date} progress={goal.progress} />
              ))
            }
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 w-full border-t flex justify-between items-center gap-4 bg-white p-4">
        <form onSubmit={handleSubmit} className=" flex-1 border-border flex gap-2 left-0 right-0 bg-background">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
          
        </form>
        <Button onClick={openGoalDialog} size="icon">
            <Goal className="h-5 w-5" />
            <span className="sr-only">Send message</span>
        </Button>
      </div>
    </>
  )
}

function GoalItem({goal, date, progress}:{goal:string, date:string, progress:number}){
  return (
    <div className="p-5 rounded-xl shadow-xs mb-4" style={{border:"0.01px solid rgba(0,0,0,0.05)"}}>
          <p className="text-xl font-semibold">Goal Created ✅!</p>
          <hr className="mt-4"/>
          <p className="text-lg mt-2"><span className="font-semibold">Goal</span> : {goal}</p>
          <p className="mt-1 text-md">End Date: {date}</p>
          <div className="flex items-center gap-5 mt-8">
            {/*@ts-ignore*/}
            {progress}% <Progress value={0} indicatorColor="#efb44a"/>
          </div>
    </div>
  )
}

function MessageItem({ message }: { message: Message }) {
  return (
    <div className="flex gap-3">
      <Avatar className="h-8 w-8">
        <AvatarImage src={message.sender.avatar || "/placeholder.svg"} alt={message.sender.name} />
        <AvatarFallback>
          {message.sender.name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="flex items-baseline gap-2">
          <span className="font-medium text-sm">{message.sender.name}</span>
          {/*@ts-ignore */}
          <span className="text-xs text-muted-foreground">{formatDistanceToNow(message.timestamp)}</span>
        </div>
        <p className="text-sm mt-1">{message.content}</p>
      </div>
    </div>
  )
}
