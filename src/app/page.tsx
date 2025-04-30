"use client"
import Link from "next/link"
import {
  ArrowRight,
  BarChart2,
  BookOpen,
  Building,
  Calculator,
  GraduationCap,
  Lock,
  PieChart,
  Target,
  Wallet,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useUser } from "@clerk/nextjs"
import { useEffect } from "react"
import { useMutation } from "convex/react"
import { api } from "../../convex/_generated/api"
import { UserButton } from '@clerk/nextjs'

export default function LandingPage() {
  const { user } = useUser()
  const createOrUpdateUser = useMutation(api.user.createOrUpdateUser)
  useEffect(() => {
    if (user) {
      createOrUpdateUser({
        clerkId: user.id,
        name: `${user.firstName || ""} ${user.lastName || ""}`.trim() || "User",
        email: user.emailAddresses[0]?.emailAddress || "",
      })
    }
  }, [user, createOrUpdateUser])

  if(!user) return <div>Loading...</div>
  return (
    <div className="flex min-h-screen flex-col px-5">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Wallet className="h-6 w-6" />
            <span className="text-xl font-bold">FinEdify</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Features
            </Link>
            <Link href="#education" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Financial Education
            </Link>
            <Link href="#testimonials" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Testimonials
            </Link>
            <Link href="#faq" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              FAQ
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <UserButton/>{user.fullName}
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full  bg-gradient-to-b from-background to-muted pb-10">
          <div className="container px-4 md:px-6 py-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                    Visualize Your Finances Like Never Before
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Transform your spending data into an interactive city map. Make smarter financial decisions with our
                    innovative dashboard.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                    <Link href={'/onboarding'}>
                  <Button size="lg" className="gap-1">
                    
                    Get Started <ArrowRight className="h-4 w-4" />
                  </Button>
                    </Link>
                    <Link href={'/learn'}>
                    
                  <Button size="lg" variant="outline">
                    Learn About Finance
                  </Button>
                    </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative h-[350px] w-full overflow-hidden rounded-xl border bg-background shadow-xl">
                  <div className="absolute inset-0 bg-gradient-to-b from-sky-300 to-sky-100">
                    {/* Simplified city visualization */}
                    <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-green-600 to-green-500"></div>
                    <div className="absolute top-1/3 left-0 right-0 h-4 bg-gray-700"></div>
                    <div className="absolute top-1/4 bottom-0 left-1/3 w-4 bg-gray-700"></div>

                    {/* Sample buildings */}
                    <div className="absolute top-[30%] left-[20%] w-[60px] h-[90px] bg-blue-500 rounded-t-lg"></div>
                    <div className="absolute top-[45%] left-[40%] w-[50px] h-[60px] bg-green-500 rounded-t-lg"></div>
                    <div className="absolute top-[25%] left-[60%] w-[70px] h-[80px] bg-yellow-500 rounded-t-lg"></div>
                    <div className="absolute top-[60%] left-[70%] w-[40px] h-[50px] bg-purple-500 rounded-t-lg"></div>
                    <div className="absolute top-[50%] left-[80%] w-[45px] h-[65px] bg-red-500 rounded-t-lg"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full ">
          <div className="container px-4 md:px-6 py-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Features</div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Visualize Your Financial Journey</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our innovative dashboard transforms complex financial data into an intuitive city map, making it
                  easier to understand and manage your finances.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <Building className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Interactive City Map</CardTitle>
                  <CardDescription>
                    Visualize your spending categories as buildings in a city, with size proportional to spending
                    amount.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  Click on any building to see detailed spending information for that category, including trends and
                  transactions.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <PieChart className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Comprehensive Analytics</CardTitle>
                  <CardDescription>
                    Get detailed insights into your spending patterns with interactive charts and graphs.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  Track your spending by category, time period, and merchant to identify trends and opportunities for
                  savings.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Target className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Goal Setting</CardTitle>
                  <CardDescription>
                    Set financial goals and track your progress with visual indicators and notifications.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  Whether saving for a vacation or paying down debt, our goal tracking keeps you motivated and on track.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <BarChart2 className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Budget Management</CardTitle>
                  <CardDescription>
                    Create and manage budgets for different spending categories with real-time tracking.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  Receive alerts when you{`'`}re approaching budget limits and suggestions for adjusting your spending.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <BookOpen className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Financial Education</CardTitle>
                  <CardDescription>
                    Access a library of resources to improve your financial literacy and decision-making.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  From basic concepts to advanced strategies, our educational content helps you build financial
                  confidence.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Lock className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Secure & Private</CardTitle>
                  <CardDescription>
                    Your financial data is encrypted and protected with industry-leading security measures.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  We never sell your data and give you complete control over your information and privacy settings.
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Financial Education Section */}
        <section id="education" className="w-full">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Financial Literacy</div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Empower Your Financial Journey</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Access educational resources designed to improve your financial knowledge and decision-making skills.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Financial Literacy Modules</CardTitle>
                  <CardDescription>
                    Structured learning paths to build your financial knowledge from basics to advanced concepts.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="h-5 w-5 text-primary" />
                      <h3 className="font-medium">Budgeting Fundamentals</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Learn how to create and maintain a budget that works for your lifestyle and goals.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="h-5 w-5 text-primary" />
                      <h3 className="font-medium">Debt Management</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Strategies for managing and reducing debt while building a strong financial foundation.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="h-5 w-5 text-primary" />
                      <h3 className="font-medium">Investment Basics</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Introduction to investment concepts, asset classes, and building a diversified portfolio.
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Explore Learning Modules</Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Financial Tools & Calculators</CardTitle>
                  <CardDescription>
                    Interactive tools to help you plan and make informed financial decisions.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Calculator className="h-5 w-5 text-primary" />
                      <h3 className="font-medium">Savings Goal Calculator</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Calculate how much you need to save regularly to reach your financial goals.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Calculator className="h-5 w-5 text-primary" />
                      <h3 className="font-medium">Debt Repayment Planner</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Create a personalized plan to pay off your debts using different strategies.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Calculator className="h-5 w-5 text-primary" />
                      <h3 className="font-medium">Retirement Calculator</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Estimate how much you need to save for a comfortable retirement based on your goals.
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Access Financial Tools</Button>
                </CardFooter>
              </Card>
            </div>

            {/* Financial Glossary */}
            <div className="mx-auto max-w-5xl py-12">
              <div className="rounded-xl border bg-card p-6 shadow-sm">
                <h3 className="text-2xl font-bold mb-4">Financial Glossary</h3>
                <p className="text-muted-foreground mb-6">
                  Understanding financial terminology is key to making informed decisions. Here are some common terms
                  you should know:
                </p>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <h4 className="font-semibold">Budget</h4>
                    <p className="text-sm text-muted-foreground">
                      A plan for your income and expenses over a specific period, typically monthly.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold">Emergency Fund</h4>
                    <p className="text-sm text-muted-foreground">
                      Money set aside for unexpected expenses or financial emergencies.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold">Compound Interest</h4>
                    <p className="text-sm text-muted-foreground">
                      Interest calculated on both the initial principal and the accumulated interest over time.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold">Credit Score</h4>
                    <p className="text-sm text-muted-foreground">
                      A numerical expression of your creditworthiness based on your credit history.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold">Diversification</h4>
                    <p className="text-sm text-muted-foreground">
                      Spreading investments across various assets to reduce risk.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold">Net Worth</h4>
                    <p className="text-sm text-muted-foreground">
                      The total value of your assets minus your liabilities.
                    </p>
                  </div>
                </div>
                <Button variant="outline" className="mt-6">
                  View Full Glossary
                </Button>
              </div>
            </div>

            {/* Financial Tips */}
            <div className="mx-auto max-w-5xl mb-5">
              <div className="rounded-xl border bg-card p-6 shadow-sm py-6">
                <h3 className="text-2xl font-bold mb-4">Financial Tips & Tricks</h3>
                <div className="grid gap-6 md:grid-cols-3">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">The 50/30/20 Rule</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Allocate 50% of your income to needs, 30% to wants, and 20% to savings and debt repayment for a
                        balanced budget.
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Pay Yourself First</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Set aside a portion of your income for savings before paying bills or making discretionary
                        purchases.
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Track Every Expense</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Awareness is the first step to improvement. Track all expenses to identify patterns and
                        opportunities for saving.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="w-full  bg-muted ">
          <div className="container px-4 md:px-6 py-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-background px-3 py-1 text-sm">Testimonials</div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">What Our Users Say</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Hear from people who have transformed their financial lives with our dashboard.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-muted"></div>
                    <div>
                      <CardTitle className="text-base">Priya Sharma</CardTitle>
                      <CardDescription>Marketing Professional</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                 {` "The city visualization made it so much easier to understand where my money was going. I've cut my
                  dining out expenses by 30% since I started using this dashboard!"`}
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-muted"></div>
                    <div>
                      <CardTitle className="text-base">Rahul Patel</CardTitle>
                      <CardDescription>Software Engineer</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                 {` "As someone who loves data, I appreciate how this dashboard presents complex financial information in
                  such an intuitive way. It's helped me save for my first home."`}
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-muted"></div>
                    <div>
                      <CardTitle className="text-base">Ananya Gupta</CardTitle>
                      <CardDescription>College Student</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                {`  "The financial education resources have been invaluable. I'm learning to manage my student loans and
                  build good financial habits early in life."`}
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="w-full ">
          <div className="container px-4 md:px-6 py-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">FAQ</div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Frequently Asked Questions</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Find answers to common questions about our financial dashboard and services.
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-3xl space-y-4 py-12">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Is my financial data secure?</AccordionTrigger>
                  <AccordionContent>
                    Yes, your data is fully encrypted and protected with bank-level security measures. We use
                    industry-standard encryption protocols and never share your personal information with third parties
                    without your explicit consent.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>How do I connect my bank accounts?</AccordionTrigger>
                  <AccordionContent>
                   {` Our platform uses secure API connections to link with your financial institutions. After signing up,
                    you'll be guided through a simple process to connect your accounts. We support most major banks and
                    financial services in India.`}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>Can I use the dashboard without connecting my bank?</AccordionTrigger>
                  <AccordionContent>
                    You can manually enter transactions or upload statements in various formats. While connecting your
                    accounts provides real-time updates, manual tracking is a great option for those who prefer not to
                    link their accounts.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>Is there a mobile app available?</AccordionTrigger>
                  <AccordionContent>
                    Yes, we offer mobile apps for both iOS and Android devices. The mobile experience includes all the
                    core features of the web dashboard, allowing you to track your finances on the go.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                  <AccordionTrigger>How much does it cost to use the platform?</AccordionTrigger>
                  <AccordionContent>
                    We offer a free basic plan with core tracking features. Premium plans start at ₹299/month and
                    include advanced analytics, financial planning tools, and personalized recommendations. We also
                    offer special discounts for students and seniors.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full  bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6 py-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Ready to Transform Your Finances?</h2>
                <p className="max-w-[600px] text-primary-foreground/80 md:text-xl/relaxed">
                  Join thousands of users who are taking control of their financial future with our innovative
                  dashboard.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button size="lg" variant="secondary" className="gap-1">
                  Get Started for Free
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent text-primary-foreground border-primary-foreground/20 hover:bg-primary-foreground/10"
                >
                  Schedule a Demo
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t bg-background py-6 md:py-12">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Wallet className="h-6 w-6" />
                <span className="text-xl font-bold">FinEdify</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Transforming financial data into intuitive visualizations to help you make better decisions.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-base font-medium">Product</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Integrations
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Updates
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-base font-medium">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Financial Education
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Guides
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Support
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-base font-medium">Company</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
            <p>© 2025 FinEdify. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
