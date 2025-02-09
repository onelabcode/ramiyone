"use client";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { User, Flag, Ruler, Weight, Footprints, History } from "lucide-react";
import usePlayerStore from "services/PlayerStore";
import { useEffect, useState } from "react";
import { FaYoutube } from "react-icons/fa";
import { MdSportsSoccer } from "react-icons/md";
import Image from "next/image";
export function PlayerStats({ player }) {
  const { getTeamById } = usePlayerStore();
  const [team, setTeam] = useState(null);
  useEffect(() => {
    async function fetchTeam() {
      const teamData = await getTeamById(player.team_name);
      setTeam(teamData);
    }
    fetchTeam();
  }, [player.team_name]);

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
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2">{player.player_id}</h1>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Image
                src={`https://flagcdn.com/w320/${processCountryName(
                  player.nationality
                )}.png`}
                alt={player.nationality}
                className="w-6 h-4 rounded shadow-sm"
                width={24}
                height={16}
              />
              <span className="text-muted-foreground">
                {player.nationality}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              {team?.image ? (
                <Image
                  src={team.image}
                  alt={team.team_name}
                  className="w-6 h-6 rounded-full"
                  width={24}
                  height={24}
                />
              ) : (
                <div className="w-8 h-8 bg-gray-200 rounded-full" />
              )}
              <span className="text-muted-foreground">{player.team_name}</span>
            </div>
          </div>
        </div>
        <Badge variant="secondary" className="text-lg px-4 py-1">
          Talented
        </Badge>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <Card className="p-4 bg-primary/5">
          <div className="flex items-center space-x-3">
            <User className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Age</p>
              <p className="text-lg font-semibold">{player.age} years</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-primary/5">
          <div className="flex items-center space-x-3">
            <Flag className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Position</p>
              <p className="text-lg font-semibold">{player.position}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-primary/5">
          <div className="flex items-center space-x-3">
            <Footprints className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Preferred Foot</p>
              <p className="text-lg font-semibold">{player.preferred_foods}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-primary/5">
          <div className="flex items-center space-x-3">
            <Weight className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Weight</p>
              <p className="text-lg font-semibold">{player.weight}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-primary/5">
          <div className="flex items-center space-x-3">
            <Ruler className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Height</p>
              <p className="text-lg font-semibold">{player.height}</p>
            </div>
          </div>
        </Card>

        <a
          href={player.youtube_link}
          target="_blank"
          rel="noopener noreferrer"
          className="block transform transition hover:scale-105 hover:shadow-xl"
        >
          <Card className="p-4 bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 rounded-lg shadow-lg">
            <div className="flex items-center space-x-4">
              <div className="p-2 rounded-full bg-white shadow-md">
                <FaYoutube className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <span className="text-lg text-white font-semibold">
                  Player Highlights
                </span>
              </div>
            </div>
          </Card>
        </a>
      </div>
      <div className="flex flex-col space-y-2">
        <Card className="p-4 bg-primary/5">
          <div className="flex items-start space-x-3">
            <MdSportsSoccer className="h-5 w-5 text-primary mt-1" />
            <div>
              <p className="text-sm text-muted-foreground">
                Coach&apos;s Perspective
              </p>
              <p className="text-base text-muted-foreground italic">
                {player.coach_perspective ||
                  "No insights provided by the coach at this time."}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-primary/5">
          <div className="flex items-start space-x-3">
            <History className="h-5 w-5 text-primary mt-1" />
            <div>
              <p className="text-sm text-muted-foreground">Player History</p>
              <p className="text-base text-muted-foreground italic">
                {player.playing_history ||
                  "No playing history available for this player."}
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
