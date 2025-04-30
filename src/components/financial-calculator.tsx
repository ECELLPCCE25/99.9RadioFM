"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import LoanCalculator from "./ui/calculators/loan-calculator"
import InvestmentCalculator from "./ui/calculators/investment-calculator"
import RetirementCalculator from "./ui/calculators/retirement-calculator"
import BudgetCalculator from "./ui/calculators/budget-calculator"
import GoalsAndDebts from "./ui/calculators/goals-and-debts"
import Link from "next/link"
import { Button } from "./ui/button"
import { ArrowLeft } from "lucide-react"

export default function FinancialCalculator() {
  const [activeTab, setActiveTab] = useState<keyof typeof calculators>("loan")
  
  const calculators = {
    loan: <LoanCalculator />,
    investment: <InvestmentCalculator />,
    retirement: <RetirementCalculator />,
    budget: <BudgetCalculator />,
    goalsdebts: <GoalsAndDebts />,
  }
  
  const tabLabels = {
    loan: "Loan Calculator",
    investment: "Investment Calculator",
    retirement: "Retirement Calculator",
    budget: "Budget Calculator",
    goalsdebts: "Goals and Debts",
  }

  return (
    <div className="flex flex-col md:flex-row w-full mx-auto min-h-screen">


      {/* Sidebar */}
      <div className="w-full md:w-64 bg-gray-100 dark:bg-gray-800 p-4">
      <Link href={'/dashboard'}>
        <Button>
         <ArrowLeft/> Back
        </Button>
      </Link>

        <h2 className="text-xl font-bold mb-6 px-2 pt-5">Financial Tools</h2>
        <div className="flex flex-col space-y-2">
          {Object.keys(calculators).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as keyof typeof calculators)}
              className={`px-4 py-3 text-left rounded-lg transition-colors ${
                activeTab === tab
                  ? "bg-primary text-primary-foreground font-medium"
                  : "hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              {tabLabels[tab as keyof typeof tabLabels]}
            </button>
          ))}
        </div>
      </div>
      
      {/* Content */}
      <div className="flex-1 p-4">
        <Card className="w-full h-full p-6">
          <h2 className="text-2xl font-bold mb-0">{tabLabels[activeTab]}</h2>
          {calculators[activeTab]}
        </Card>
      </div>
    </div>
  )
}