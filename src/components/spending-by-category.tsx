"use client"

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

const colorMap = {
    Education: "#3b82f6",
    Food: "#16a34a",
    Traveling: "#facc15",
    Recharges: "#a855f7",
    Fuel: "#ef4444",
    Electricity: "#f97316",
    Chocolates: "#ec4899",
    Other: "#6b7280"
  };

export function SpendingByCategory({data}) {
    const datar = Object.entries(data).map(([name, value]) => ({
        name,
        value: Math.round(value), // optional: round the number
        color: colorMap[name] || "#000000" // fallback color if missing
      }));
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={datar}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={2}
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            labelLine={false}
          >
            {datar.map((entry, index) => (
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
