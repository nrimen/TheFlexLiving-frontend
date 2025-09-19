"use client";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface Props {
  value: boolean;
  onChange: (val: boolean) => void;
}

export default function PublishedFilter({ value, onChange }: Props) {
  return (
    <div className="flex items-center gap-2">
      <Switch checked={value} onCheckedChange={onChange} />
      <Label>Published</Label>
    </div>
  );
}
