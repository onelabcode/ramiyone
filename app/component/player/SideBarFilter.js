"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

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
  { code: "sd", name: "Sudan" },
  { code: "ot", name: "Other" }
];
export function SidebarFilter({
  onPositionChange,
  onTeamChange,
  onNationalityChange,
  onAgeChange,
  teams,
  positionValue,
  teamValue,
  nationalityValue,
  ageValue,
}) {
  return (
    <div className="w-64 bg-white rounded-lg shadow-sm border border-gray-100">
      <div className="p-4 space-y-4">
        <Accordion type="single" collapsible className="space-y-2">
          {/* Position Filter */}
          <AccordionItem value="position">
            <AccordionTrigger className="text-sm font-medium">Position</AccordionTrigger>
            <AccordionContent>
              <Select value={positionValue} onValueChange={onPositionChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select position" />
                </SelectTrigger>
                <SelectContent>
                  {positions.map((position) => (
                    <SelectItem key={position} value={position.toLowerCase()}>
                      {position}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </AccordionContent>
          </AccordionItem>

          {/* Team Filter */}
          <AccordionItem value="team">
            <AccordionTrigger className="text-sm font-medium">Team</AccordionTrigger>
            <AccordionContent>
              <Select value={teamValue} onValueChange={onTeamChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select team" />
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
            </AccordionContent>
          </AccordionItem>

          {/* Nationality Filter */}
          <AccordionItem value="nationality">
            <AccordionTrigger className="text-sm font-medium">Nationality</AccordionTrigger>
            <AccordionContent>
              <Select value={nationalityValue} onValueChange={onNationalityChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select nationality" />
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
            </AccordionContent>
          </AccordionItem>

          {/* Age Filter */}
          <AccordionItem value="age">
            <AccordionTrigger className="text-sm font-medium">Age</AccordionTrigger>
            <AccordionContent>
              <Select value={ageValue} onValueChange={onAgeChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select age range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Ages</SelectItem>
                  <SelectItem value="u18">Under 18</SelectItem>
                  <SelectItem value="18-21">18-21</SelectItem>
                  <SelectItem value="22-25">22-25</SelectItem>
                  <SelectItem value="25+">25+</SelectItem>
                </SelectContent>
              </Select>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Reset Button */}
        <Button
          className="w-full bg-black text-white hover:bg-gray-800"
          onClick={() => {
            onPositionChange("all");
            onTeamChange("all");
            onNationalityChange("all");
            onAgeChange("all");
          }}
        >
          Explore all
        </Button>
      </div>
    </div>
  );
}
