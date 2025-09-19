"use client";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableHeader,
  TableRow,
  TableHead as TH,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SortOrder = "asc" | "desc";

interface Column<T> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  render?: (row: T) => React.ReactNode;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  initialSortKey?: keyof T;
  initialSortOrder?: SortOrder;
  pageSizeOptions?: number[];
}

export function DataTable<T>({
  data,
  columns,
  initialSortKey,
  initialSortOrder = "asc",
  pageSizeOptions = [5, 10, 15],
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<keyof T | undefined>(
    initialSortKey
  );
  const [sortOrder, setSortOrder] = useState<SortOrder>(initialSortOrder);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(pageSizeOptions[0]);

  const handleSort = (key: keyof T) => {
    if (sortKey === key) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const sortedData = sortKey
    ? [...data].sort((a, b) => {
        const aValue = a[sortKey];
        const bValue = b[sortKey];
        if (typeof aValue === "string" && typeof bValue === "string")
          return sortOrder === "asc"
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        if (typeof aValue === "number" && typeof bValue === "number")
          return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
        if (typeof aValue === "boolean" && typeof bValue === "boolean")
          return sortOrder === "asc"
            ? Number(aValue) - Number(bValue)
            : Number(bValue) - Number(aValue);
        return 0;
      })
    : data;

  const totalPages = Math.ceil(sortedData.length / pageSize);
  const paginatedData = sortedData.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  const renderSortIndicator = (key: keyof T) =>
    sortKey === key ? (sortOrder === "asc" ? " ↑" : " ↓") : " ↕";

  return (
    <div className="p-6">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((col) => (
              <TH
                key={String(col.key)}
                className={col.sortable ? "cursor-pointer" : ""}
                onClick={() => col.sortable && handleSort(col.key)}
              >
                {col.label}
                {col.sortable && renderSortIndicator(col.key)}
              </TH>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedData.map((row, i) => (
            <TableRow key={i}>
              {columns.map((col) => (
                <td key={String(col.key)} className="px-4 py-2">
                  {col.render ? col.render(row) : (row[col.key] as any)}
                </td>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Rows per page:</span>
          <Select
            value={String(pageSize)}
            onValueChange={(value) => {
              setPageSize(Number(value));
              setPage(1);
            }}
          >
            <SelectTrigger className="w-[80px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {pageSizeOptions.map((size) => (
                <SelectItem key={size} value={String(size)}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            Previous
          </Button>
          <span className="text-sm">
            Page {page} of {totalPages || 1}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={page === totalPages || totalPages === 0}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
