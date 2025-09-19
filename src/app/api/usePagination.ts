import { useState } from "react";

export function usePagination<T>(data: T[], initialPageSize = 5) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const totalPages = Math.ceil(data.length / pageSize);

  const paginatedData = data.slice((page - 1) * pageSize, page * pageSize);

  const changePage = (newPage: number) => {
    setPage(Math.min(Math.max(1, newPage), totalPages || 1));
  };

  return {
    page,
    pageSize,
    setPage,
    setPageSize,
    totalPages,
    paginatedData,
    changePage,
  };
}
