import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { Review } from "@/app/reviews/types/reviews";
import { Badge } from "@/components/ui/badge";

interface Props {
    review: Review;
    onRowClick: (review: Review) => void;
    onAction: (id: number, action: "approve" | "disapprove" | "publish" | "unpublish") => void;
}
export default function ReviewRow({ review, onRowClick, onAction }: Props) {
    return (
        <TableRow
            key={review.id}
            className="cursor-pointer hover:bg-gray-100 transition-colors duration-200"
            onClick={() => onRowClick(review)}
        >
            <TableCell>{review.guestName}</TableCell>
            <TableCell className="max-w-md truncate">{review.reviewText}</TableCell>
            <TableCell>{review.listing}</TableCell>
            <TableCell>{new Date(review.date).toLocaleDateString()}</TableCell>
            <TableCell>{review.rating.toFixed(1)}</TableCell>
            <TableCell className=" justify-center">
                {review.approved ? (
                    <Badge className="bg-[#284e4c] text-white">
                        Approved
                    </Badge>
                ) : (
                    <Badge className="bg-white text-red-600">
                        Disapproved
                    </Badge>
                )}
            </TableCell>
            <TableCell>
                {review.approved && !review.published && (
                    <Button
                        size="sm"
                        onClick={(e) => { e.stopPropagation(); onAction(review.id, "publish"); }}
                    >
                        Publish
                    </Button>
                )}
                {review.approved && review.published && (
                    <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => { e.stopPropagation(); onAction(review.id, "unpublish"); }}
                    >
                        Unpublish
                    </Button>
                )}
            </TableCell>
        </TableRow>
    );
}