"use client"

import { ArrowLeft, DollarSign, LineChart, PiggyBank, Wallet } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function FinancialTips() {
  return (
    <div className="w-full flex justify-center items-center flex-col mx-auto py-12 relative">
      <Link href={'/dashboard'} className="absolute top-10 left-10">
        <Button>
          <ArrowLeft/>Back
        </Button>
      </Link>
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Financial Tips & Strategies</h1>
        <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
          Practical advice to help you manage your money more effectively and achieve your financial goals.
        </p>
      </div>

      <Tabs defaultValue="budgeting" className="max-w-4xl mx-auto justify-center items-center flex">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="budgeting">
            <Wallet className="mr-2 h-4 w-4" />
            Budgeting
          </TabsTrigger>
          <TabsTrigger value="saving">
            <PiggyBank className="mr-2 h-4 w-4" />
            Saving
          </TabsTrigger>
          <TabsTrigger value="investing">
            <LineChart className="mr-2 h-4 w-4" />
            Investing
          </TabsTrigger>
          <TabsTrigger value="debt">
            <DollarSign className="mr-2 h-4 w-4" />
            Debt Management
          </TabsTrigger>
        </TabsList>

        {/* Budgeting Tips */}
        <TabsContent value="budgeting">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>The 50/30/20 Rule</CardTitle>
                <CardDescription>A simple framework for budgeting your income</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Allocate your after-tax income according to the 50/30/20 rule:</p>
                <ul className="space-y-2 list-disc pl-5">
                  <li>50% for needs (housing, food, utilities, transportation)</li>
                  <li>30% for wants (entertainment, dining out, hobbies)</li>
                  <li>20% for savings and debt repayment</li>
                </ul>
                <p className="mt-4">
                  This balanced approach ensures you&#39;re covering essentials while still enjoying life and building
                  financial security.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Zero-Based Budgeting</CardTitle>
                <CardDescription>Give every rupee a purpose</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  In zero-based budgeting, you assign every rupee of your income to a specific category until you have
                  zero rupees left to budget:
                </p>
                <ul className="space-y-2 list-disc pl-5">
                  <li>Start with your income</li>
                  <li>List all your expenses, savings, and debt payments</li>
                  <li>Adjust categories until your income minus allocations equals zero</li>
                  <li>Track your spending to ensure you stay within your allocations</li>
                </ul>
                <p className="mt-4">
                  This method increases awareness of where your money goes and helps eliminate wasteful spending.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Track Your Spending</CardTitle>
                <CardDescription>{`You can't manage what you don't measure`}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Consistently tracking your expenses is the foundation of good financial management:
                </p>
                <ul className="space-y-2 list-disc pl-5">
                  <li>Use a dedicated app, spreadsheet, or notebook</li>
                  <li>Record every expense, no matter how small</li>
                  <li>Categorize expenses to identify spending patterns</li>
                  <li>Review your spending weekly to stay on track</li>
                </ul>
                <p className="mt-4">{`
                  Regular tracking helps identify areas where you can cut back and ensures you're sticking to your
                  budget.`}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Use Cash Envelopes for Problem Areas</CardTitle>
                <CardDescription>A tangible way to control spending</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">For categories where you tend to overspend, try the cash envelope system:</p>
                <ul className="space-y-2 list-disc pl-5">
                  <li>Withdraw cash for specific budget categories (e.g., groceries, dining out)</li>
                  <li>Place the cash in labeled envelopes</li>
                  <li>Only spend whats in the envelope for that category</li>
                  <li>When the envelope is empty, stop spending in that category until next budget period</li>
                </ul>
                <p className="mt-4">
                  This physical limitation makes overspending more difficult and increases awareness of your consumption
                  habits.
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Saving Tips */}
        <TabsContent value="saving">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Pay Yourself First</CardTitle>
                <CardDescription>Make saving a priority, not an afterthought</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Treat savings as a non-negotiable expense by following these steps:</p>
                <ul className="space-y-2 list-disc pl-5">
                  <li>Set up automatic transfers to savings accounts on payday</li>
                  <li>Aim to save at least 20% of your income</li>
                  <li>{`Increase your savings rate gradually if you can't start at 20%`}</li>
                  <li>Keep emergency savings separate from long-term savings</li>
                </ul>
                <p className="mt-4">
                  By saving before you have a chance to spend, you ensure consistent progress toward your financial
                  goals.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Build an Emergency Fund</CardTitle>
                <CardDescription>Your financial safety net</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">An emergency fund is essential for financial stability:</p>
                <ul className="space-y-2 list-disc pl-5">
                  <li>Start with a goal of ₹10,000 for immediate emergencies</li>
                  <li>Build up to 3-6 months of essential expenses</li>
                  <li>Keep the fund in a separate, easily accessible account</li>
                  <li>Replenish the fund immediately after using it</li>
                </ul>
                <p className="mt-4">
                  Having an emergency fund prevents you from going into debt when unexpected expenses arise.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Use Sinking Funds</CardTitle>
                <CardDescription>Plan ahead for predictable expenses</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Sinking funds help you prepare for irregular but predictable expenses:</p>
                <ul className="space-y-2 list-disc pl-5">
                  <li>Identify predictable non-monthly expenses (e.g., insurance premiums, holidays, home repairs)</li>
                  <li>Calculate how much you need to save monthly for each expense</li>
                  <li>Set up separate accounts or track balances for each fund</li>
                  <li>Contribute regularly to each fund</li>
                </ul>
                <p className="mt-4">
                  Sinking funds turn large, irregular expenses into manageable monthly savings goals.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Automate Your Savings</CardTitle>
                <CardDescription>Remove the temptation to spend</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Automation is the key to consistent saving:</p>
                <ul className="space-y-2 list-disc pl-5">
                  <li>Set up automatic transfers from checking to savings accounts</li>
                  <li>Use direct deposit to split your paycheck between accounts</li>
                  <li>Consider apps that round up purchases and save the difference</li>
                  <li>Automatically increase savings when you receive a raise</li>
                </ul>
                <p className="mt-4">
                  Automation removes the need for willpower and ensures you consistently build your savings.
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Investing Tips */}
        <TabsContent value="investing">
          <div className="flex flex-col gap-6">
            {/* Investing Platforms Section */}
            <div className="grid grid-cols-1 gap-6 mb-6">
              <Card>
                <CardHeader>
                  <CardTitle>Popular Investment Platforms</CardTitle>
                  <CardDescription>Leading platforms for Indian investors</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-6 justify-center items-center">
                    <div className="text-center">
                      <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center justify-center">
                        <Image src={'/groww.png'} alt="" width={150} height={120}/>
                        <h3 className="font-bold text-lg mb-1">Groww</h3>
                        <p className="text-sm text-gray-600">User-friendly platform for stocks, mutual funds, US stocks, IPOs, and more</p>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center justify-center">
                      <Image src={'/zerodha.png'} alt="" width={90} height={90}/>
                        <h3 className="font-bold text-lg mb-1">Zerodha</h3>
                        <p className="text-sm text-gray-600">Discount broker offering stocks, derivatives, currencies, and mutual funds</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Investment Options Section */}
            <div className="grid grid-cols-1 gap-6 mb-6">
              <Card>
                <CardHeader>
                  <CardTitle>Investment Options in India</CardTitle>
                  <CardDescription>Popular investment vehicles and their characteristics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="border rounded-lg p-4">
                      <h3 className="font-bold text-lg mb-2">Equity Investments</h3>
                      <ul className="space-y-1 list-disc pl-5 text-sm">
                        <li>Stocks (direct equity)</li>
                        <li>Equity mutual funds</li>
                        <li>Index funds & ETFs</li>
                        <li>Higher risk, potentially higher returns</li>
                        <li>Best for long-term goals (5+ years)</li>
                      </ul>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h3 className="font-bold text-lg mb-2">Debt Investments</h3>
                      <ul className="space-y-1 list-disc pl-5 text-sm">
                        <li>Fixed deposits</li>
                        <li>Public Provident Fund (PPF)</li>
                        <li>Debt mutual funds</li>
                        <li>Government & corporate bonds</li>
                        <li>Lower risk, stable returns</li>
                      </ul>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h3 className="font-bold text-lg mb-2">Hybrid Investments</h3>
                      <ul className="space-y-1 list-disc pl-5 text-sm">
                        <li>Balanced mutual funds</li>
                        <li>Monthly income plans</li>
                        <li>Capital protection funds</li>
                        <li>Moderate risk, balanced returns</li>
                        <li>Good for medium-term goals (3-5 years)</li>
                      </ul>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h3 className="font-bold text-lg mb-2">Alternative Investments</h3>
                      <ul className="space-y-1 list-disc pl-5 text-sm">
                        <li>Real estate</li>
                        <li>Gold (physical, ETFs, sovereign gold bonds)</li>
                        <li>REITs (Real Estate Investment Trusts)</li>
                        <li>Cryptocurrency (high risk)</li>
                        <li>Portfolio diversification options</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Original Cards */}
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Start Early</CardTitle>
                  <CardDescription>Time is your greatest investment advantage</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">The power of compound interest makes starting early crucial:</p>
                  <ul className="space-y-2 list-disc pl-5">
                    <li>Even small amounts invested early can grow significantly over time</li>
                    <li>Starting 10 years earlier can double your final investment value</li>
                    <li>Begin investing as soon as you have an emergency fund established</li>
                    <li>Increase your investment contributions gradually over time</li>
                  </ul>
                  <p className="mt-4">
                    Remember: The best time to start investing was 20 years ago. The second best time is now.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Diversify Your Investments</CardTitle>
                  <CardDescription>{`Don't put all your eggs in one basket`}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">Diversification helps manage risk in your investment portfolio:</p>
                  <ul className="space-y-2 list-disc pl-5">
                    <li>Spread investments across different asset classes (stocks, bonds, real estate)</li>
                    <li>Within each asset class, diversify further (different sectors, regions, company sizes)</li>
                    <li>Consider index funds or ETFs for instant diversification</li>
                    <li>Rebalance your portfolio periodically to maintain your target allocation</li>
                  </ul>
                  <p className="mt-4">{`
                    Diversification can't eliminate all risk, but it can reduce the impact of volatility on your overall
                    portfolio.`}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Understand Risk Tolerance</CardTitle>
                  <CardDescription>Know yourself as an investor</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">Your risk tolerance should guide your investment strategy:</p>
                  <ul className="space-y-2 list-disc pl-5">
                    <li>Consider your age, financial goals, and time horizon</li>
                    <li>Assess how you react emotionally to market fluctuations</li>
                    <li>Younger investors can generally take on more risk</li>
                    <li>Adjust your asset allocation based on your risk tolerance</li>
                  </ul>
                  <p className="mt-4">
                    The right investment strategy is one you can stick with through market ups and downs.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Keep Costs Low</CardTitle>
                  <CardDescription>Fees eat into your returns</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">Investment costs have a significant impact on long-term returns:</p>
                  <ul className="space-y-2 list-disc pl-5">
                    <li>Choose low-cost index funds over actively managed funds when possible</li>
                    <li>Compare expense ratios when selecting investments</li>
                    <li>Be aware of transaction fees, account maintenance fees, and advisory fees</li>
                    <li>A 1% difference in fees can reduce your final balance by 20% over 30 years</li>
                  </ul>
                  <p className="mt-4">
                    Minimizing costs is one of the few factors in investing that you can directly control.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>SIP Investment Strategy</CardTitle>
                  <CardDescription>Consistent investing for long-term growth</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">Systematic Investment Plans (SIPs) offer multiple advantages:</p>
                  <ul className="space-y-2 list-disc pl-5">
                    <li>Invest a fixed amount regularly (monthly, quarterly)</li>
                    <li>Benefit from rupee-cost averaging by buying more units when prices are low</li>
                    <li>Develop financial discipline through automated investments</li>
                    <li>Start with as little as ₹500 per month in many mutual funds</li>
                  </ul>
                  <p className="mt-4">
                    SIPs take emotion out of investing and help you build wealth steadily over time.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Tax-Efficient Investing</CardTitle>
                  <CardDescription>Maximize your after-tax returns</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">Understanding tax implications can significantly impact your returns:</p>
                  <ul className="space-y-2 list-disc pl-5">
                    <li>Utilize tax-saving investments under Section 80C (ELSS, PPF, etc.)</li>
                    <li>Consider tax-free bonds for interest income</li>
                    <li>Understand equity taxation (LTCG vs STCG) and holding periods</li>
                    <li>Hold assets for longer periods to benefit from lower long-term capital gains tax</li>
                  </ul>
                  <p className="mt-4">
                    It&apos;s not just what you earn that matters, but what you keep after taxes.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Debt Management Tips */}
        <TabsContent value="debt">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Debt Avalanche Method</CardTitle>
                <CardDescription>Mathematically optimal debt repayment</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">The debt avalanche method focuses on interest rates:</p>
                <ul className="space-y-2 list-disc pl-5">
                  <li>List all debts from highest to lowest interest rate</li>
                  <li>Make minimum payments on all debts</li>
                  <li>Put extra money toward the highest-interest debt</li>
                  <li>Once the highest-interest debt is paid off, move to the next highest</li>
                </ul>
                <p className="mt-4">
                  This method minimizes the total interest paid and gets you out of debt in the shortest time
                  mathematically possible.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Debt Snowball Method</CardTitle>
                <CardDescription>Psychologically motivating debt repayment</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">The debt snowball method focuses on quick wins:</p>
                <ul className="space-y-2 list-disc pl-5">
                  <li>List all debts from smallest to largest balance</li>
                  <li>Make minimum payments on all debts</li>
                  <li>Put extra money toward the smallest debt</li>
                  <li>Once the smallest debt is paid off, move to the next smallest</li>
                </ul>
                <p className="mt-4">
                  This method provides psychological momentum through early victories, which can help you stay motivated
                  throughout the debt repayment journey.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Avoid New Debt</CardTitle>
                <CardDescription>{`Stop digging when you're in a hole`}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">{`While paying off existing debt, it's crucial to avoid accumulating new debt:`}</p>
                <ul className="space-y-2 list-disc pl-5">
                  <li>Create and stick to a budget that prevents overspending</li>
                  <li>Build an emergency fund to avoid debt for unexpected expenses</li>
                  <li>Consider temporarily freezing credit cards (literally or figuratively)</li>
                  <li>Practice delayed gratification for non-essential purchases</li>
                </ul>
                <p className="mt-4">
                  Your debt repayment progress will be undermined if you continue to add new debt while paying off old
                  debt.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Consider Debt Consolidation</CardTitle>
                <CardDescription>Simplify and potentially reduce interest</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Debt consolidation can be an effective strategy in certain situations:</p>
                <ul className="space-y-2 list-disc pl-5">
                  <li>Combine multiple high-interest debts into a single lower-interest loan</li>
                  <li>Simplify repayment with a single monthly payment</li>
                  <li>Consider balance transfer offers with 0% introductory rates</li>
                  <li>Be cautious of fees and ensure the math works in your favor</li>
                </ul>
                <p className="mt-4">{`
                  Consolidation can be helpful, but it's not a solution by itself—you still need to address the spending
                  habits that led to the debt.`}
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}