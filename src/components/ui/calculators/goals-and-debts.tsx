"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Calendar } from "lucide-react"
import { Percent } from "lucide-react"
import { Button } from "../button"
import { useUser } from "@clerk/nextjs"
import { api } from "../../../../convex/_generated/api"
import { useMutation, useQueries, useQuery } from "convex/react"
import { CreateDebtDialog } from "@/components/create-debt-dialog"
import { Progress } from "@radix-ui/react-progress"

export default function GoalsAndDebts() {
  const [isCreatingDebt, setIsCreatingDebt] = useState(false)
  const { user } = useUser();
  const debts = useQuery(api.debts.getDebtsofUser,{ id: user?.id || "" })
  
  return (
    <Card className="border-0 shadow-none">
      {
        debts && Object.values(debts).length > 0 && Object.values(debts).map((debt, i) => (
          <DebtItem 
            key={i} 
            goal={debt.debt} 
            date={debt.end_date} 
            progress={debt.progress} 
          />
        ))
      }

    </Card>
  )
}


function DebtItem({goal, date, progress}:{goal:string, date:string, progress:number}){
    return (
      <div className="p-5 rounded-xl shadow-xs mb-4" style={{border:"0.01px solid rgba(0,0,0,0.05)"}}>
            <p className="text-xl font-semibold">Debt Created ✅!</p>
            <hr className="mt-4"/>
            <p className="text-lg mt-2"><span className="font-semibold">Goal</span> : {goal}</p>
            <p className="mt-1 text-md">End Date: {date}</p>
            <div className="flex items-center gap-5 mt-8">
              {/*@ts-ignore*/}
              {progress}% <Progress value={progress} indicatorColor="#efb44a"/>
            </div>
      </div>
    )
  }