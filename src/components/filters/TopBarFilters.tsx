"use client";

import DateFilter from "./DateFilter";
import RatingFilter from "./RatingFilter";
import ChannelFilter from "./ChannelFilter";
import PublishedFilter from "./PublishedFilter";
import ApprovedFilter from "./ApprovedFilter";
import { Button } from "../ui/button";

interface Props {
  filters: {
    date?: Date;
    rating?: number;
    category?: string;
    channel?: string;
    published?: boolean;
    approved?: boolean;
  };
  setFilters: (filters: Partial<Props["filters"]>) => void;
}

export default function TopbarFilters({ filters, setFilters }: Props) {
    const handleReset = () => {
    setFilters({
      date: undefined,
      rating: undefined,
      category: undefined,
      channel: undefined,
      published: undefined,
      approved: undefined,
    });
  };
  return (
    <div className="w-full p-4 grid grid-cols-6 gap-4">
      <DateFilter
        value={filters.date}
        onChange={(date) => setFilters({ date: date ?? undefined })}
      />
      <RatingFilter
        value={filters.rating ?? 0}
        onChange={(rating) => setFilters({ rating })}
      />
      
      <ChannelFilter
        value={filters.channel ?? ""}
        onChange={(channel) => setFilters({ channel })}
        channels={["Hostaway"]}
      />
      <PublishedFilter
        value={filters.published ?? true}
        onChange={(published) => setFilters({ published })}
      />
      <ApprovedFilter
        value={filters.approved ?? true}
        onChange={(approved) => setFilters({ approved })}
      />
       <Button
        variant="outline"
        onClick={handleReset}
        className="col-span-1 justify-self-end"
      >
        Refresh
      </Button>
    </div>
  );
}
