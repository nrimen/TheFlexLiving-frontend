"use client";

import { useEffect, useState } from "react";
import { Star, Tag } from "lucide-react";
import { Review } from "@/app/reviews/types/reviews";
import { getStarsFromRating } from "@/app/reviews/utils/rating";

interface Listing {
  name: string;
  reviews: Review[];
}

export default function Listings() {
  const [listings, setListings] = useState<Listing[]>([]);

  useEffect(() => {
    fetch("/api/reviews")
      .then((res) => res.json())
      .then((reviews: Review[]) => {
        const grouped: { [key: string]: Listing } = {};

        reviews.forEach((r) => {
          if (!grouped[r.listing]) {
            grouped[r.listing] = { name: r.listing, reviews: [] };
          }
          grouped[r.listing].reviews.push(r);
        });

        setListings(Object.values(grouped));
      });
  }, []);

  const getAverageRating = (reviews: Review[]) => {
    if (!reviews.length) return 0;
    const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
    return Math.round(sum / reviews.length);
  };

  const getCategoryAverages = (reviews: Review[]) => {
    const catMap: { [key: string]: number[] } = {};
    reviews.forEach((r) => {
      r.categories.forEach((c) => {
        if (!catMap[c.category]) catMap[c.category] = [];
        catMap[c.category].push(c.rating);
      });
    });

    return Object.entries(catMap).map(([cat, ratings]) => {
      const avg = Math.round(ratings.reduce((a, b) => a + b, 0) / ratings.length);
      return { category: cat, rating: avg };
    });
  };

  const renderStars = (rating: number) => {
    const stars = getStarsFromRating(rating);
    return (
      <div className="flex gap-1">
        {Array.from({ length: 5 }, (_, i) => (
          <Star
            key={i}
            size={18}
            className={i < stars ? "text-yellow-400" : "text-gray-300"}
          />
        ))}
      </div>
    );
  };

  if (!listings.length) {
    return <div className="text-center py-10 text-gray-500">No listings available</div>;
  }

  return (
    <section className="max-w-6xl mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold mb-8">Our Listings</h2>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {listings.map((listing) => {
          const avgRating = getAverageRating(listing.reviews);
          const categories = getCategoryAverages(listing.reviews);

          return (
            <div
              key={listing.name}
              className="border rounded-lg p-4 shadow-md hover:shadow-lg transition"
            >
              <h3 className="text-lg font-semibold mb-2">{listing.name}</h3>
              <div className="flex items-center gap-2 mb-2">
                {renderStars(avgRating)}
                <span className="text-sm text-gray-600">
                  ({listing.reviews.length} reviews)
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {categories.map((c) => (
                  <span
                    key={c.category}
                    className="flex items-center gap-1 px-2 py-1 text-sm bg-gray-100 rounded"
                  >
                    <Tag size={14} className="text-gray-500" />
                    {c.category}: {c.rating}/5
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
