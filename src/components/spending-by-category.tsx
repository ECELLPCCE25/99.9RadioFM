"use client"

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

const data = [
  { name: "Education", value: 8750, color: "#3b82f6" },
  { name: "Food", value: 4320, color: "#16a34a" },
  { name: "Traveling", value: 3650, color: "#facc15" },
  { name: "Recharges", value: 2450, color: "#a855f7" },
  { name: "Fuel", value: 1850, color: "#ef4444" },
  { name: "Electricity", value: 1520, color: "#f97316" },
  { name: "Chocolates", value: 826, color: "#ec4899" },
  { name: "Other", value: 1200, color: "#6b7280" },
]

export function SpendingByCategory() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={2}
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="rounded-lg border bg-background p-2 shadow-sm">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex flex-col">
                        <span className="text-[0.70rem] uppercase text-muted-foreground">Category</span>
                        <span className="font-bold text-muted-foreground">{payload[0].name}</span>
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
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
