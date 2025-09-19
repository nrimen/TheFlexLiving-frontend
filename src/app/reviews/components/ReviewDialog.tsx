"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Review } from "@/app/reviews/types/reviews";
import { Card } from "@/components/ui/card";
import CategoryRatingsTable from "./CategoryRatingsTable";
import { useState } from "react";
import CategoryRatingsChart from "./CategoryRatingsChart";
import { BarChart3, TableIcon } from "lucide-react";

interface Props {
    review: Review;
    open: boolean;
    onClose: () => void;
    onAction: (id: number, action: "approve" | "disapprove" | "publish" | "unpublish") => void;
}



export default function ReviewDialog({ review, open, onClose, onAction }: Props) {
    const [showChart, setShowChart] = useState(false)

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="w-full max-w-4xl p-6 rounded-lg bg-white shadow-lg max-h-[80vh] flex flex-col">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold text-[#284e4c]">Review Details</DialogTitle>
                </DialogHeader>

                <div className="overflow-y-auto flex-1 space-y-4 mt-2">
                    <Card className="p-4 bg-gray-50 gap-4">
                        <p><b>Guest:</b> {review.guestName}</p>
                        <p><b>Listing:</b> {review.listing}</p>
                        <p><b>Date:</b> {new Date(review.date).toLocaleString()}</p>
                        <p><b>Overall Rating:</b> {review.rating.toFixed(1)}</p>
                    </Card>

                    <Card className="p-4 bg-gray-50">
                        <p className="font-semibold mb-2">Review:</p>
                        <p className="italic text-gray-700">&quot;{review.reviewText}&quot;</p>
                    </Card>

                    <Card className="p-4 bg-gray-50">
                        <div className="flex items-center justify-between mb-2">
                            <p className="font-semibold">Category Ratings:</p>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setShowChart(!showChart)}
                                className="h-8 w-8 text-[#284e4c] hover:bg-gray-100"
                            >
                                {showChart ? <TableIcon size={18} /> : <BarChart3 size={18} />}
                            </Button>
                        </div>

                        {showChart ? (
                            <CategoryRatingsChart categories={review.categories} />
                        ) : (
                            <CategoryRatingsTable categories={review.categories} />
                        )}
                    </Card>
                </div>

                <DialogFooter className="flex flex-wrap gap-2 mt-4 justify-end">
                    <Button
                        className={"bg-white border border-[#284e4c] text-black hover:bg-gray-100"
                        }
                        onClick={() => onAction(review.id, "disapprove")}
                    >
                        Disapprove
                    </Button>
                    {!review.approved && (
                        <Button
                            className="bg-[#284e4c] text-white hover:bg-[#1f3b3a]"
                            onClick={() => onAction(review.id, "approve")}
                        >
                            Approve
                        </Button>
                    )}

                    {review.approved && !review.published && (
                        <Button
                            className="bg-[#284e4c] text-white hover:bg-[#1f3b3a]"
                            onClick={() => onAction(review.id, "publish")}
                        >
                            Publish
                        </Button>
                    )}
                    {review.approved && review.published && (
                        <Button
                            className="bg-white border border-[#284e4c] text-black hover:bg-gray-100"
                            onClick={() => onAction(review.id, "unpublish")}
                        >
                            Unpublish
                        </Button>
                    )}
                </DialogFooter>

            </DialogContent>
        </Dialog>
    );
}
