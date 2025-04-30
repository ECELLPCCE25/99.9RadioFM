"use client"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function TaxDashboard() {
  const [selected, setSelected] = useState("income")

  return (
    <div className="space-y-4">
      <Tabs defaultValue={selected} onValueChange={setSelected} className="w-full">
        <TabsList>
          <TabsTrigger value="income">Income Tax</TabsTrigger>
          <TabsTrigger value="vehicle">Vehicle Tax</TabsTrigger>
        </TabsList>

        <TabsContent value="income">
          <IncomeTaxCalculator />
        </TabsContent>

        <TabsContent value="vehicle">
          <VehicleTaxCalculator />
        </TabsContent>
      </Tabs>
    </div>
  )
}



 function VehicleTaxCalculator() {
  const [vehicleType, setVehicleType] = useState("Car")
  const [fuelType, setFuelType] = useState("Petrol")
  const [engineCC, setEngineCC] = useState(1200)
  const [state, setState] = useState("Maharashtra")
  const [tax, setTax] = useState(0)

  useEffect(() => {
    calculateVehicleTax()
  }, [vehicleType, fuelType, engineCC, state])

  const calculateVehicleTax = () => {
    let baseRate = 0

    // Very basic logic; should be replaced with real data
    if (vehicleType === "Car") {
      baseRate = fuelType === "Diesel" ? 0.08 : 0.06
    } else if (vehicleType === "Bike") {
      baseRate = engineCC > 150 ? 0.10 : 0.05
    } else if (vehicleType === "Truck") {
      baseRate = 0.12
    }

    // State surcharge simulation
    if (state === "Delhi") baseRate += 0.01
    if (state === "Kerala") baseRate += 0.015

    const estimatedValue = engineCC * 100 // simulation of vehicle value
    const taxAmount = estimatedValue * baseRate
    setTax(taxAmount)
  }

  return (
    <Card className="border-0 shadow-none">
      <CardContent className="space-y-4">

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label>Vehicle Type</Label>
            <Select value={vehicleType} onValueChange={setVehicleType}>
              <SelectTrigger><SelectValue placeholder="Vehicle" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Car">Car</SelectItem>
                <SelectItem value="Bike">Bike</SelectItem>
                <SelectItem value="Truck">Truck</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Fuel Type</Label>
            <Select value={fuelType} onValueChange={setFuelType}>
              <SelectTrigger><SelectValue placeholder="Fuel" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Petrol">Petrol</SelectItem>
                <SelectItem value="Diesel">Diesel</SelectItem>
                <SelectItem value="Electric">Electric</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Engine Capacity (CC)</Label>
            <Input type="number" value={engineCC} onChange={(e) => setEngineCC(Number(e.target.value))} min={50} />
          </div>

          <div>
            <Label>Registration State</Label>
            <Select value={state} onValueChange={setState}>
              <SelectTrigger><SelectValue placeholder="State" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Maharashtra">Maharashtra</SelectItem>
                <SelectItem value="Delhi">Delhi</SelectItem>
                <SelectItem value="Kerala">Kerala</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="text-lg font-semibold pt-2">
          Estimated Vehicle Tax: ₹{tax.toFixed(0)}
        </div>
      </CardContent>
    </Card>
  )
}

function IncomeTaxCalculator() {
    const [country, setCountry] = useState("India")
    const [income, setIncome] = useState(500000)
    const [deductions, setDeductions] = useState(50000)
    const [regime, setRegime] = useState("Old")
    const [filingStatus, setFilingStatus] = useState("Individual") // for USA
    const [tax, setTax] = useState(0)
  
    useEffect(() => {
      calculateTax()
    }, [country, income, deductions, regime, filingStatus])
  
    const calculateTax = () => {
      const taxable = Math.max(income - deductions, 0)
  
      let taxAmount = 0
  
      if (country === "India") {
        if (regime === "Old") {
          const slabs = [
            { limit: 250000, rate: 0 },
            { limit: 500000, rate: 0.05 },
            { limit: 1000000, rate: 0.2 },
            { limit: Infinity, rate: 0.3 },
          ]
          taxAmount = calculateSlabTax(taxable, slabs)
        } else {
          const slabs = [
            { limit: 300000, rate: 0 },
            { limit: 600000, rate: 0.05 },
            { limit: 900000, rate: 0.10 },
            { limit: 1200000, rate: 0.15 },
            { limit: 1500000, rate: 0.20 },
            { limit: Infinity, rate: 0.30 },
          ]
          taxAmount = calculateSlabTax(taxable, slabs)
        }
      } else if (country === "USA") {
        const slabs = filingStatus === "Married"
          ? [
              { limit: 22000, rate: 0.1 },
              { limit: 89450, rate: 0.12 },
              { limit: 190750, rate: 0.22 },
              { limit: Infinity, rate: 0.24 },
            ]
          : [
              { limit: 11000, rate: 0.1 },
              { limit: 44725, rate: 0.12 },
              { limit: 95375, rate: 0.22 },
              { limit: Infinity, rate: 0.24 },
            ]
        taxAmount = calculateSlabTax(taxable, slabs)
      }
  
      setTax(taxAmount)
    }
  
    const calculateSlabTax = (amount: number, slabs: { limit: number; rate: number }[]) => {
      let tax = 0
      let lastLimit = 0
  
      for (const slab of slabs) {
        const slabAmount = Math.min(amount, slab.limit) - lastLimit
        if (slabAmount > 0) {
          tax += slabAmount * slab.rate
        }
        lastLimit = slab.limit
        if (amount <= slab.limit) break
      }
  
      return tax
    }
  
    const formatCurrency = (value: number) => {
      return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: country === "USA" ? "USD" : "INR",
        maximumFractionDigits: 0,
      }).format(value)
    }
  
    return (
      <Card className="border-0 shadow-none">
        <CardContent className="space-y-4">
  
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="country">Country</Label>
              <Select value={country} onValueChange={setCountry}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="India">India</SelectItem>
                  <SelectItem value="USA">USA</SelectItem>
                </SelectContent>
              </Select>
            </div>
  
            {country === "India" && (
              <div>
                <Label htmlFor="regime">Tax Regime</Label>
                <Select value={regime} onValueChange={setRegime}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Regime" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Old">Old</SelectItem>
                    <SelectItem value="New">New</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
  
            {country === "USA" && (
              <div>
                <Label htmlFor="filingStatus">Filing Status</Label>
                <Select value={filingStatus} onValueChange={setFilingStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filing Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Individual">Individual</SelectItem>
                    <SelectItem value="Married">Married Filing Jointly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
  
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="income">Annual Income</Label>
              <Input
                id="income"
                type="number"
                value={income}
                onChange={(e) => setIncome(Number(e.target.value))}
                min={0}
                placeholder="Enter gross income"
              />
            </div>
  
            <div>
              <Label htmlFor="deductions">Deductions</Label>
              <Input
                id="deductions"
                type="number"
                value={deductions}
                onChange={(e) => setDeductions(Number(e.target.value))}
                min={0}
                placeholder="Enter deductions (80C, HRA, etc.)"
              />
            </div>
          </div>
  
          <div className="text-lg font-semibold pt-2">
            Estimated Tax: {formatCurrency(tax)}
          </div>
        </CardContent>
      </Card>
    )
  }