"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent,  CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Percent } from "lucide-react"

export default function RetirementCalculator() {
  const [currentAge, setCurrentAge] = useState(30)
  const [retirementAge, setRetirementAge] = useState(65)
  const [currentSavings, setCurrentSavings] = useState(50000)
  const [monthlyContribution, setMonthlyContribution] = useState(1000)
  const [annualReturn, setAnnualReturn] = useState(7)
  const [inflationRate, setInflationRate] = useState(2.5)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [retirementNeeds, setRetirementNeeds] = useState(0)
  const [projectedSavings, setProjectedSavings] = useState(0)
  const [monthlyRetirementIncome, setMonthlyRetirementIncome] = useState(0)

  useEffect(() => {
    calculateRetirement()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentAge, retirementAge, currentSavings, monthlyContribution, annualReturn, inflationRate])

  const calculateRetirement = () => {
    // Years until retirement
    const yearsToRetirement = retirementAge - currentAge

    if (yearsToRetirement <= 0) {
      setProjectedSavings(currentSavings)
      setRetirementNeeds(0)
      setMonthlyRetirementIncome(0)
      return
    }

    // Calculate future value of current savings
    const monthlyRate = annualReturn / 100 / 12
    const totalMonths = yearsToRetirement * 12

    // Future value of current savings
    const futureValueOfCurrentSavings = currentSavings * Math.pow(1 + monthlyRate, totalMonths)

    // Future value of monthly contributions
    let futureValueOfContributions = 0
    if (monthlyRate > 0) {
      futureValueOfContributions = monthlyContribution * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate)
    } else {
      futureValueOfContributions = monthlyContribution * totalMonths
    }

    // Total projected savings at retirement
    const totalProjectedSavings = futureValueOfCurrentSavings + futureValueOfContributions

    // Estimate retirement needs (using the 4% rule)
    // The 4% rule suggests you can withdraw 4% of your retirement savings annually
    const annualRetirementIncome = totalProjectedSavings * 0.04
    const monthlyIncome = annualRetirementIncome / 12

    // Adjust for inflation
    const inflationAdjustmentFactor = Math.pow(1 + inflationRate / 100, yearsToRetirement)
    const inflationAdjustedMonthlyIncome = monthlyIncome / inflationAdjustmentFactor

    setProjectedSavings(totalProjectedSavings)
    setMonthlyRetirementIncome(inflationAdjustedMonthlyIncome)

    // Estimate total retirement needs (25x annual expenses - 4% rule in reverse)
    const annualExpenses = inflationAdjustedMonthlyIncome * 12
    const estimatedRetirementNeeds = annualExpenses * 25

    setRetirementNeeds(estimatedRetirementNeeds)
  }

  const handleCurrentSavingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseFloat(e.target.value.replace(/,/g, ""))
    if (!isNaN(value)) {
      setCurrentSavings(value)
    } else {
      setCurrentSavings(0)
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="currentAge">Current Age</Label>
              <Input
                id="currentAge"
                type="number"
                className="w-24"
                value={currentAge}
                onChange={(e) => setCurrentAge(Number.parseInt(e.target.value) || 0)}
                min={18}
                max={100}
              />
            </div>
            <Slider
              value={[currentAge]}
              min={18}
              max={100}
              step={1}
              onValueChange={(value) => setCurrentAge(value[0])}
              className="py-4"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>18</span>
              <span>100</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="retirementAge">Retirement Age</Label>
              <Input
                id="retirementAge"
                type="number"
                className="w-24"
                value={retirementAge}
                onChange={(e) => setRetirementAge(Number.parseInt(e.target.value) || 0)}
                min={currentAge + 1}
                max={100}
              />
            </div>
            <Slider
              value={[retirementAge]}
              min={Math.max(currentAge + 1, 50)}
              max={100}
              step={1}
              onValueChange={(value) => setRetirementAge(value[0])}
              className="py-4"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{Math.max(currentAge + 1, 50)}</span>
              <span>100</span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="currentSavings">Current Retirement Savings</Label>
            <div className="relative">
              <span className="absolute left-2 top-2.5 text-muted-foreground text-sm">₹</span>
              <Input
                id="currentSavings"
                type="text"
                className="pl-8"
                value={currentSavings.toLocaleString()}
                onChange={handleCurrentSavingsChange}
              />
            </div>
          </div>
          <Slider
            value={[currentSavings]}
            min={0}
            max={1000000}
            step={5000}
            onValueChange={(value) => setCurrentSavings(value[0])}
            className="py-4"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>₹0</span>
            <span>₹1,00,00,000</span>
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="annualReturn">Expected Annual Return (%)</Label>
              <div className="relative">
                <Percent className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="annualReturn"
                  type="number"
                  className="pl-8 w-24"
                  value={annualReturn}
                  onChange={(e) => setAnnualReturn(Number.parseFloat(e.target.value) || 0)}
                  step={0.1}
                  min={0}
                  max={20}
                />
              </div>
            </div>
            <Slider
              value={[annualReturn]}
              min={0}
              max={20}
              step={0.1}
              onValueChange={(value) => setAnnualReturn(value[0])}
              className="py-4"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0%</span>
              <span>20%</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="inflationRate">Expected Inflation Rate (%)</Label>
              <div className="relative">
                <Percent className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="inflationRate"
                  type="number"
                  className="pl-8 w-24"
                  value={inflationRate}
                  onChange={(e) => setInflationRate(Number.parseFloat(e.target.value) || 0)}
                  step={0.1}
                  min={0}
                  max={10}
                />
              </div>
            </div>
            <Slider
              value={[inflationRate]}
              min={0}
              max={10}
              step={0.1}
              onValueChange={(value) => setInflationRate(value[0])}
              className="py-4"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0%</span>
              <span>10%</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
          <Card className="bg-muted/50">
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-sm font-medium">Projected Savings</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <p className="text-2xl font-bold">{formatCurrency(projectedSavings)}</p>
              <p className="text-xs text-muted-foreground">at age {retirementAge}</p>
            </CardContent>
          </Card>
          <Card className="bg-muted/50">
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Income</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <p className="text-2xl font-bold">{formatCurrency(monthlyRetirementIncome)}</p>
              <p className="text-xs text-muted-foreground">in today{`'`}s dollars</p>
            </CardContent>
          </Card>
          <Card className="bg-muted/50">
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-sm font-medium">Years to Retirement</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <p className="text-2xl font-bold">{retirementAge - currentAge}</p>
              <p className="text-xs text-muted-foreground">years</p>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  )
}
