"use client";

import { useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, ChevronRight } from "lucide-react";
import Image from "next/image";
import { PlayerStats } from "./PlayerStats";

export function TopSearchedPlayerCard({ player, onVote }) {
  const [showStats, setShowStats] = useState(false);

  return (
    <>
      <Card className="overflow-hidden transition-all hover:shadow-lg cursor-pointer group">
        <div
          className="relative h-48 w-full"
          onClick={() => setShowStats(true)}
        >
          <Image
            src={player.image}
            alt={player.player_id}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Button variant="secondary" className="bg-white/90">
              View Stats <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
        <CardContent className="p-4">
          <h3 className="text-xl font-bold text-gray-900">
            {player.player_id}
          </h3>
          <div className="flex items-center space-x-2 mb-4">
            <p className="text-sm text-gray-600">{player.position}</p>
            <span className="text-gray-300">•</span>
            <p className="text-sm text-gray-600">{player.team_name}</p>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">
              {player.votes} likes
            </span>
            <Button
              onClick={() => onVote(player.id)}
              variant="outline"
              className="group hover:bg-pink-50"
            >
              <Heart className="mr-2 h-4 w-4 group-hover:text-pink-500" />
              Vote
            </Button>
          </div>
        </CardContent>
      </Card>

      <PlayerStats
        player={player}
        isOpen={showStats}
        onClose={() => setShowStats(false)}
      />
    </>
  );
}
