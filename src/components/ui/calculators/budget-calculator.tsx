"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Plus, Trash2 } from "lucide-react"
import { Progress } from "@/components/ui/progress"

type ExpenseItem = {
  id: string
  name: string
  amount: number
  category: string
}

export default function BudgetCalculator() {
  const [monthlyIncome, setMonthlyIncome] = useState(5000)
  const [expenses, setExpenses] = useState<ExpenseItem[]>([
    { id: "1", name: "Rent/Mortgage", amount: 1500, category: "Housing" },
    { id: "2", name: "Utilities", amount: 300, category: "Housing" },
    { id: "3", name: "Groceries", amount: 500, category: "Food" },
    { id: "4", name: "Transportation", amount: 400, category: "Transportation" },
  ])
  const [newExpenseName, setNewExpenseName] = useState("")
  const [newExpenseAmount, setNewExpenseAmount] = useState("")
  const [newExpenseCategory, setNewExpenseCategory] = useState("Other")
  const [totalExpenses, setTotalExpenses] = useState(0)
  const [remainingBudget, setRemainingBudget] = useState(0)
  const [budgetPercentage, setBudgetPercentage] = useState(0)

  useEffect(() => {
    calculateBudget()
  }, [monthlyIncome, expenses])

  const calculateBudget = () => {
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0)
    const remaining = monthlyIncome - total
    const percentage = monthlyIncome > 0 ? (total / monthlyIncome) * 100 : 0

    setTotalExpenses(total)
    setRemainingBudget(remaining)
    setBudgetPercentage(percentage)
  }

  const handleMonthlyIncomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseFloat(e.target.value.replace(/,/g, ""))
    if (!isNaN(value)) {
      setMonthlyIncome(value)
    } else {
      setMonthlyIncome(0)
    }
  }

  const handleNewExpenseAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewExpenseAmount(e.target.value)
  }

  const addExpense = () => {
    if (newExpenseName.trim() === "" || newExpenseAmount === "") {
      return
    }

    const amount = Number.parseFloat(newExpenseAmount.replace(/,/g, ""))
    if (isNaN(amount)) {
      return
    }

    const newExpense: ExpenseItem = {
      id: Date.now().toString(),
      name: newExpenseName,
      amount: amount,
      category: newExpenseCategory,
    }

    setExpenses([...expenses, newExpense])
    setNewExpenseName("")
    setNewExpenseAmount("")
    setNewExpenseCategory("Other")
  }

  const removeExpense = (id: string) => {
    setExpenses(expenses.filter((expense) => expense.id !== id))
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  // Group expenses by category
  const expensesByCategory: Record<string, number> = {}
  expenses.forEach((expense) => {
    if (!expensesByCategory[expense.category]) {
      expensesByCategory[expense.category] = 0
    }
    expensesByCategory[expense.category] += expense.amount
  })

  // Calculate category percentages
  const categoryPercentages = Object.entries(expensesByCategory).map(([category, amount]) => ({
    category,
    amount,
    percentage: totalExpenses > 0 ? (amount / totalExpenses) * 100 : 0,
  }))

  // Sort categories by amount (descending)
  categoryPercentages.sort((a, b) => b.amount - a.amount)

  return (
    <Card className="border-0 shadow-none">
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="monthlyIncome">Monthly Income</Label>
          <div className="relative">
            <span className="absolute left-2 top-2.5 text-muted-foreground text-sm">₹</span>
            <Input
              id="monthlyIncome"
              type="text"
              className="pl-8"
              value={monthlyIncome.toLocaleString()}
              onChange={handleMonthlyIncomeChange}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-muted/50">
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <p className="text-2xl font-bold">{formatCurrency(totalExpenses)}</p>
            </CardContent>
          </Card>
          <Card className={`${remainingBudget >= 0 ? "bg-muted/50" : "bg-destructive/10"}`}>
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-sm font-medium">Remaining Budget</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <p className={`text-2xl font-bold ${remainingBudget < 0 ? "text-destructive" : ""}`}>
                {formatCurrency(remainingBudget)}
              </p>
            </CardContent>
          </Card>
          <Card className="bg-muted/50">
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-sm font-medium">Budget Used</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <Progress value={budgetPercentage > 100 ? 100 : budgetPercentage} className="h-2" />
              <p className="text-sm mt-2">{budgetPercentage.toFixed(1)}%</p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Label htmlFor="newExpenseName">Expense Name</Label>
              <Input
                id="newExpenseName"
                value={newExpenseName}
                onChange={(e) => setNewExpenseName(e.target.value)}
                placeholder="e.g., Rent, Groceries"
              />
            </div>
            <div className="w-full md:w-1/4">
              <Label htmlFor="newExpenseAmount">Amount</Label>
              <div className="relative">
                <span className="absolute left-2 top-2.5 text-muted-foreground text-sm">₹</span>
                <Input
                  id="newExpenseAmount"
                  value={newExpenseAmount}
                  onChange={handleNewExpenseAmountChange}
                  placeholder="0"
                  className="pl-8"
                />
              </div>
            </div>
            <div className="w-full md:w-1/4">
              <Label htmlFor="newExpenseCategory">Category</Label>
              <select
                id="newExpenseCategory"
                value={newExpenseCategory}
                onChange={(e) => setNewExpenseCategory(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="Housing">Housing</option>
                <option value="Food">Food</option>
                <option value="Transportation">Transportation</option>
                <option value="Utilities">Utilities</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Debt">Debt</option>
                <option value="Savings">Savings</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="flex items-end">
              <Button onClick={addExpense} className="w-full md:w-auto">
                <Plus className="h-4 w-4 mr-2" />
                Add
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Expense Breakdown</h3>

            <div className="space-y-4">
              {categoryPercentages.map(({ category, amount, percentage }) => (
                <div key={category} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>{category}</span>
                    <span>
                      {formatCurrency(amount)} ({percentage.toFixed(1)}%)
                    </span>
                  </div>
                  <Progress value={percentage} className="h-2" />
                </div>
              ))}
            </div>

            <div className="border rounded-md">
              <div className="grid grid-cols-[1fr_auto_auto] gap-4 p-4 font-medium border-b">
                <div>Expense</div>
                <div>Amount</div>
                <div></div>
              </div>
              <div className="divide-y">
                {expenses.map((expense) => (
                  <div key={expense.id} className="grid grid-cols-[1fr_auto_auto] gap-4 p-4 items-center">
                    <div>
                      <div>{expense.name}</div>
                      <div className="text-xs text-muted-foreground">{expense.category}</div>
                    </div>
                    <div>{formatCurrency(expense.amount)}</div>
                    <Button variant="ghost" size="icon" onClick={() => removeExpense(expense.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
