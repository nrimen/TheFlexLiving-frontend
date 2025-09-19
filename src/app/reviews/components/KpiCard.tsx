"use client";
import { Card, CardContent } from "@/components/ui/card"
import { LucideIcon } from "lucide-react"

interface KpiCardProps {
  title: string
  value: string | number
  icon: LucideIcon  
  gradient: string
}

export default function KpiCard({ title, value, icon: Icon, gradient }: KpiCardProps) {
  return (
    <Card
      className={`relative overflow-hidden rounded-2xl shadow-md text-white ${gradient}`}
    >
      <CardContent className="p-6 flex items-center justify-between">
        <div>
          <p className="text-sm opacity-80">{title}</p>
          <h3 className="text-3xl font-bold">{value}</h3>
        </div>
        <div className="p-3 rounded-full bg-white/20">
          <Icon size={28} /> 
        </div>
      </CardContent>
    </Card>
  )
}
