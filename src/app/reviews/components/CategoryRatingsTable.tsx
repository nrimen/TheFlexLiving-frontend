"use client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface CategoryRating {
    category: string;
    rating: number;
}

interface Props {
    categories: CategoryRating[];
}

export default function CategoryRatingsTable({ categories }: Props) {
    return (
        <Table className="w-full">
            <TableHeader>
                <TableRow>
                    <TableHead>Category</TableHead>
                    <TableHead>Rating</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {categories.map((c) => (
                    <TableRow key={c.category}>
                        <TableCell className="capitalize">{c.category.replace("_", " ")}</TableCell>
                        <TableCell>{c.rating}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
