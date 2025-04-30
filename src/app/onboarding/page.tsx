"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { CheckCircle2, ChevronRight, CircleDollarSign, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { useUser } from "@clerk/nextjs"

export default function OnboardingPage() {
const { user } = useUser()
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: user?.fullName||"",
    age: "",
    occupation: "",
    income: "",
    financialGoal: "invest",
    riskTolerance: "moderate",
  })
  if (!user) return <div>Loading...</div>

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1)
    } else {
      // Submit data and redirect to dashboard
      router.push("/dashboard")
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  return (
    <div className="flex h-screen items-center justify-center bg-background flex-col">
        <h1 className="text-5xl font-semibold">Tell Us About yourself</h1>
    <div className="container max-w-5xl py-12">
      <div className="mb-8 flex justify-center">
        <div className="flex items-center justify-center">
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-full ${
              step >= 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            }`}
          >
            <User className="h-5 w-10 aspect-square" />
          </div>
          <Separator className={`w-12 ${step >= 2 ? "bg-primary" : "bg-muted"}`} />
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-full ${
              step >= 2 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            }`}
          >
            <CircleDollarSign className="h-5 w-10" />
          </div>
          <Separator className={`w-12 ${step >= 3 ? "bg-primary" : "bg-muted"}`} />
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-full ${
              step >= 3 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            }`}
          >
            <CheckCircle2 className="h-5 w-10" />
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            {step === 1 && "Personal Information"}
            {step === 2 && "Financial Profile"}
            {step === 3 && "Preferences & Goals"}
          </CardTitle>
          <CardDescription>
            {step === 1 && "Tell us a bit about yourself to personalize your experience"}
            {step === 2 && "Help us understand your financial situation"}
            {step === 3 && "Set your financial goals and preferences"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {step === 1 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder={user?.fullName||"Enter your full name"}
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  name="age"
                  type="number"
                  placeholder="Enter your age"
                  value={formData.age}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="occupation">Occupation</Label>
                <Input
                  id="occupation"
                  name="occupation"
                  placeholder="Enter your occupation"
                  value={formData.occupation}
                  onChange={handleChange}
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="income">Monthly Income (₹)</Label>
                <Input
                  id="income"
                  name="income"
                  type="number"
                  placeholder="Enter your monthly income"
                  value={formData.income}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label>Risk Tolerance</Label>
                <RadioGroup
                  value={formData.riskTolerance}
                  onValueChange={(value) => handleSelectChange("riskTolerance", value)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="conservative" id="conservative" />
                    <Label htmlFor="conservative">Conservative</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="moderate" id="moderate" />
                    <Label htmlFor="moderate">Moderate</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="aggressive" id="aggressive" />
                    <Label htmlFor="aggressive">Aggressive</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="financialGoal">Primary Financial Goal</Label>
                <Select
                  value={formData.financialGoal}
                  onValueChange={(value) => handleSelectChange("financialGoal", value)}
                >
                  <SelectTrigger id="financialGoal">
                    <SelectValue placeholder="Select your primary financial goal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="debt">Pay off debt</SelectItem>
                    <SelectItem value="invest">Start investing</SelectItem>
                    <SelectItem value="home">Buy a home</SelectItem>
                    <SelectItem value="education">Education expenses</SelectItem>
                    <SelectItem value="retirement">Plan for retirement</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="rounded-lg border p-4">
                <h3 className="mb-2 font-medium">Based on your profile, we recommend:</h3>
                <ul className="ml-6 list-disc space-y-1 text-sm">
                  <li>
                    Building an emergency fund of ₹{Number.parseInt(formData.income || "0") * 6} (6 months of expenses)
                  </li>
                  <li>Starting with our &quot;Budgeting Basics&quot; learning module</li>
                  <li>Setting up automatic savings of 20% of your income</li>
                </ul>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handleBack} disabled={step === 1}>
            Back
          </Button>
          <Button onClick={handleNext}>
            {step < 3 ? (
              <>
                Next <ChevronRight className="ml-2 h-4 w-4" />
              </>
            ) : (
              "Complete Setup"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
    </div>
  )
}
