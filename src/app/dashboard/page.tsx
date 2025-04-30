'use client'

import { Button } from '@/components/ui/button'
import { useMutation } from 'convex/react'
import { FileUpIcon } from 'lucide-react'
import { NextPage } from 'next'
import { useRef, useState, useEffect } from 'react'
import { api } from '../../../convex/_generated/api'
import { useUser } from '@clerk/nextjs'
import { Suspense } from 'react'
import Link from 'next/link'
import { ArrowUpDown, Calendar, Download, Filter, PieChart } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import CityCanvas from '@/components/CityCanvas'
import { ExpenseOverview } from '@/components/expense-overview'
import { RecentTransactions } from '@/components/recent-transactions'
import { SpendingByCategory } from '@/components/spending-by-category'
import { TotalSpending } from '@/components/total-spending'

interface MoneySpent {
  category: string
  date: string
  fullTimestamp: string
  moneyPaid: string
  to: string
}

const Page: NextPage = () => {
  const { user } = useUser()
  const inputRef = useRef<HTMLInputElement>(null)
  const [dataList, setDataList] = useState<MoneySpent[]>([])
  const existingTransactions = useMutation(api.transactions.getTransactions)
  const createTransaction = useMutation(api.transactions.createTransaction)

  useEffect(() => {
    if (user?.id) {
      existingTransactions({ clerkId: user.id })
        .then(data => {
          console.log(data?.records)
          setDataList(data?.records || [])
        })
        .catch(err => {
          console.error('Error fetching transactions:', err)
        })
    }
  }, [ existingTransactions])

  if (!user) return <div>Loading...</div>

  const handleFileChange = async () => {
    const fileInput = inputRef.current
    if (fileInput?.files?.length) {
      const formData = new FormData()
      formData.append('file', fileInput.files[0])

      try {
        const res = await fetch('http://127.0.0.1:5000/process', {
          method: 'POST',
          body: formData,
        })
        const parsedData: MoneySpent[] = await res.json()
        setDataList(parsedData)

        await createTransaction({
          clerkId: user.id,
          record: parsedData,
        })
      } catch (err) {
        console.error('Upload failed:', err)
      }
    }
  }

  const triggerFileInput = () => {
    inputRef.current?.click()
  }

  // Process data for charts and cards
  const totalSpent = dataList
    .reduce((sum, item) => sum + parseFloat(item.moneyPaid || '0'), 0)
    .toFixed(2)

  const transactionsCount = dataList.length

  const averageTransaction = transactionsCount
    ? (parseFloat(totalSpent) / transactionsCount).toFixed(2)
    : '0.00'

  const categorySpending = dataList.reduce((acc, item) => {
    const amount = parseFloat(item.moneyPaid || '0')
    acc[item.category] = (acc[item.category] || 0) + amount
    return acc
  }, {} as Record<string, number>)

  const highestCategory = Object.entries(categorySpending).reduce(
    (max, [category, amount]) => (amount > max.amount ? { category, amount } : max),
    { category: 'None', amount: 0 }
  )

  const spendingByMonth = dataList.reduce((acc, item) => {
    const date = new Date(item.date)
    const monthYear = date.toLocaleString('default', { month: 'short', year: 'numeric' })
    const amount = parseFloat(item.moneyPaid || '0')
    //acc[monthYear][] = (acc[monthYear] || 0) + amount
    if(!acc[monthYear]) {
      acc[monthYear] = {}
    }
    acc[monthYear][item.category] = (acc[item.category] || 0) + amount
    acc[monthYear]["month"] = date.toLocaleString('default',{month:'long'})

    return acc
  }, {} as Record<string, number>)

  const spendingByYear = dataList.reduce((acc, item) => {
    const date = new Date(item.date)
    const monthYear = date.toLocaleString('default', { month: 'short', year: 'numeric' })
    const amount = parseFloat(item.moneyPaid || '0')
    //acc[monthYear][] = (acc[monthYear] || 0) + amount
    if(!acc[monthYear]) {
      acc[monthYear] = {}
    }
    acc[monthYear]["amount"] = (acc[monthYear]["amount"] || 0) + amount
    acc[monthYear]["month"] = date.toLocaleString('default',{month:'long'})

    return acc
  }, {} as Record<string, number>)

  const recentTransactions = [...dataList]
    .sort((a, b) => new Date(b.fullTimestamp).getTime() - new Date(a.fullTimestamp).getTime())
    .slice(0, 5)

  return (
    <div className="flex min-h-screen w-full flex-col">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <div className="ml-auto flex items-center space-x-4">
            <Button variant="outline" size="sm" className="h-8 gap-1" onClick={triggerFileInput}>
              <Download className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Import Data</span>
            </Button>
            <Button variant="outline" size="sm" className="h-8 gap-1">
              <Filter className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only">Filter</span>
            </Button>
            <Button variant="outline" size="sm" className="h-8 gap-1">
              <Calendar className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only">Apr 1 - Apr 30, 2025</span>
            </Button>
          </div>
        </div>
      </div>
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Financial Dashboard</h2>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" className="h-8">
              <ArrowUpDown className="mr-2 h-3.5 w-3.5" />
              Sort
            </Button>
            <Link href="/transactions">
              <Button size="sm" className="h-8">View All Transactions</Button>
            </Link>
          </div>
        </div>
        {dataList.length > 0 ? (
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="city-view">City View</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="transactions">Transactions</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
                    <PieChart className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">₹{totalSpent}</div>
                    <p className="text-xs text-muted-foreground">Based on {transactionsCount} transactions</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Highest Category</CardTitle>
                    <PieChart className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{highestCategory.category}</div>
                    <p className="text-xs text-muted-foreground">
                      ₹{highestCategory.amount.toFixed(2)} (
                      {((highestCategory.amount / parseFloat(totalSpent)) * 100).toFixed(1)}%)
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Transactions</CardTitle>
                    <PieChart className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{transactionsCount}</div>
                    <p className="text-xs text-muted-foreground">Total transactions this period</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Average Transaction</CardTitle>
                    <PieChart className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">₹{averageTransaction}</div>
                    <p className="text-xs text-muted-foreground">Per transaction</p>
                  </CardContent>
                </Card>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>Spending Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <Suspense fallback={<div>Loading chart...</div>}>
                      <ExpenseOverview data={Object.values(spendingByMonth)} />
                    </Suspense>
                  </CardContent>
                </Card>
                <Card className="col-span-3">
                  <CardHeader>
                    <CardTitle>Spending by Category</CardTitle>
                    <CardDescription>Breakdown of your expenses by category</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Suspense fallback={<div>Loading chart...</div>}>
                      <SpendingByCategory data={categorySpending} />
                    </Suspense>
                  </CardContent>
                </Card>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>Recent Transactions</CardTitle>
                    <CardDescription>Your most recent financial activities</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Suspense fallback={<div>Loading transactions...</div>}>
                      <RecentTransactions transactions={recentTransactions} />
                    </Suspense>
                  </CardContent>
                </Card>
                <Card className="col-span-3">
                  <CardHeader>
                    <CardTitle>Total Spending</CardTitle>
                    <CardDescription>Your spending trend over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Suspense fallback={<div>Loading chart...</div>}>
                      <TotalSpending dataList={Object.values(spendingByYear)} />
                    </Suspense>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="city-view" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Financial City Map</CardTitle>
                  <CardDescription>Click on buildings to see detailed spending information</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="h-[600px] w-full">
                    <Suspense fallback={<div className="flex h-full items-center justify-center">Loading city map...</div>}>
                      <CityCanvas />
                    </Suspense>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="analytics" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Advanced Analytics</CardTitle>
                  <CardDescription>Detailed analysis of your spending patterns</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-10">
                    <p className="text-muted-foreground">Analytics view is coming soon</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="transactions" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>All Transactions</CardTitle>
                  <CardDescription>Complete history of your financial activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentTransactions transactions={dataList} />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        ) : (
          <div className="flex flex-col items-center justify-center h-screen">
            <input
              id="file"
              type="file"
              ref={inputRef}
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
            <Button className="text-lg px-6 py-7" onClick={triggerFileInput}>
              Upload
              <FileUpIcon className="ml-2" />
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Page