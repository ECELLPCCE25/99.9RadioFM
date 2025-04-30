'use client'

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
interface MoneySpent {
    category: string
    date: string
    fullTimestamp: string
    moneyPaid: string
    to: string
}

interface TotalSpendingProps {
  dataList: MoneySpent[]
}

export function TotalSpending({ dataList }: TotalSpendingProps) {
  // Aggregate total spending by month
 

  return (
    <div className="h-[200px]">
      {dataList.length > 0 ? (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={dataList}
            margin={{
              top: 5,
              right: 10,
              left: 10,
              bottom: 0,
            }}
          >
            <XAxis dataKey="month" tickLine={false} axisLine={false} />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `₹${(value / 1000).toFixed(1)}k`}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="rounded-lg border bg-background p-2 shadow-sm">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex flex-col">
                          <span className="text-[0.70rem] uppercase text-muted-foreground">Month</span>
                          <span className="font-bold text-muted-foreground">{payload[0].payload.month}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[0.70rem] uppercase text-muted-foreground">Amount</span>
                          <span className="font-bold">
                            ₹{payload[0].value?.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                }
                return null
              }}
            />
            <Line
              type="monotone"
              dataKey="amount"
              stroke="black"
              strokeWidth={2}
              dot={{ r: 4, strokeWidth: 2 }}
              activeDot={{ r: 6, strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <div className="flex h-full items-center justify-center text-muted-foreground">
          No spending data available
        </div>
      )}
    </div>
  )
}