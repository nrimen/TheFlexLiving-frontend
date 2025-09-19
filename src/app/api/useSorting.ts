import { useState } from "react";

export type SortOrder = "asc" | "desc";

export function useSorting<T>(defaultKey: keyof T, defaultOrder: SortOrder = "asc") {
  const [sortKey, setSortKey] = useState<keyof T>(defaultKey);
  const [sortOrder, setSortOrder] = useState<SortOrder>(defaultOrder);

  const handleSort = (key: keyof T) => {
    if (sortKey === key) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const sortData = (data: T[]) => {
    return [...data].sort((a, b) => {
      const aValue = a[sortKey];
      const bValue = b[sortKey];

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortOrder === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
      }
      if (typeof aValue === "boolean" && typeof bValue === "boolean") {
        return sortOrder === "asc"
          ? Number(aValue) - Number(bValue)
          : Number(bValue) - Number(aValue);
      }
      return 0;
    });
  };

  const renderSortIndicator = (key: keyof T) =>
    sortKey === key ? (sortOrder === "asc" ? " ↑" : " ↓") : " ↕";

  return { sortKey, sortOrder, handleSort, sortData, renderSortIndicator };
}
