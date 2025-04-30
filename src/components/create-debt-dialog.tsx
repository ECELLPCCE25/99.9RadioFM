"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface CreateDebtDialogProps {
  isOpen: boolean
  onClose: () => void
  onCreateGroup: (name: string, description: string) => void
}

export function CreateDebtDialog({ isOpen, onClose, onCreateGroup }: CreateDebtDialogProps) {
  const [debt, setDebt] = useState("")
  const [date, setDate] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (debt.trim()) {
      onCreateGroup(debt, date)
      setDebt("")
      setDate("")
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Debt Target</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Target Name</Label>
              <Input
                id="name"
                value={debt}
                onChange={(e) => setDebt(e.target.value)}
                placeholder="Enter group name"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Date</Label>
              <Textarea
                id="description"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="What's this group about?"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={!debt.trim()}>
              Create Debt
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
