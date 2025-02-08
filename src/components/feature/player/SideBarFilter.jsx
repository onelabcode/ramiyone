"use client";

import { Label } from "@components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import { Input } from "@components/ui/input";
import { Card } from "@components/ui/card";
import { Separator } from "@components/ui/separator";
import { Button } from "@components/ui/button";
import { X } from "lucide-react";
import Image from "next/image";

const positions = {
  goalkeeper: [{ value: "gk", label: "Goalkeeper (GK)" }],
  defenders: [
    { value: "cb", label: "Center Back (CB)" },
    { value: "rb", label: "Right Back (RB)" },
    { value: "lb", label: "Left Back (LB)" },
    { value: "rwb", label: "Right Wing Back (RWB)" },
    { value: "lwb", label: "Left Wing Back (LWB)" },
  ],
  midfielders: [
    { value: "cdm", label: "Defensive Midfielder (CDM)" },
    { value: "cm", label: "Central Midfielder (CM)" },
    { value: "cam", label: "Attacking Midfielder (CAM)" },
    { value: "rm", label: "Right Midfielder (RM)" },
    { value: "lm", label: "Left Midfielder (LM)" },
  ],
  forwards: [
    { value: "rw", label: "Right Winger (RW)" },
    { value: "lw", label: "Left Winger (LW)" },
    { value: "cf", label: "Center Forward (CF)" },
    { value: "st", label: "Striker (ST)" },
  ],
};

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

export function SidebarFilter({
  onPositionChange,
  onTeamChange,
  onNationalityChange,
  onAgeRangeChange,
  teams,
  positionValue,
  teamValue,
  nationalityValue,
  ageRange,
}) {
  const handlePositionChange = (value) => {
    onPositionChange(value === "all" ? "all" : value);
  };

  const handleClearFilters = () => {
    onPositionChange("all");
    onTeamChange("all");
    onNationalityChange("all");
    onAgeRangeChange({ min: "", max: "" });
  };

  const hasActiveFilters =
    positionValue !== "all" ||
    teamValue !== "all" ||
    nationalityValue !== "all" ||
    ageRange.min !== "" ||
    ageRange.max !== "";

  return (
    <Card className="p-6 space-y-6 h-fit lg:sticky top-4 w-full md:w-80">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Filters</h2>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearFilters}
            className="h-8 px-2 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4 mr-2" />
            Clear all
          </Button>
        )}
      </div>
      <Separator className="mb-6" />

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="position">Position</Label>
          <Select value={positionValue} onValueChange={handlePositionChange}>
            <SelectTrigger id="position">
              <SelectValue placeholder="Select position" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Positions</SelectItem>
              <SelectGroup>
                <SelectLabel>Goalkeeper</SelectLabel>
                {positions.goalkeeper.map((position) => (
                  <SelectItem key={position.value} value={position.value}>
                    {position.label}
                  </SelectItem>
                ))}
              </SelectGroup>
              <SelectGroup>
                <SelectLabel>Defenders</SelectLabel>
                {positions.defenders.map((position) => (
                  <SelectItem key={position.value} value={position.value}>
                    {position.label}
                  </SelectItem>
                ))}
              </SelectGroup>
              <SelectGroup>
                <SelectLabel>Midfielders</SelectLabel>
                {positions.midfielders.map((position) => (
                  <SelectItem key={position.value} value={position.value}>
                    {position.label}
                  </SelectItem>
                ))}
              </SelectGroup>
              <SelectGroup>
                <SelectLabel>Forwards</SelectLabel>
                {positions.forwards.map((position) => (
                  <SelectItem key={position.value} value={position.value}>
                    {position.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="team">Team</Label>
          <Select
            value={teamValue}
            onValueChange={(value) => onTeamChange(value)}
          >
            <SelectTrigger id="team">
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

        <div className="space-y-2">
          <Label htmlFor="nationality">Nationality</Label>
          <Select
            value={nationalityValue}
            onValueChange={(value) => onNationalityChange(value)}
          >
            <SelectTrigger id="nationality">
              <SelectValue placeholder="Select nationality" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Nationalities</SelectItem>
              {nationalities.map((nationality) => (
                <SelectItem key={nationality.code} value={nationality.name}>
                  <div className="flex items-center gap-2">
                    <Image
                      src={`https://flagcdn.com/24x18/${nationality.code}.png`}
                      alt={nationality.name}
                      className="w-6 h-4"
                      width={24}
                      height={16}
                    />
                    <span>{nationality.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          <Label>Age Range</Label>
          <div className="flex gap-4">
            <div className="flex-1 space-y-2">
              <Label htmlFor="minAge" className="text-sm text-muted-foreground">
                Min Age
              </Label>
              <Input
                id="minAge"
                type="number"
                placeholder="Min"
                value={ageRange.min}
                onChange={(e) =>
                  onAgeRangeChange({ ...ageRange, min: e.target.value })
                }
                className="w-full"
              />
            </div>
            <div className="flex-1 space-y-2">
              <Label htmlFor="maxAge" className="text-sm text-muted-foreground">
                Max Age
              </Label>
              <Input
                id="maxAge"
                type="number"
                placeholder="Max"
                value={ageRange.max}
                onChange={(e) =>
                  onAgeRangeChange({ ...ageRange, max: e.target.value })
                }
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
