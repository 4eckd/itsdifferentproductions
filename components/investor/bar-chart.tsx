'use client'

import React from 'react'
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

interface BarChartProps {
  labels: string[]
  datasets: {
    label: string
    data: number[]
    color: string
  }[]
  title?: string
  height?: number
  formatValue?: (value: number) => string
}

export function BarChart({
  labels,
  datasets,
  title,
  height = 320,
  formatValue = (value: number) => `$${(value / 1000).toFixed(1)}K`
}: BarChartProps) {
  // Transform data for recharts
  const chartData = labels.map((label, index) => {
    const dataPoint: any = { name: label }
    datasets.forEach(dataset => {
      dataPoint[dataset.label] = dataset.data[index]
    })
    return dataPoint
  })

  return (
    <div className="w-full bg-card rounded-lg p-4 border">
      {title && (
        <h3 className="text-lg font-semibold mb-4 text-center">{title}</h3>
      )}
      <div style={{ height: `${height}px` }}>
        <ResponsiveContainer width="100%" height="100%">
          <RechartsBarChart
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 12 }}
              className="text-muted-foreground"
            />
            <YAxis
              tick={{ fontSize: 12 }}
              tickFormatter={formatValue}
              className="text-muted-foreground"
            />
            <Tooltip
              formatter={(value: any, name: string) => [formatValue(Number(value)), name]}
              labelStyle={{ color: 'hsl(var(--foreground))' }}
              contentStyle={{
                backgroundColor: 'hsl(var(--background))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px'
              }}
            />
            {datasets.length > 1 && <Legend />}
            {datasets.map((dataset, index) => (
              <Bar
                key={dataset.label}
                dataKey={dataset.label}
                fill={dataset.color}
                radius={[4, 4, 0, 0]}
              />
            ))}
          </RechartsBarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default BarChart
