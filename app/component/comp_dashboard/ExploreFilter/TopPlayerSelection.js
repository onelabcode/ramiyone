"use client";

import { Card, CardContent } from "@/components/ui/card";

import Image from "next/image";
import { Star } from "lucide-react";



export function TopPlayersSection({ topPlayers,handleSubmitTopPlayers }) {
 
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Top Players</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {topPlayers.map((player, index) => (
          <Card key={player.id}>
            <div className="relative h-48">
              <Image
                src={player.image}
                alt={player.player_id}
                fill
                className="object-cover rounded-t-lg"
              />
              <div className="absolute top-2 left-2 bg-yellow-400 rounded-full p-2">
                <Star className="h-4 w-4 text-white" />
              </div>
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg">{player.player_id}</h3>
              <div className="flex items-center gap-2 mt-1">
                <img
                  src={`https://flagcdn.com/24x18/${player.nationality.toLowerCase()}.png`}
                  alt={player.nationality}
                  className="w-6 h-4"
                />
                <span className="text-sm text-muted-foreground">{player.team_name}</span>
              </div>
            </CardContent>
          </Card>
        ))}
        {Array.from({ length: 3 - topPlayers.length }).map((_, index) => (
          <Card key={`empty-${index}`} className="border-dashed">
            <div className="h-48 flex items-center justify-center text-muted-foreground">
              Empty Slot
            </div>
          </Card>
        ))}
      </div>
      <div className="mt-4 flex justify-end">
        <button
         onClick={handleSubmitTopPlayers}
         disabled={topPlayers.length !== 3}
         className={`px-6 py-2 text-white font-bold rounded-lg ${topPlayers.length === 3 ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-300"}`}
        >
          Submit
        </button>
      </div>
    </div>
  );
}