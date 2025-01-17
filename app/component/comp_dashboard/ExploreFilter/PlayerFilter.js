"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


const positions = [
  "All",
  "center-back",
  "winger",
  "goalkeeper",
  "midfielder",
  "forward",
  "defender",
];
const nationalities = [
  { code: "et", name: "Ethiopia" },
  { code: "ke", name: "Kenya" },
  { code: "er", name: "Eritrea" },
  { code: "dj", name: "Djibouti" },
  { code: "so", name: "Somalia" },
  { code: "ss", name: "South Sudan" },
  { code: "sd", name: "Sudan" }
];

export function PlayerFilters({
  onPositionChange,
  onTeamChange,
  onNationalityChange,
  onAgeChange,
  teams
}) {
  return (
    <div className="flex flex-wrap gap-4">
      <Select onValueChange={onPositionChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Position" />
        </SelectTrigger>
        <SelectContent>
          {positions.map((position) => (
            <SelectItem key={position} value={position.toLowerCase()}>
              {position}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select onValueChange={onTeamChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Team" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Teams</SelectItem>
          {teams.map((team) => (
            <SelectItem key={team.id} value={team.team_name}>
              {team.team_name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select onValueChange={onNationalityChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Nationality" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Nations</SelectItem>
          {nationalities.map((nationality) => (
            <SelectItem key={nationality.code} value={nationality.name}>
              <div className="flex items-center gap-2">
                <img
                  src={`https://flagcdn.com/24x18/${nationality.code}.png`}
                  alt={nationality.name}
                  className="w-6 h-4"
                />
                {nationality.name}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select onValueChange={onAgeChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Age" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Ages</SelectItem>
          <SelectItem value="u18">Under 18</SelectItem>
          <SelectItem value="18-21">18-21</SelectItem>
          <SelectItem value="22-25">22-25</SelectItem>
          <SelectItem value="25+">25+</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}