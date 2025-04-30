"use client"

import { useState } from "react"
import { Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Financial terms glossary
const glossaryTerms = [
  {
    term: "Annual Percentage Rate (APR)",
    definition:
      "The yearly interest rate charged on borrowed money, including fees and costs paid to acquire the loan.",
    category: "credit",
  },
  {
    term: "Asset",
    definition: "Anything of value that you own, such as cash, investments, property, or possessions.",
    category: "general",
  },
  {
    term: "Budget",
    definition: "A plan for how you will spend your money, typically organized by categories and time periods.",
    category: "budgeting",
  },
  {
    term: "Capital Gain",
    definition: "The profit from selling an asset for more than you paid for it.",
    category: "investing",
  },
  {
    term: "Compound Interest",
    definition: "Interest calculated on both the initial principal and the accumulated interest over time.",
    category: "investing",
  },
  {
    term: "Credit Score",
    definition: "A numerical expression of your creditworthiness based on your credit history.",
    category: "credit",
  },
  {
    term: "Debt-to-Income Ratio",
    definition: "Your total monthly debt payments divided by your gross monthly income, expressed as a percentage.",
    category: "credit",
  },
  {
    term: "Diversification",
    definition: "Spreading investments across various assets to reduce risk.",
    category: "investing",
  },
  {
    term: "Emergency Fund",
    definition: "Money set aside for unexpected expenses or financial emergencies.",
    category: "budgeting",
  },
  {
    term: "Fixed Expense",
    definition: "A cost that remains the same each month, such as rent or mortgage payments.",
    category: "budgeting",
  },
  {
    term: "Inflation",
    definition:
      "The rate at which the general level of prices for goods and services rises, causing purchasing power to fall.",
    category: "general",
  },
  {
    term: "Liability",
    definition: "Something you owe, such as debt, loans, or financial obligations.",
    category: "general",
  },
  {
    term: "Liquidity",
    definition: "How quickly an asset can be converted to cash without affecting its price.",
    category: "investing",
  },
  {
    term: "Net Worth",
    definition: "The total value of your assets minus your liabilities.",
    category: "general",
  },
  {
    term: "Principal",
    definition: "The original amount of money borrowed or invested, before interest.",
    category: "credit",
  },
  {
    term: "Risk Tolerance",
    definition: "The degree of variability in investment returns that an investor is willing to withstand.",
    category: "investing",
  },
  {
    term: "Sinking Fund",
    definition: "Money set aside regularly for a specific future expense.",
    category: "budgeting",
  },
  {
    term: "Variable Expense",
    definition: "A cost that changes from month to month, such as groceries or entertainment.",
    category: "budgeting",
  },
]

export default function FinancialGlossary() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")

  // Filter terms based on search and category
  const filteredTerms = glossaryTerms.filter((term) => {
    const matchesSearch =
      term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      term.definition.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = activeCategory === "all" || term.category === activeCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="w-full mx-auto pb-12">
      {/* <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Financial Glossary</h1>
        <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
          Understanding financial terminology is key to making informed decisions. Browse our comprehensive glossary of
          financial terms.
        </p>
      </div> */}

      <div className=" mx-auto mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search for terms..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory} className="l mx-auto">
        <TabsList className="grid grid-cols-5 mb-8">
          <TabsTrigger value="all">All Terms</TabsTrigger>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="budgeting">Budgeting</TabsTrigger>
          <TabsTrigger value="investing">Investing</TabsTrigger>
          <TabsTrigger value="credit">Credit</TabsTrigger>
        </TabsList>

        <TabsContent value={activeCategory} className="mt-0">
          {filteredTerms.length > 0 ? (
            <div className="grid gap-4">
              {filteredTerms.map((item, index) => (
                <Card key={index}>
                  <CardHeader className="pb-2">
                    <CardTitle>{item.term}</CardTitle>
                    <CardDescription>{item.category.charAt(0).toUpperCase() + item.category.slice(1)}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>{item.definition}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No terms found matching your search criteria.</p>
              <Button variant="outline" className="mt-4" onClick={() => setSearchTerm("")}>
                Clear Search
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
