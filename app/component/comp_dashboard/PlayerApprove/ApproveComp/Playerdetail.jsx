"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Calendar, Trophy, Ruler, Weight, Flag, Gauge, Timer, History, PlayIcon } from "lucide-react";

export function PlayerDetails({ player, onClose }) {

  if (!player) return null;

  const stats = [
    { icon: Calendar, label: "Birth Date", value: new Date(player.date_birth).toLocaleDateString() },
    { icon: Ruler, label: "Height", value: `${player.height} cm` },
    { icon: Weight, label: "Weight", value: `${player.weight} kg` },
    { icon: Flag, label: "Nationality", value: player.nationality },
    { icon: Trophy, label: "Position", value: player.position },
    { icon: PlayIcon, label: "Coach's perspective", value: `${player.coach_perspective}` },
    { icon: History, label: "Playing history", value: `${player.playing_history}` },
  ];

  return (
    <Dialog open={player} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Player Details</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="flex items-start gap-6">
            <img
              src={player.image}
              alt={player.player_id}
              className="w-32 h-32 object-cover rounded-lg"
            />
            <div>
              <h2 className="text-2xl font-bold">{player.player_id}</h2>
              <p className="text-muted-foreground">Suggested by {player.created_by}</p>
              <div className="mt-2">
                <Badge variant="secondary" className="capitalize">
                  {player.status}
                </Badge>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {stats.map(({ icon: Icon, label, value },index) => (
              <div key={index} className="flex items-center gap-3 p-3 rounded-lg border">
                <Icon className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">{label}</p>
                  <p className="font-medium capitalize">{value}</p>
                </div>
              </div>
            ))}
          </div>

          {player.preferred_foods && (
            <div className="space-y-2">
              <h3 className="font-semibold">Preferred Foot</h3>
              <p className="text-muted-foreground">{player.preferred_foods}</p>
            </div>
          )}

          {player.youtube_link && (
            <div className="space-y-2">
              <h3 className="font-semibold">Player Highlights</h3>
              <a
                href={player.youtube_link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Watch Highlights
              </a>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}