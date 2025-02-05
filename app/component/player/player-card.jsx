'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import usePlayerStore from '@/app/store/PlayerStore';
import { useEffect, useState } from 'react';

export function PlayerCard({ player }) {
  const {getTeamById}=usePlayerStore();
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
    <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 bg-white">
      <CardContent className="p-0">
        <div className="relative">
          <div className="absolute top-4 right-4 z-10">
          <div className="relative w-10 h-10 rounded-full bg-white shadow-md overflow-hidden transform transition-transform duration-300 group-hover:scale-110">
  {team?.image ? (
    <Image
      src={team.image}
      alt={`${team.team_name} logo`}
      fill
      className="object-cover"
    />
  ) : (
    <div className="flex items-center justify-center w-full h-full bg-gray-100">
      <span className="text-sm text-gray-500">N/A</span>
    </div>
  )}
</div>

          </div>
          <div className="relative h-72 bg-gradient-to-b from-blue-500/10 to-blue-900/90">
            <Image
              src={player.image}
              alt={player.player_id}
              fill
              className="object-cover transform group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h3 className="text-2xl font-bold mb-2 group-hover:text-blue-400 transition-colors">
              {player.player_id.slice(0,25)}
            </h3>
            <div className="flex items-center gap-4 mb-3">
              <Badge variant="secondary" className="bg-blue-500/20 text-white border-none">
                {player.position}
              </Badge>
              <div className="flex items-center gap-2">
                <Image
                  src={`https://flagcdn.com/w320/${processCountryName(player.nationality)}.png`}
                  alt={player.nationality}
                   width={20}
                  height={15}
                  className=""
                />
                <span className="text-sm text-gray-200">{player.nationality}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-300">
                Age: {player.age} • {player.team_name}
              </div>
              <Link
                href={`/players/${player.id}`}
                className="text-blue-400 hover:text-blue-300 font-medium text-sm uppercase tracking-wider"
              >
                See more →
              </Link>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}