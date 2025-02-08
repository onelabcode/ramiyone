"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";

export function PlayerCard({ player, onClick }) {
  return (
    <Card
      className="cursor-pointer hover:shadow-lg transition-shadow"
      onClick={onClick}
    >
      <CardHeader className="relative h-48">
        <Image
          src={player.image}
          alt={`${player.player_id}'s photo`}
          fill
          className="object-cover rounded-t-lg"
        />
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-lg">{player.player_id}</h3>
            <div className="flex items-center gap-2 mt-1">
              <Image
                src={`https://flagcdn.com/24x18/${player.nationality.toLowerCase()}.png`}
                alt={player.nationality}
                className="w-6 h-4"
                width={24}
                height={18}
              />
              <span className="text-sm text-muted-foreground">
                {player.nationality}
              </span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium">{player.position}</p>
            <p className="text-sm text-muted-foreground">Age: {player.age}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
