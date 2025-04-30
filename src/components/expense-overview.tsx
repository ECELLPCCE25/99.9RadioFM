"use client"

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts"

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  {
    month: "January",
    education: 7500,
    food: 3800,
    traveling: 2800,
    recharges: 2200,
    fuel: 1600,
    electricity: 1400,
    chocolates: 700,
    other: 900,
  },
  {
    month: "February",
    education: 8200,
    food: 4100,
    traveling: 3200,
    recharges: 2300,
    fuel: 1750,
    electricity: 1450,
    chocolates: 750,
    other: 1000,
  },
  {
    month: "March",
    education: 7800,
    food: 3950,
    traveling: 3500,
    recharges: 2400,
    fuel: 1800,
    electricity: 1500,
    chocolates: 800,
    other: 1100,
  },
  {
    month: "April",
    education: 8750,
    food: 4320,
    traveling: 3650,
    recharges: 2450,
    fuel: 1850,
    electricity: 1520,
    chocolates: 826,
    other: 1200,
  },
]

export function ExpenseOverview({data}:any) {

  return (
    <ChartContainer
      config={{
        education: {
          label: "Education",
          color: "hsl(217, 91%, 60%)",
        },
        food: {
          label: "Food",
          color: "hsl(142, 76%, 36%)",
        },
        traveling: {
          label: "Traveling",
          color: "hsl(47, 96%, 53%)",
        },
        recharges: {
          label: "Recharges",
          color: "hsl(271, 91%, 65%)",
        },
        fuel: {
          label: "Fuel",
          color: "hsl(0, 84%, 60%)",
        },
        electricity: {
          label: "Electricity",
          color: "hsl(32, 98%, 56%)",
        },
        chocolates: {
          label: "Chocolates",
          color: "hsl(330, 81%, 60%)",
        },
        other: {
          label: "Other",
          color: "hsl(220, 9%, 46%)",
        },
      }}
      className="h-[300px] w-full"
    >
      <ResponsiveContainer  width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="month" tickLine={false} axisLine={false} tickFormatter={(value) => value.substring(0, 3)} />
          <YAxis tickLine={false} axisLine={false} tickFormatter={(value) => `₹${value}`} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="Education" fill="var(--color-education)" radius={4} />
          <Bar dataKey="Food" fill="var(--color-food)" radius={4} />
          <Bar dataKey="Traveling" fill="var(--color-traveling)" radius={4} />
          <Bar dataKey="Recharges" fill="var(--color-recharges)" radius={4} />
          <Bar dataKey="Fuel" fill="var(--color-fuel)" radius={4} />
          <Bar dataKey="Electricity" fill="var(--color-electricity)" radius={4} />
          <Bar dataKey="Chocolates" fill="var(--color-chocolates)" radius={4} />
          <Bar dataKey="Other" fill="var(--color-other)" radius={4} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
