"use client";

import { useState, useEffect } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

interface DateFilterProps {
  value?: Date | null;
  onChange: (date: Date | null) => void;
}

export default function DateFilter({ value, onChange }: DateFilterProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(value ?? undefined);

  useEffect(() => {
    setSelectedDate(value ?? undefined);
  }, [value]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          {selectedDate ? format(selectedDate, "yyyy-MM-dd") : "Select Date"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-2">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={(date) => {
            setSelectedDate(date ?? undefined);
            onChange(date ?? null);
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
