"use client";

import { Button } from "@components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@components/ui/table";
import { Star } from "lucide-react";
import Image from "next/image";

function processCountryName(countryName) {
  const lowerCaseName = countryName.toLowerCase();
  const words = lowerCaseName.split(" ");
  if (words.length === 1) {
    return words[0].slice(0, 2);
  } else {
    return words[0][0] + words[1][0];
  }
}
export function PlayerTable({
  players,
  onPlayerClick,
  onToggleTopPlayer,
  isTopPlayer,
}) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Player Name</TableHead>
            <TableHead>Nationality</TableHead>
            <TableHead>Club</TableHead>
            <TableHead>Position</TableHead>
            <TableHead>Age</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {players.map((player) => (
            <TableRow key={player.id}>
              <TableCell
                className="font-medium cursor-pointer hover:text-blue-600"
                onClick={() => onPlayerClick(player)}
              >
                {player.player_id}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Image
                    alt=""
                    src={`https://flagcdn.com/w320/${processCountryName(
                      player.nationality
                    )}.png`}
                    className="w-6 h-4"
                    width={24}
                    height={18}
                  />
                  {player.nationality}
                </div>
              </TableCell>
              <TableCell>{player.team_name}</TableCell>
              <TableCell>{player.position}</TableCell>
              <TableCell>{player.age}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="ghost"
                    className={
                      isTopPlayer(player) ? "text-yellow-600" : "text-gray-600"
                    }
                    onClick={() => onToggleTopPlayer(player)}
                  >
                    <Star className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
