"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";

export function RoleFilter({ onRoleFilter }) {
  return (
    <Select defaultValue="all" onValueChange={onRoleFilter}>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Filter by role" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Roles</SelectItem>
        <SelectItem value="admin">Admin</SelectItem>
        <SelectItem value="player">Player</SelectItem>
        <SelectItem value="scout">Scout</SelectItem>
        <SelectItem value="coach">Coach</SelectItem>
      </SelectContent>
    </Select>
  );
}
