"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { PlayerDetails } from "./Playerdetail";
import useProfileStore from "@app/store/coachAndScout";

export function PlayerTable({ players, onStatusChange, onDelete }) {
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [coachNames, setCoachNames] = useState({});
  const { fetchScoutById } = useProfileStore();

  useEffect(() => {
    const fetchCoachNames = async () => {
      const coachNameMap = {};
      for (const player of players) {
        if (player.created_by && !coachNameMap[player.created_by]) {
          try {
            const coach = await fetchScoutById(player.created_by);
            coachNameMap[player.created_by] = coach?.name || "Unknown";
          } catch (error) {
            console.error(
              `Error fetching coach for ID ${player.created_by}:`,
              error
            );
            coachNameMap[player.created_by] = "Unknown";
          }
        }
      }
      setCoachNames(coachNameMap);
    };

    fetchCoachNames();
  }, [players, fetchScoutById]);

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500/15 text-yellow-600";
      case "approved":
        return "bg-green-500/15 text-green-600";
      case "declined":
        return "bg-red-500/15 text-red-600";
      default:
        return "";
    }
  };

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Player</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Nationality</TableHead>
              <TableHead>Coach</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {players.map((player) => (
              <TableRow
                key={player.id}
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => setSelectedPlayer(player)}
              >
                <TableCell className="font-medium">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={player.image} alt={player.player_id} />
                      <AvatarFallback>
                        {player.player_id.slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold">{player.player_id}</div>
                      <div className="text-sm text-muted-foreground">
                        Age: {player.age}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="capitalize">{player.position}</TableCell>
                <TableCell>{player.nationality}</TableCell>
                <TableCell>
                  {coachNames[player.created_by] || "Loading..."}
                </TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className={getStatusColor(player.status)}
                  >
                    {player.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div
                    className="flex gap-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {player.status === "pending" ? (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-green-500/15 text-green-600 hover:bg-green-500/25"
                          onClick={() => onStatusChange(player.id, "approved")}
                        >
                          Accept
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-red-500/15 text-red-600 hover:bg-red-500/25"
                          onClick={() => onStatusChange(player.id, "declined")}
                        >
                          Decline
                        </Button>
                      </>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-red-500/15 text-red-600 hover:bg-red-500/25"
                        onClick={() => onDelete(player.id)}
                      >
                        Delete
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <PlayerDetails
        player={selectedPlayer}
        onClose={() => setSelectedPlayer(null)}
      />
    </>
  );
}
