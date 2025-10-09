import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

interface OtherDropdownProps {
  selected: boolean;
  onToggle: () => void;
  value: { dropdown: string; text: string };
  onChange: (value: { dropdown: string; text: string }) => void;
  options: string[];
  label?: string;
  className?: string;
}

export function OtherDropdown({
  selected,
  onToggle,
  value,
  onChange,
  options,
  label = "Other",
  className = ""
}: OtherDropdownProps) {
  const [showFreeText, setShowFreeText] = useState(false);

  const handleDropdownChange = (val: string) => {
    onChange({ ...value, dropdown: val });
    setShowFreeText(val === "other_not_listed");
  };

  return (
    <div className={className}>
      <div className="flex items-center gap-2">
        <Checkbox
          id="other"
          checked={selected}
          onCheckedChange={onToggle}
        />
        <Label htmlFor="other" className="cursor-pointer">
          <Badge variant={selected ? "default" : "outline"} className="cursor-pointer">
            {label}
          </Badge>
        </Label>
      </div>

      {selected && (
        <div className="mt-3 space-y-3 pl-6 border-l-2 border-muted">
          <div>
            <Label className="text-xs">Select or describe</Label>
            <select
              className="w-full mt-1 p-2 border rounded-md text-sm"
              value={value.dropdown}
              onChange={(e) => handleDropdownChange(e.target.value)}
            >
              <option value="">Choose one...</option>
              {options.map(opt => (
                <option key={opt} value={opt.toLowerCase().replace(/\s+/g, '_')}>
                  {opt}
                </option>
              ))}
              <option value="other_not_listed">Other (not listed)</option>
            </select>
          </div>

          {(showFreeText || value.dropdown === "other_not_listed") && (
            <div>
              <Label htmlFor="freeText" className="text-xs">Something else</Label>
              <Input
                id="freeText"
                value={value.text}
                onChange={(e) => onChange({ ...value, text: e.target.value })}
                placeholder="Please describe..."
                className="mt-1"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
