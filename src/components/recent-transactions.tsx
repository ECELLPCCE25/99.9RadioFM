"use client"

import { Building, Factory, Library, Utensils, Zap } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

// Mock transactions data
const transactions = [
  {
    id: "1",
    date: "Apr 24, 2025",
    recipient: "AARAV ENTERPRISES",
    amount: 1200.0,
    category: "Other",
    icon: Building,
  },
  {
    id: "2",
    date: "Apr 22, 2025",
    recipient: "CITY COLLEGE",
    amount: 8750.0,
    category: "Education",
    icon: Library,
  },
  {
    id: "3",
    date: "Apr 20, 2025",
    recipient: "ZOMATO",
    amount: 450.75,
    category: "Food",
    icon: Utensils,
  },
  {
    id: "4",
    date: "Apr 18, 2025",
    recipient: "JIO RECHARGE",
    amount: 599.0,
    category: "Recharges",
    icon: Zap,
  },
  {
    id: "5",
    date: "Apr 15, 2025",
    recipient: "CITY FUEL STATION",
    amount: 350.5,
    category: "Fuel",
    icon: Factory,
  },
]

// Function to get color based on category
const getCategoryColor = (category: string) => {
  switch (category.toLowerCase()) {
    case "education":
      return "bg-blue-500"
    case "food":
      return "bg-green-500"
    case "traveling":
      return "bg-yellow-500"
    case "recharges":
      return "bg-purple-500"
    case "fuel":
      return "bg-red-500"
    case "electricity":
      return "bg-orange-500"
    case "chocolates":
      return "bg-pink-500"
    default:
      return "bg-gray-500"
  }
}

export function RecentTransactions() {
  return (
    <div className="space-y-4">
      {transactions.map((transaction) => (
        <div key={transaction.id} className="flex items-center justify-between border-b pb-4">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-md ${getCategoryColor(transaction.category)}`}>
              <transaction.icon className="h-4 w-4 text-white" />
            </div>
            <div>
              <p className="font-medium">{transaction.recipient}</p>
              <p className="text-xs text-muted-foreground">{transaction.date}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline">{transaction.category}</Badge>
            <span className="font-medium">₹{transaction.amount.toLocaleString()}</span>
          </div>
        </div>
      ))}
      <Button variant="outline" size="sm" className="w-full">
        View All Transactions
      </Button>
    </div>
  )
}
