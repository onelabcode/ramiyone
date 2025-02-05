"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import { Progress } from "@/components/ui/progress";
import { Youtube } from "lucide-react";


export function PlayerDetails({ player, onClose }) {
  if (!player) return null;
  function processCountryName(countryName) {
    const lowerCaseName = countryName.toLowerCase();
    const words = lowerCaseName.split(" ");
    if (words.length === 1) {
      return words[0].slice(0, 2);
    } else {
      return words[0][0] + words[1][0];
    }
  }
  return (
    <Dialog open={!!player} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{player.player_id}</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-2 gap-8 mt-4">
          <div>
            <img
              src={player.image}
              alt={player.player_id}
              className="w-full h-[300px] object-cover rounded-lg"
            />
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img
                src={`https://flagcdn.com/w320/${processCountryName(
                  player.nationality
                )}.png`}
                alt={player.nationality}
                className="w-6 h-4"
              /> 
              <span>{player.nationality}</span>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Age</p>
                <p className="font-medium">{player.age} years</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Position</p>
                <p className="font-medium">{player.position}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Height</p>
                <p className="font-medium">{player.height} cm</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Weight</p>
                <p className="font-medium">{player.weight} kg</p>
              </div>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-2">Coach's perspective</p>
              <p className="font-medium">{player.coach_perspective} kg</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-2">Player's history</p>
              <p className="font-medium">{player.playing_history} kg</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Team</p>
              <p className="font-medium">{player.team_name}</p>
            </div>

            <a
              href={player.youtube_link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-red-600 hover:text-red-700"
            >
              <Youtube className="w-5 h-5" />
              Watch Highlights
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}