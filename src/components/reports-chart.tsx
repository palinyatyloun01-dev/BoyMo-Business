"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Pie, PieChart, Cell } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { DateRange } from "react-day-picker"

const dailyData = [
  { date: "ຈັນ", income: 1200000, expense: 800000 },
  { date: "ອັງຄານ", income: 1500000, expense: 900000 },
  { date: "ພຸດ", income: 1300000, expense: 700000 },
  { date: "ພະຫັດ", income: 1800000, expense: 1100000 },
  { date: "ສຸກ", income: 2200000, expense: 1300000 },
  { date: "ເສົາ", income: 2500000, expense: 1500000 },
  { date: "ອາທິດ", income: 2800000, expense: 1600000 },
]

const weeklyData = [
    { week: "ອາທິດ 1", income: 8500000, expense: 5200000 },
    { week: "ອາທິດ 2", income: 9200000, expense: 5800000 },
    { week: "ອາທິດ 3", income: 7800000, expense: 4900000 },
    { week: "ອາທິດ 4", income: 9500000, expense: 6100000 },
]

const monthlyData = [
    { month: "ມັງກອນ", income: 35000000, expense: 22000000 },
    { month: "ກຸມພາ", income: 38000000, expense: 25000000 },
    { month: "ມີນາ", income: 42000000, expense: 28000000 },
    { month: "ເມສາ", income: 40000000, expense: 26000000 },
]

const yearlyData = [
    { year: "2023", income: 450000000, expense: 300000000 },
    { year: "2024", income: 500000000, expense: 350000000 },
]

const pieData = [
    { name: "ລາຍຮັບ", value: 500000000, fill: "var(--color-income)" },
    { name: "ລາຍຈ່າຍ", value: 350000000, fill: "var(--color-expense)" },
]

const chartConfig = {
  income: {
    label: "ລາຍຮັບ",
    color: "hsl(var(--chart-2))",
  },
  expense: {
    label: "ລາຍຈ່າຍ",
    color: "hsl(var(--chart-1))",
  },
}

type ReportsChartProps = {
    dateRange?: DateRange;
}

export function ReportsChart({ dateRange }: ReportsChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>ພາບລວມລາຍຮັບ-ລາຍຈ່າຍ</CardTitle>
        <CardDescription>ເລືອກຊ່ວງເວລາ ແລະ ຮູບແບບເພື່ອເບິ່ງລາຍງານ</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="bar">
            <div className="flex justify-between items-center">
                 <TabsList className="grid w-full grid-cols-4 max-w-sm">
                    <TabsTrigger value="day">ມື້</TabsTrigger>
                    <TabsTrigger value="week">ອາທິດ</TabsTrigger>
                    <TabsTrigger value="month">ເດືອນ</TabsTrigger>
                    <TabsTrigger value="year">ປີ</TabsTrigger>
                </TabsList>
                 <TabsList className="grid w-full grid-cols-2 max-w-[200px]">
                    <TabsTrigger value="bar">Bar Chart</TabsTrigger>
                    <TabsTrigger value="pie">Pie Chart</TabsTrigger>
                </TabsList>
            </div>
          <TabsContent value="bar">
            <ChartContainer config={chartConfig} className="min-h-[400px] w-full">
              <BarChart accessibilityLayer data={dailyData}>
                 <CartesianGrid vertical={false} />
                <XAxis dataKey="date" tickLine={false} tickMargin={10} axisLine={false} />
                <YAxis tickFormatter={(value) => `${value / 1000}k`} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar dataKey="income" fill="var(--color-income)" radius={4} />
                <Bar dataKey="expense" fill="var(--color-expense)" radius={4} />
              </BarChart>
            </ChartContainer>
          </TabsContent>
           <TabsContent value="pie">
            <ChartContainer config={chartConfig} className="min-h-[400px] w-full">
                <PieChart>
                    <ChartTooltip content={<ChartTooltipContent nameKey="name" />} />
                    <Pie
                      data={pieData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={150}
                      labelLine={false}
                      label={({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
                        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                        const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
                        const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));
                        return (
                          <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                            {`${(percent * 100).toFixed(0)}%`}
                          </text>
                        );
                      }}
                    >
                         {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                    </Pie>
                    <ChartLegend content={<ChartLegendContent />} />
                </PieChart>
            </ChartContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
