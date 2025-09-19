"use client";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface Props {
  value: string;
  onChange: (val: string) => void;
  channels: string[];
}

export default function ChannelFilter({ value, onChange, channels }: Props) {
  return (
    <div className="flex flex-col gap-1">
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder="Choose channel" />
        </SelectTrigger>
        <SelectContent>
          {channels.map((ch) => (
            <SelectItem key={ch} value={ch}>
              {ch}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
