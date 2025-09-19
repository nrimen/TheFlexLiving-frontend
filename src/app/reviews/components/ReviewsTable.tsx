"use client";

import { useEffect, useState } from "react";
import { Table, TableBody, TableHeader, TableRow, TableHead as TH } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Review } from "@/app/reviews/types/reviews";
import ReviewDialog from "./ReviewDialog";
import ReviewRow from "./ReviewRow";

interface Props {
  filters: Partial<{
    date?: Date;
    rating: number;
    category: string;
    channel: string;
    published: boolean;
    approved: boolean;
  }>;
}

type SortKey = keyof Review;

export default function ReviewsTable({ filters }: Props) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [sortKey, setSortKey] = useState<SortKey>("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  useEffect(() => {
    fetch("/api/reviews")
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, []);

  const handleRowClick = (review: Review) => {
    setSelectedReview(review);
    setModalOpen(true);
  };

  const handleAction = async (id: number, action: "approve" | "disapprove" | "publish" | "unpublish") => {
    await fetch(`/api/reviews/${id}/${action}`, { method: "POST" });
    setReviews(prev =>
      prev.map(r => r.id === id ? {
        ...r,
        approved: action === "approve" ? true : action === "disapprove" ? false : r.approved,
        published: action === "publish" ? true : action === "unpublish" ? false : r.published
      } : r)
    );
    setModalOpen(false);
  };

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortOrder(prev => (prev === "asc" ? "desc" : "asc"));
    else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const filteredReviews = reviews.filter(r => {
    if (filters.date && new Date(r.date).toDateString() !== filters.date.toDateString()) return false;
    if (filters.rating && r.rating < filters.rating) return false;
    if (filters.category && !r.categories.some(c => c.category === filters.category)) return false;
    if (filters.channel && r.channel !== filters.channel) return false;
    if (filters.published && !r.published) return false;
    if (filters.approved && !r.approved) return false;
    return true;
  });

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    const aValue = a[sortKey];
    const bValue = b[sortKey];
    if (typeof aValue === "string" && typeof bValue === "string") return sortOrder === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    if (typeof aValue === "number" && typeof bValue === "number") return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
    if (typeof aValue === "boolean" && typeof bValue === "boolean") return sortOrder === "asc" ? Number(aValue) - Number(bValue) : Number(bValue) - Number(aValue);
    return 0;
  });

  const totalPages = Math.ceil(sortedReviews.length / pageSize);
  const paginatedReviews = sortedReviews.slice((page - 1) * pageSize, page * pageSize);

  const renderSortIndicator = (key: SortKey) => sortKey === key ? (sortOrder === "asc" ? " ↑" : " ↓") : " ↕";

  return (
    <div className="p-6">
      <Table className="min-w-[1000px]">
        <TableHeader>
          <TableRow>
            <TH className="cursor-pointer" onClick={() => handleSort("guestName")}>Guest{renderSortIndicator("guestName")}</TH>
            <TH className="cursor-pointer" onClick={() => handleSort("reviewText")}>Review{renderSortIndicator("reviewText")}</TH>
            <TH className="cursor-pointer" onClick={() => handleSort("listing")}>Listing{renderSortIndicator("listing")}</TH>
            <TH className="cursor-pointer" onClick={() => handleSort("date")}>Date{renderSortIndicator("date")}</TH>
            <TH className="cursor-pointer" onClick={() => handleSort("rating")}>Rating{renderSortIndicator("rating")}</TH>
            <TH className="cursor-pointer" onClick={() => handleSort("approved")}>Status{renderSortIndicator("approved")}</TH>
            <TH>Publish</TH>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedReviews.map(review => (
            <ReviewRow key={review.id} review={review} onRowClick={handleRowClick} onAction={handleAction} />
          ))}
        </TableBody>
      </Table>

      {selectedReview && (
        <ReviewDialog review={selectedReview} open={modalOpen} onClose={() => setModalOpen(false)} onAction={handleAction} />
      )}

      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Rows per page:</span>
          <Select value={String(pageSize)} onValueChange={value => { setPageSize(Number(value)); setPage(1); }}>
            <SelectTrigger className="w-[80px]"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="15">15</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" disabled={page === 1} onClick={() => setPage(p => Math.max(1, p - 1))}>Previous</Button>
          <span className="text-sm">Page {page} of {totalPages || 1}</span>
          <Button variant="outline" size="sm" disabled={page === totalPages || totalPages === 0} onClick={() => setPage(p => Math.min(totalPages, p + 1))}>Next</Button>
        </div>
      </div>
    </div>
  );
}
