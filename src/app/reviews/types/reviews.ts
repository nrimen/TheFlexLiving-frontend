export interface CategoryRating {
  category: string;
  rating: number;
}

export interface Review {
  id: number;
  guestName: string;
  reviewText: string;
  rating: number;
  categories: CategoryRating[];
  date: string;
  listing: string;
  channel: string;
  published: boolean;
  approved: boolean;
}
