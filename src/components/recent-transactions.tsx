'use client'

import { Building, Factory, Library, Utensils, Zap, ShoppingBag, Car, Plane } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

interface MoneySpent {
    category: string
    date: string
    fullTimestamp: string
    moneyPaid: string
    to: string
  }
interface RecentTransactionsProps {
  transactions: MoneySpent[]
}

// Map categories to icons
const getCategoryIcon = (category: string) => {
  switch (category.toLowerCase()) {
    case 'education':
      return Library
    case 'food':
      return Utensils
    case 'traveling':
      return Plane
    case 'recharges':
      return Zap
    case 'fuel':
      return Car
    case 'electricity':
      return Factory
    case 'chocolates':
      return ShoppingBag
    default:
      return Building // Fallback for "Other" or unknown categories
  }
}

// Map categories to Tailwind background color classes (aligned with ExpenseOverview)
const getCategoryColor = (category: string) => {
  switch (category.toLowerCase()) {
    case 'education':
      return 'bg-blue-500' // hsl(217, 91%, 60%)
    case 'food':
      return 'bg-green-500' // hsl(142, 76%, 36%)
    case 'traveling':
      return 'bg-yellow-500' // hsl(47, 96%, 53%)
    case 'recharges':
      return 'bg-purple-500' // hsl(271, 91%, 65%)
    case 'fuel':
      return 'bg-red-500' // hsl(0, 84%, 60%)
    case 'electricity':
      return 'bg-orange-500' // hsl(32, 98%, 56%)
    case 'chocolates':
      return 'bg-pink-500' // hsl(330, 81%, 60%)
    default:
      return 'bg-gray-500' // hsl(220, 9%, 46%) for "Other"
  }
}

export function RecentTransactions({ transactions }: RecentTransactionsProps) {

    if(!transactions) return;
  // Sort transactions by date (most recent first)
  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(b.fullTimestamp).getTime() - new Date(a.fullTimestamp).getTime()
  )

  return (
    <div className="space-y-4">
      {sortedTransactions.length > 0 ? (
        sortedTransactions.map((transaction, index) => {
          const Icon = getCategoryIcon(transaction.category)
          return (
            <div key={index} className="flex items-center justify-between border-b pb-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-md ${getCategoryColor(transaction.category)}`}>
                  <Icon className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="font-medium">{transaction.to}</p>
                  <p className="text-xs text-muted-foreground">{transaction.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">{transaction.category}</Badge>
                <span className="font-medium">
                  ₹{parseFloat(transaction.moneyPaid || '0').toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>
          )
        })
      ) : (
        <p className="text-center text-muted-foreground">No transactions available</p>
      )}
      <Button variant="outline" size="sm" className="w-full" asChild>
        <a href="/transactions">View All Transactions</a>
      </Button>
    </div>
  )
}