"use client";

import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Star } from "lucide-react";

export function TopPlayersSection({ topPlayer, handleSubmitTopPlayer }) {
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
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Top Player</h2>
      <div className="grid grid-cols-1 gap-6">
        {topPlayer ? (
          <Card key={topPlayer.id}>
            <div className="relative h-48">
              <Image
                src={topPlayer.image}
                alt={topPlayer.player_id}
                fill
                className="object-cover rounded-t-lg"
              />
              <div className="absolute top-2 left-2 bg-yellow-400 rounded-full p-2">
                <Star className="h-4 w-4 text-white" />
              </div>
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg">{topPlayer.player_id}</h3>
              <div className="flex items-center gap-2 mt-1">
                <img
                  src={`https://flagcdn.com/w320/${processCountryName(
                    topPlayer.nationality
                  )}.png`}
                  alt={topPlayer.nationality}
                  className="w-6 h-4"
                />
                <span className="text-sm text-muted-foreground">
                  {topPlayer.team_name}
                </span>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="border-dashed">
            <div className="h-48 flex items-center justify-center text-muted-foreground">
              Empty Slot
            </div>
          </Card>
        )}
      </div>
      <div className="mt-4 flex justify-end">
        <button
          onClick={handleSubmitTopPlayer}
          disabled={!topPlayer}
          className={`px-6 py-2 text-white font-bold rounded-lg ${
            topPlayer ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-300"
          }`}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
