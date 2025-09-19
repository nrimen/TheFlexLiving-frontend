"use client";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

interface Props {
  value: number;
  onChange: (val: number) => void;
}

export default function RatingFilter({ value, onChange }: Props) {
  return (
    <div className="flex flex-col gap-1">
      <Label className="mb-2">Rating</Label>
      <Slider
        defaultValue={[value]}
        max={10}
        min={1}
        step={1}
        onValueChange={(val) => onChange(val[0])}
      />
      <span className="text-sm text-muted-foreground">{value} ★</span>
    </div>
  );
}
