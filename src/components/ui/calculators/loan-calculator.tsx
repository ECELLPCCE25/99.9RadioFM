"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Calendar } from "lucide-react"
import { Percent } from "lucide-react"

export default function LoanCalculator() {
  const [loanAmount, setLoanAmount] = useState(200000)
  const [interestRate, setInterestRate] = useState(5)
  const [loanTerm, setLoanTerm] = useState(30)
  const [monthlyPayment, setMonthlyPayment] = useState(0)
  const [totalPayment, setTotalPayment] = useState(0)
  const [totalInterest, setTotalInterest] = useState(0)

  useEffect(() => {
    calculateLoan()
  }, [loanAmount, interestRate, loanTerm])

  const calculateLoan = () => {
    // Convert annual interest rate to monthly and decimal
    const monthlyInterestRate = interestRate / 100 / 12
    // Convert years to months
    const numberOfPayments = loanTerm * 12

    // Calculate monthly payment using the formula: P = L[i(1+i)^n]/[(1+i)^n-1]
    // Where P = monthly payment, L = loan amount, i = monthly interest rate, n = number of payments
    if (monthlyInterestRate === 0) {
      // If interest rate is 0, simply divide loan by term
      const monthly = loanAmount / numberOfPayments
      setMonthlyPayment(monthly)
      setTotalPayment(monthly * numberOfPayments)
      setTotalInterest(0)
    } else {
      const x = Math.pow(1 + monthlyInterestRate, numberOfPayments)
      const monthly = (loanAmount * x * monthlyInterestRate) / (x - 1)

      setMonthlyPayment(monthly)
      setTotalPayment(monthly * numberOfPayments)
      setTotalInterest(monthly * numberOfPayments - loanAmount)
    }
  }

  const handleLoanAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseFloat(e.target.value.replace(/,/g, ""))
    if (!isNaN(value)) {
      setLoanAmount(value)
    } else {
      setLoanAmount(0)
    }
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  return (
    <Card className="border-0 shadow-none">
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="loanAmount">Loan Amount</Label>
            <div className="relative">
              <span className="absolute left-2 top-2.5 text-muted-foreground text-sm">₹</span>
              <Input
                id="loanAmount"
                type="text"
                className="pl-8"
                value={loanAmount.toLocaleString()}
                onChange={handleLoanAmountChange}
              />
            </div>
          </div>
          <Slider
            value={[loanAmount]}
            min={1000}
            max={1000000}
            step={1000}
            onValueChange={(value) => setLoanAmount(value[0])}
            className="py-4"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>₹1,000</span>
            <span>₹1,000,000</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="interestRate">Interest Rate (%)</Label>
            <div className="relative">
              <Percent className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="interestRate"
                type="number"
                className="pl-8 w-32"
                value={interestRate}
                onChange={(e) => setInterestRate(Number.parseFloat(e.target.value) || 0)}
                step={0.1}
                min={0}
                max={30}
              />
            </div>
          </div>
          <Slider
            value={[interestRate]}
            min={0}
            max={30}
            step={0.1}
            onValueChange={(value) => setInterestRate(value[0])}
            className="py-4"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>0%</span>
            <span>30%</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="loanTerm">Loan Term (years)</Label>
            <div className="relative">
              <Calendar className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="loanTerm"
                type="number"
                className="pl-8 w-32"
                value={loanTerm}
                onChange={(e) => setLoanTerm(Number.parseInt(e.target.value) || 0)}
                min={1}
                max={50}
              />
            </div>
          </div>
          <Slider
            value={[loanTerm]}
            min={1}
            max={50}
            step={1}
            onValueChange={(value) => setLoanTerm(value[0])}
            className="py-4"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>1 year</span>
            <span>50 years</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
          <Card className="bg-muted/50">
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Payment</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <p className="text-2xl font-bold">{formatCurrency(monthlyPayment)}</p>
            </CardContent>
          </Card>
          <Card className="bg-muted/50">
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-sm font-medium">Total Payment</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <p className="text-2xl font-bold">{formatCurrency(totalPayment)}</p>
            </CardContent>
          </Card>
          <Card className="bg-muted/50">
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-sm font-medium">Total Interest</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <p className="text-2xl font-bold">{formatCurrency(totalInterest)}</p>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  )
}
