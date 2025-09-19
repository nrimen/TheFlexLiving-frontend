"use client"

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts"

interface CategoryRating {
  category: string
  rating: number
}

interface Props {
  categories: CategoryRating[]
}

export default function CategoryRatingsChart({ categories }: Props) {
  const data = categories.map((c) => ({
    category: c.category.replace("_", " "),
    rating: c.rating,
  }))

  return (
    <ChartContainer
      className="h-64 w-full"
      config={{
        rating: {
          label: "Rating",
          color: "#284e4c",
        },
      }}
    >
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="category" tickLine={false} axisLine={false} />
        <YAxis domain={[0, 5]} allowDecimals={false} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="rating" fill="var(--color-rating)" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ChartContainer>
  )
}
