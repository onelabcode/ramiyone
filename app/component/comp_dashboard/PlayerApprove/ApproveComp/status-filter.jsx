"use client";

import { Button } from "@/components/ui/button";



export function StatusFilter({ currentStatus, onStatusChange, counts }) {
  const statuses = ["all", "pending", "approved", "declined"];

  return (
    <div className="flex flex-wrap gap-2">
      {statuses.map((status) => (
        <Button
          key={status}
          variant={currentStatus === status ? "default" : "outline"}
          size="sm"
          onClick={() => onStatusChange(status)}
          className="capitalize"
        >
          {status} ({counts[status]})
        </Button>
      ))}
    </div>
  );
}