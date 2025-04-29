"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const data = [
  {
    month: "Nov",
    amount: 18500,
  },
  {
    month: "Dec",
    amount: 21200,
  },
  {
    month: "Jan",
    amount: 20900,
  },
  {
    month: "Feb",
    amount: 22750,
  },
  {
    month: "Mar",
    amount: 22950,
  },
  {
    month: "Apr",
    amount: 24567,
  },
]

export function TotalSpending() {
  return (
    <div className="h-[200px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 10,
            left: 10,
            bottom: 0,
          }}
        >
          <XAxis dataKey="month" tickLine={false} axisLine={false} />
          <YAxis tickLine={false} axisLine={false} tickFormatter={(value) => `₹${value / 1000}k`} />
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
                        <span className="font-bold">₹{payload[0].value?.toLocaleString()}</span>
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
            stroke="hsl(var(--primary))"
            strokeWidth={2}
            dot={{ r: 4, strokeWidth: 2 }}
            activeDot={{ r: 6, strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
