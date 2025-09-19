"use client";

import ReviewsCarousel from "../reviews/components/ReviewsCarousel";
import { Review } from "../reviews/types/reviews";
import { useEffect, useState } from "react";
import Hero from "./components/Hero";
import Listings from "./components/Listings";

export default function HomePage() {
    const [reviews, setReviews] = useState<Review[]>([]);

    useEffect(() => {
        fetch("/api/reviews/published")
            .then((res) => res.json())
            .then((data) => setReviews(data));
    }, []);

    return (
        <div className="min-h-screen mx-auto w-full">
            <Hero />
            <Listings />
            <div className="mt-16 px-6">
                <ReviewsCarousel reviews={reviews} />
            </div>
        </div>
    );
}
