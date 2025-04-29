"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface CreateGroupGoalDialogProps {
  isOpen: boolean
  onClose: () => void
  onCreateGroupGoal: (goal: string, date: string) => void
}

export function CreateGroupGoalDialog({ isOpen, onClose, onCreateGroupGoal }: CreateGroupGoalDialogProps) {
  const [goal, setGoal] = useState("")
  const [end_date, setDate] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (goal.trim()) {
      onCreateGroupGoal(goal, end_date)
      setGoal("")
      setDate("")
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Goal</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="goal">Goal Name</Label>
              <Input
                id="goal"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                placeholder="Enter goal name"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">End date</Label>
              <Textarea
                id="description"
                value={end_date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="What's the end date?"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={!goal.trim()}>
              Create Goal
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
