import { Review, CategoryRating } from "../types/reviews";

export interface TopListing {
  listing: string;
  avgRating: number;
}

export function computeTopListings(reviews: Review[]): TopListing[] {
  const listingMap: Record<string, { sum: number; count: number }> = {};

  reviews.forEach(r => {
    const avgRating = r.categories.reduce((a, c) => a + c.rating, 0) / r.categories.length;
    if (!listingMap[r.listing]) listingMap[r.listing] = { sum: 0, count: 0 };
    listingMap[r.listing].sum += avgRating;
    listingMap[r.listing].count += 1;
  });

  return Object.entries(listingMap)
    .map(([listing, { sum, count }]) => ({
      listing,
      avgRating: +(sum / count).toFixed(2),
    }))
    .sort((a, b) => b.avgRating - a.avgRating);
}

export interface CategoryAverage {
  category: string;
  avgRating: number;
}

export function computeCategoryAverages(reviews: Review[]): CategoryAverage[] {
  const categoryMap: Record<string, { sum: number; count: number }> = {};

  reviews.forEach(r => {
    r.categories.forEach(c => {
      if (!categoryMap[c.category]) categoryMap[c.category] = { sum: 0, count: 0 };
      categoryMap[c.category].sum += c.rating;
      categoryMap[c.category].count += 1;
    });
  });

  return Object.entries(categoryMap).map(([category, { sum, count }]) => ({
    category,
    avgRating: +(sum / count).toFixed(2),
  }));
}
