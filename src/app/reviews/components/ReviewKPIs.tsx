"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, MessageSquare, Star, ThumbsUp } from "lucide-react";
import KpiCard from "./KpiCard";

interface KPIs {
    totalReviews: number;
    approvedCount: number;
    publishedCount: number;
    avgRating: number;
}

export default function ReviewKPIs() {
    const [kpis, setKpis] = useState<KPIs | null>(null)

    useEffect(() => {
        fetch("/api/reviews/kpis")
            .then((res) => res.json())
            .then(setKpis)
    }, [])

    if (!kpis)
        return <div className="text-2xl font-bold p-6">Loading KPIs...</div>

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 p-6 gap-6 mb-6">
            <KpiCard
                title="Total Reviews"
                value={kpis.totalReviews}
                icon={MessageSquare}
                gradient="bg-gradient-to-r from-[#284e4c] to-[#31616d]"
            />
            <KpiCard
                title="Approved"
                value={kpis.approvedCount}
                icon={ThumbsUp}
                gradient="bg-gradient-to-r from-[#ad89b2] to-[#db96af]"
            />
            <KpiCard
                title="Published"
                value={kpis.publishedCount}
                icon={Globe}
                gradient="bg-gradient-to-r from-[#4d718e] to-[#7a7ea7]"
            />
            <KpiCard
                title="Avg Rating"
                value={kpis.avgRating}
                icon={Star}
                gradient="bg-gradient-to-r from-[#31616d] to-[#4d718e]"
            />
        </div>
    )
}
