"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useRef } from "react";

const nationalities = [
  { code: "et", name: "Ethiopia" },
  { code: "ke", name: "Kenya" },
  { code: "er", name: "Eritrea" },
  { code: "dj", name: "Djibouti" },
  { code: "so", name: "Somalia" },
  { code: "ss", name: "South Sudan" },
  { code: "sd", name: "Sudan" },
  { code: "ot", name: "Other" },
];

export function PlayerFilters({
  teams,
  positions,
  onPositionChange,
  onTeamChange,
  onNationalityChange,
  onAgeRangeChange,
  onClearFilters,
  currentFilters,
}) {
  const minAgeRef = useRef(null);
  const maxAgeRef = useRef(null);

  const handleAgeChange = (type, value) => {
    const numValue = parseInt(value) || 0;
    onAgeRangeChange((prev) => ({
      ...prev,
      [type]: numValue,
    }));
  };

  const handleClear = () => {
    if (minAgeRef.current) minAgeRef.current.value = "";
    if (maxAgeRef.current) maxAgeRef.current.value = "";
    onClearFilters();
  };

  return (
    <div className="flex flex-wrap gap-4 items-end">
      <div className="w-48">
        <Select
          onValueChange={onPositionChange}
          value={currentFilters.position}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select position" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Positions</SelectItem>
            <SelectGroup>
              <SelectLabel>Goalkeepers</SelectLabel>
              {positions.goalkeeper.map((pos) => (
                <SelectItem key={pos.value} value={pos.value}>
                  {pos.label}
                </SelectItem>
              ))}
            </SelectGroup>
            <SelectGroup>
              <SelectLabel>Defenders</SelectLabel>
              {positions.defenders.map((pos) => (
                <SelectItem key={pos.value} value={pos.value}>
                  {pos.label}
                </SelectItem>
              ))}
            </SelectGroup>
            <SelectGroup>
              <SelectLabel>Midfielders</SelectLabel>
              {positions.midfielders.map((pos) => (
                <SelectItem key={pos.value} value={pos.value}>
                  {pos.label}
                </SelectItem>
              ))}
            </SelectGroup>
            <SelectGroup>
              <SelectLabel>Forwards</SelectLabel>
              {positions.forwards.map((pos) => (
                <SelectItem key={pos.value} value={pos.value}>
                  {pos.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="w-48">
        <Select onValueChange={onTeamChange} value={currentFilters.team}>
          <SelectTrigger>
            <SelectValue placeholder="Select team" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Teams</SelectItem>
            {teams?.map((team) => (
              <SelectItem key={team.id} value={team.team_name}>
                {team.team_name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="w-48 space-y-2">
        <Label htmlFor="nationality">Nationality</Label>
        <Select
          onValueChange={(value) => onNationalityChange(value)}
          value={currentFilters.nationality}
        >
          <SelectTrigger id="nationality">
            <SelectValue placeholder="Select nationality" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Nationalities</SelectItem>
            {nationalities.map((nationality) => (
              <SelectItem key={nationality.code} value={nationality.name}>
                <div className="flex items-center gap-2">
                  <img
                    src={`https://flagcdn.com/24x18/${nationality.code}.png`}
                    alt={nationality.name}
                    className="w-6 h-4 object-cover"
                  />
                  <span>{nationality.name}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex gap-2 items-center">
        <div className="w-24">
          <Label htmlFor="min-age" className="text-sm">
            Min Age
          </Label>
          <Input
            id="min-age"
            type="number"
            min="0"
            max="100"
            placeholder="Min"
            ref={minAgeRef}
            defaultValue={currentFilters.ageRange.min || ""}
            onChange={(e) => handleAgeChange("min", e.target.value)}
            className="w-full"
          />
        </div>
        <div className="w-24">
          <Label htmlFor="max-age" className="text-sm">
            Max Age
          </Label>
          <Input
            id="max-age"
            type="number"
            min="0"
            max="100"
            placeholder="Max"
            ref={maxAgeRef}
            defaultValue={currentFilters.ageRange.max || ""}
            onChange={(e) => handleAgeChange("max", e.target.value)}
            className="w-full"
          />
        </div>
      </div>

      <Button
        variant="outline"
        size="icon"
        onClick={handleClear}
        className="h-10 w-10"
        title="Clear all filters"
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
}
