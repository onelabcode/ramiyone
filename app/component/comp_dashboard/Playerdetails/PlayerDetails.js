"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatItem } from "./Stats-item";

export function PlayerStatsModal({ player, onCancel }) {
  return (
    <div>
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
        <div className="w-full max-w-6xl h-[90vh] bg-card rounded-lg shadow-xl overflow-hidden relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4 z-50"
            onClick={onCancel}
          >
            <X className="h-6 w-6" />
          </Button>

          <div className="grid grid-cols-1 md:grid-cols-2 h-full">
            <div className="relative h-[300px] md:h-full">
              <img
                src={player.image}
                alt={`Player ${player.player_id}`}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <h2 className="text-4xl font-bold text-white mb-2">
                  Player Name: {player.player_id}
                </h2>
                <div className="flex items-center space-x-3">
                  <span className="px-3 py-1 bg-primary/20 text-primary-foreground rounded-full text-sm">
                    {player.position}
                  </span>
                  <span className="px-3 py-1 bg-primary/20 text-primary-foreground rounded-full text-sm">
                    {player.team_name}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-6 overflow-y-auto">
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                <a
                    href={player.youtube_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative block p-4 rounded-lg shadow-lg bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:scale-105 transform transition duration-300 ease-in-out"
                  >
                    <div className="text-center text-white">
                      <p className="text-lg font-bold">Watch on YouTube</p>
                      <p className="text-sm mt-1">
                        Click here to watch the Player's video!
                      </p>
                    </div>
                  </a>

                  <StatItem label="ID" value={player.id} />
                  <StatItem label="Age" value={`${player.age} years`} />
                  <StatItem
                    label="Nationality"
                    value={`${player.nationality}`}
                  />
                  <StatItem label="Height" value={`${player.height} cm`} />
                  <StatItem label="Weight" value={`${player.weight} kg`} />
                  <StatItem label="Coach's perspective" value={`${player.coach_perspective}/100`} />
                  <StatItem
                    label="Playing history"
                    value={`${player.playing_history}`}
                  />
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Preferred Foods</h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-muted rounded-full text-sm">
                      {player.preferred_foods}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Timeline</h3>
                  <p className="text-sm text-muted-foreground">
                    Member since:{" "}
                    {new Date(player.created_at).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Last updated:{" "}
                    {new Date(player.updated_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
