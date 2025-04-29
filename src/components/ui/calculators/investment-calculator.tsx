"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent,  CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Percent } from "lucide-react"

export default function InvestmentCalculator() {
  const [initialInvestment, setInitialInvestment] = useState(10000)
  const [monthlyContribution, setMonthlyContribution] = useState(500)
  const [interestRate, setInterestRate] = useState(5)
  const [years, setYears] = useState(10)
  const [futureValue, setFutureValue] = useState(0)

  useEffect(() => {
    calculateInvestment()
  }, [initialInvestment, monthlyContribution, interestRate, years])

  const calculateInvestment = () => {
    const monthlyInterestRate = interestRate / 100 / 12
    const numberOfMonths = years * 12

    let fv = initialInvestment

    for (let i = 0; i < numberOfMonths; i++) {
      fv = fv * (1 + monthlyInterestRate) + monthlyContribution
    }

    setFutureValue(fv)
  }

  const handleInitialInvestmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseFloat(e.target.value.replace(/,/g, ""))
    if (!isNaN(value)) {
      setInitialInvestment(value)
    } else {
      setInitialInvestment(0)
    }
  }

  const handleMonthlyContributionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseFloat(e.target.value.replace(/,/g, ""))
    if (!isNaN(value)) {
      setMonthlyContribution(value)
    } else {
      setMonthlyContribution(0)
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
      <CardContent className="space-y-0">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="initialInvestment">Initial Investment</Label>
            <div className="relative">
              <span className="absolute left-2 top-2.5 text-muted-foreground text-sm">₹</span>
              <Input
                id="initialInvestment"
                type="text"
                className="pl-8"
                value={initialInvestment.toLocaleString()}
                onChange={handleInitialInvestmentChange}
              />
            </div>
          </div>
          <Slider
            value={[initialInvestment]}
            min={0}
            max={100000}
            step={1000}
            onValueChange={(value) => setInitialInvestment(value[0])}
            className="py-4"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>₹0</span>
            <span>₹1,00,000</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="monthlyContribution">Monthly Contribution</Label>
            <div className="relative">
              <span className="absolute left-2 top-2.5 text-muted-foreground text-sm">₹</span>
              <Input
                id="monthlyContribution"
                type="text"
                className="pl-8"
                value={monthlyContribution.toLocaleString()}
                onChange={handleMonthlyContributionChange}
              />
            </div>
          </div>
          <Slider
            value={[monthlyContribution]}
            min={0}
            max={5000}
            step={100}
            onValueChange={(value) => setMonthlyContribution(value[0])}
            className="py-4"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>₹0</span>
            <span>₹5,000</span>
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
            <Label htmlFor="years">Years</Label>
            <Input
              id="years"
              type="number"
              className="w-24"
              value={years}
              onChange={(e) => setYears(Number.parseInt(e.target.value) || 0)}
              min={1}
              max={50}
            />
          </div>
          <Slider
            value={[years]}
            min={1}
            max={50}
            step={1}
            onValueChange={(value) => setYears(value[0])}
            className="py-4"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>1 year</span>
            <span>50 years</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-1 gap-4 pt-4">
          <Card className="bg-muted/50">
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-sm font-medium">Future Value</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <p className="text-2xl font-bold">{formatCurrency(futureValue)}</p>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  )
}
