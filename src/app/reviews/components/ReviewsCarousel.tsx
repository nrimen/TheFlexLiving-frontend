"use client";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Review } from "../types/reviews";
import { getStarsFromRating } from "../utils/rating";
import { Star, Tag } from "lucide-react";
import { useEffect, useRef } from "react";

interface Props {
    reviews: Review[];
    interval?: number;
}

export default function ReviewsCarousel({ reviews, interval = 4000 }: Props) {
    const nextRef = useRef<HTMLButtonElement | null>(null);

    // Autoplay that never stops
    useEffect(() => {
        if (!reviews.length) return;
        const timer = setInterval(() => {
            nextRef.current?.click();
        }, interval);
        return () => clearInterval(timer);
    }, [interval, reviews.length]);

    if (!reviews.length)
        return (
            <div className="text-center py-10 text-gray-500">
                No published reviews
            </div>
        );

    const renderStars = (rating: number) => {
        const stars = getStarsFromRating(rating);
        return (
            <div className="flex justify-center mb-3">
                {Array.from({ length: 5 }, (_, i) => (
                    <Star
                        key={i}
                        size={20}
                        className={i < stars ? "text-yellow-400" : "text-gray-300"}
                    />
                ))}
            </div>
        );
    };

    const renderCategories = (categories: Review["categories"]) => (
        <div className="flex flex-wrap justify-center gap-2 mt-3">
            {categories.map((c, idx) => (
                <span
                    key={idx}
                    className="flex items-center gap-1 px-3 py-1 text-sm text-gray-700"
                >
                    <Tag size={14} className="text-gray-500" />
                    {c.category}: {c.rating}
                </span>
            ))}
        </div>
    );

    return (
        <Carousel className="w-full max-w-6xl mx-auto mb-6"
            opts={{
                loop: true, 
            }}
            >
            <CarouselContent>
                {reviews.map((review) => (
                    <CarouselItem
                        key={review.id}
                        className="flex justify-center px-4"
                    >
                        <div className="w-96 p-6 flex flex-col items-center text-center rounded-md">
                            {renderStars(review.rating)}

                            <p className="font-medium text-lg text-gray-800 mb-3 italic">
                                "{review.reviewText}"
                            </p>

                            <h3 className="font-bold text-md text-gray-700 mb-2">
                                {review.listing}
                            </h3>

                            {renderCategories(review.categories)}
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>

            <div className="flex justify-between mt-4 px-6">
                <CarouselPrevious className="bg-white text-[#284e4c] p-2 rounded-full hover:bg-[#1f3b3a]" />
                <CarouselNext
                    ref={nextRef}
                    className="bg-white text-[#284e4c] p-2 rounded-full hover:bg-[#1f3b3a]"
                />
            </div>
        </Carousel>
    );
}
