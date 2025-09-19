"use client";

import { useEffect, useState } from "react";
import ReviewsTable from "./components/ReviewsTable";
import ReviewsCarousel from "./components/ReviewsCarousel";
import TopbarFilters from "@/components/filters/TopBarFilters";
import Sidebar from "./components/Sidebar";
import ReviewKPIs from "./components/ReviewKPIs";
import { Review } from "./types/reviews";

interface Filters {
    date?: Date;
    rating: number;
    category: string;
    channel: string;
    published: boolean;
    approved: boolean;
}

export default function ReviewsPage() {
    const [filters, setFiltersState] = useState<Filters>({
        date: undefined,
        rating: 0,
        category: "",
        channel: "",
        published: false,
        approved: false,
    });

    const [showCarousel, setShowCarousel] = useState(false);
    const [reviews, setReviews] = useState<Review[]>([]);

    const setFilters = (newFilters: Partial<Filters>) => {
        setFiltersState((prev) => ({ ...prev, ...newFilters }));
    };
    useEffect(() => {
        fetch("/api/reviews/published")
            .then((res) => res.json())
            .then((data) => setReviews(data));
    }, []);

    return (
        <div className="flex min-h-screen w-full">
            <div className="flex-1 flex flex-col gap-4">
                <div className="px-6 sticky top-0 z-50 bg-white shadow p-4">
                    <TopbarFilters filters={filters} setFilters={setFilters} />
                </div>
                <ReviewKPIs />

                <div className="px-6 flex justify-end">
                    <button
                        className="bg-[#284e4c] text-white px-4 py-2 rounded hover:bg-[#1f3b3a]"
                        onClick={() => setShowCarousel((prev) => !prev)}
                    >
                        {showCarousel ? "Show Table" : "published Reviews"}
                    </button>
                </div>

                <div className="px-6 flex-1">
                    {showCarousel ? (
                        <ReviewsCarousel reviews={reviews} />
                    ) : (
                        <ReviewsTable filters={filters} />
                    )}
                </div>
            </div>
        </div>

    );
}
