'use client'

import { Button } from '@/components/ui/button'
import { useMutation } from 'convex/react'
import { FileUpIcon } from 'lucide-react'
import { NextPage } from 'next'
import { useRef, useState,useEffect } from 'react'
import { api } from '../../../convex/_generated/api'
import { useUser } from '@clerk/nextjs'

import { Suspense } from "react"
import Link from "next/link"
import { ArrowUpDown, Calendar, Download, Filter, PieChart } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import CityCanvas from "@/components/CityCanvas"
import { ExpenseOverview } from "@/components/expense-overview"
import { RecentTransactions } from "@/components/recent-transactions"
import { SpendingByCategory } from "@/components/spending-by-category"
import { TotalSpending } from "@/components/total-spending"

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
      existingTransactions({ clerkId: user.id }).then(data => {
        console.log(data?.records)
        setDataList(data?.records || [])
      }).catch(err => {
        console.error('Error fetching transactions:', err)
      })
    }
    
  }, [user,existingTransactions])
  
  if(!user) return <div>Loading...</div>

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

        // Push each record to Convex
          await createTransaction({
            clerkId: user.id ,
            record:parsedData,
          })
      } catch (err) {
        console.error('Upload failed:', err)
      }
    }
  }

  const triggerFileInput = () => {
    inputRef.current?.click()
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <div className="ml-auto flex items-center space-x-4">
            <Button variant="outline" size="sm" className="h-8 gap-1">
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
              <Button size="sm" className="h-8">
                View All Transactions
              </Button>
            </Link>
          </div>
        </div>
        {
          (dataList ?? []).length > 0 || dataList.length > 0 ? (
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
                    <div className="text-2xl font-bold">{}</div>
                    <p className="text-xs text-muted-foreground">+12.5% from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Highest Category</CardTitle>
                    <PieChart className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">Education</div>
                    <p className="text-xs text-muted-foreground">₹8,750.00 (35.6%)</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Transactions</CardTitle>
                    <PieChart className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">42</div>
                    <p className="text-xs text-muted-foreground">+8 from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Average Transaction</CardTitle>
                    <PieChart className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">₹584.95</div>
                    <p className="text-xs text-muted-foreground">-2.5% from last month</p>
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
                      <ExpenseOverview />
                    </Suspense>
                  </CardContent>
                </Card>
                <Card className="col-span-3">
                  <CardHeader>
                    <CardTitle>Spending by Category</CardTitle>
                    <CardDescription>Breakdown of your expenses by category for the current period</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Suspense fallback={<div>Loading chart...</div>}>
                      <SpendingByCategory />
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
                      <RecentTransactions />
                    </Suspense>
                  </CardContent>
                </Card>
                <Card className="col-span-3">
                  <CardHeader>
                    <CardTitle>Total Spending</CardTitle>
                    <CardDescription>Your spending trend over the past 6 months</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Suspense fallback={<div>Loading chart...</div>}>
                      <TotalSpending />
                    </Suspense>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="city-view" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Financial City Map</CardTitle>
                  <CardDescription>
                    Click on buildings to see detailed spending information for each category
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="h-[600px] w-full">
                    <Suspense
                      fallback={<div className="flex h-full items-center justify-center">Loading city map...</div>}
                    >
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
                  <div className="text-center py-10">
                    <p className="text-muted-foreground">Full transaction view is coming soon</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          ) : (
            <input
              id="file"
              type="file"
              ref={inputRef}
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
          )
        }
        
      </div>
    </div>
    
  )
}

let temp = {/*<div className="flex flex-col items-center justify-center h-screen">
  (dataList ?? []).length > 0 || dataList.length > 0 ? (
    <div className="w-full max-w-md p-4 bg-white shadow-md rounded">
      <h2 className="text-xl font-bold mb-4">Transaction Details</h2>
      <ul className="space-y-4">
        {(dataList ?? dataList).map((item, index) => (
          <li key={index} className="border-b pb-2">
            <p><strong>Category:</strong> {item.category}</p>
            <p><strong>Date:</strong> {item.date}</p>
            <p><strong>Full Timestamp:</strong> {item.fullTimestamp}</p>
            <p><strong>Money Paid:</strong> ${item.moneyPaid}</p>
            <p><strong>To:</strong> {item.to}</p>
          </li>
        ))}
      </ul>
    </div>
  ) : (
    <>
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
    </>
  )
</div>*/}
export default Page