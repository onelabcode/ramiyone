"use client";

import { Input } from "@components/ui/input";
import { Search, X } from "lucide-react";
import { Button } from "@components/ui/button";

export function SearchInput({ value, onChange }) {
  const handleClear = () => {
    onChange("");
  };

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10 pr-10"
        placeholder="Search articles..."
      />
      {value && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-1 top-1/2 -translate-y-1/2 hover:bg-transparent"
          onClick={handleClear}
        >
          <X className="h-4 w-4 text-gray-500" />
        </Button>
      )}
    </div>
  );
}
