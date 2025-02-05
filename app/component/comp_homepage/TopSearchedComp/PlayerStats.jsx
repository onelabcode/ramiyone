"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Trophy, Goal, Clock, Users, Target, Star } from "lucide-react";
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

export function PlayerStats({ player, isOpen, onClose }) {
  const StatItem = ({
    icon: Icon,
    label,
    value,
    showProgress = false,
    max = 100,
  }) => (
    <div className="flex items-center space-x-4 mb-4">
      <div className="bg-blue-50 p-2 rounded-lg">
        <Icon className="h-5 w-5 text-blue-500" />
      </div>
      <div className="flex-1">
        <div className="flex justify-between mb-1">
          <span className="text-sm text-gray-600">{label}</span>
          <span className="text-sm font-medium">{value}</span>
        </div>
        {showProgress && (
          <Progress value={(value / max) * 100} className="h-2" />
        )}
      </div>
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] max-h-[90vh] flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="text-2xl font-bold">
            {player.player_id}
          </DialogTitle>
        </DialogHeader>
        
        <div className="overflow-y-auto flex-1 pr-2">
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-3 rounded-lg">
                <span className="text-sm text-gray-600">Team</span>
                <p className="font-medium truncate">{player.team_name}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <span className="text-sm text-gray-600">Nationality</span>
                <div className="flex items-center gap-2">
                  <Image
                    src={`https://flagcdn.com/w320/${processCountryName(
                      player.nationality
                    )}.png`}
                    alt={player.nationality}
                    width={20}
                    height={15}
                  />
                  <span className="font-medium truncate">
                    {player.nationality}
                  </span>
                </div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <span className="text-sm text-gray-600">Age</span>
                <p className="font-medium">{player.age}</p>
              </div>
            </div>

            <div className="space-y-4">
              <StatItem icon={Goal} label="Position" value={player.position} />
              <StatItem
                icon={Trophy}
                label="Height"
                value={`${player.height} cm`}
              />
              <StatItem
                icon={Users}
                label="Weight"
                value={`${player.weight} kg`}
              />
              <StatItem
                icon={Clock}
                label="Preferred Foot"
                value={player.preferred_foods}
              />
              <StatItem
                icon={Star}
                label="Playing History"
                value={player.playing_history}
                showProgress
                max={100}
              />
              <StatItem
                icon={Target}
                label="Coach's Perspective"
                value={player.coach_perspective}
                showProgress
                max={100}
              />
            </div>

            {player.youtube_link && (
              <div className="pt-4">
                <span className="text-sm text-gray-600">Highlight Video</span>
                <a
                  href={player.youtube_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline block mt-1"
                >
                  Watch on YouTube
                </a>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}