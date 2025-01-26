"use client";

import { useEffect, useState } from "react";
import { TopPlayersSection } from "./ExploreFilter/TopPlayerSelection";
import { PlayerFilters } from "./ExploreFilter/PlayerFilter";
import { PlayerSearch } from "./ExploreFilter/PlayerSearch";
import { PlayerTable } from "./ExploreFilter/PlayerTable";
import { PlayerDetails } from "./ExploreFilter/PlayerDetail";
import usePlayerStore from "@/app/store/PlayerStore";
import Loading from "../Loading";
import useTopPlayersStore from "@/app/store/VoteState";
import { toast, Toaster } from "sonner";

const positions = {
  goalkeeper: [
    { value: "gk", label: "Goalkeeper (GK)" },
  ],
  defenders: [
    { value: "cb", label: "Center Back (CB)" },
    { value: "rb", label: "Right Back (RB)" },
    { value: "lb", label: "Left Back (LB)" },
    { value: "rwb", label: "Right Wing Back (RWB)" },
    { value: "lwb", label: "Left Wing Back (LWB)" },
  ],
  midfielders: [
    { value: "cdm", label: "Defensive Midfielder (CDM)" },
    { value: "cm", label: "Central Midfielder (CM)" },
    { value: "cam", label: "Attacking Midfielder (CAM)" },
    { value: "rm", label: "Right Midfielder (RM)" },
    { value: "lm", label: "Left Midfielder (LM)" },
  ],
  forwards: [
    { value: "rw", label: "Right Winger (RW)" },
    { value: "lw", label: "Left Winger (LW)" },
    { value: "cf", label: "Center Forward (CF)" },
    { value: "st", label: "Striker (ST)" },
  ],
};

export default function Home() {
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [topPlayers, setTopPlayers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [positionFilter, setPositionFilter] = useState("all");
  const [teamFilter, setTeamFilter] = useState("all");
  const [nationalityFilter, setNationalityFilter] = useState("all");
  const [ageRange, setAgeRange] = useState({ min: 0, max: 100 });
  const { getAllPlayers, getTeams, teams, players } = usePlayerStore();
  const { updateTopPlayers } = useTopPlayersStore();

  useEffect(() => {
    getAllPlayers();
    getTeams();
  }, []);

  const handleSubmitTopPlayers = () => {
    if (topPlayers.length === 3) {
      const playerIds = topPlayers.map((player) => player.id);
      updateTopPlayers(playerIds);
      setTopPlayers([]);
    } else {
      toast.alert("Please select exactly 3 players.");
    }
  };

  const handleToggleTopPlayer = (player) => {
    setTopPlayers((current) => {
      if (current.find((p) => p.id === player.id)) {
        return current.filter((p) => p.id !== player.id);
      }
      if (current.length >= 3) {
        return current;
      }
      return [...current, player];
    });
  };

  const isTopPlayer = (player) => {
    return topPlayers.some((p) => p.id === player.id);
  };

  const checkPositionMatch = (playerPosition, filterPosition) => {
    if (filterPosition === "all") return true;
    
    // Split player's positions by '/'
    const playerPositions = playerPosition.toLowerCase().split('/');
    return playerPositions.includes(filterPosition.toLowerCase());
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setPositionFilter("all");
    setTeamFilter("all");
    setNationalityFilter("all");
    setAgeRange({ min: 0, max: 100 });
  };

  const filteredPlayers = players.filter((player) => {
    const matchesSearch = player.player_id
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesPosition = checkPositionMatch(player.position, positionFilter);
    const matchesTeam = teamFilter === "all" || player.team_name === teamFilter;
    const matchesNationality =
      nationalityFilter === "all" || player.nationality === nationalityFilter;
    const matchesAge = 
      (!ageRange.min || player.age >= ageRange.min) && 
      (!ageRange.max || player.age <= ageRange.max);

    return (
      matchesSearch &&
      matchesPosition &&
      matchesTeam &&
      matchesNationality &&
      matchesAge
    );
  });

  return (
    <>
      {teams && players ? (
        <main className="container mx-auto py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Player Database</h1>
            <p className="text-muted-foreground">Overview clubs and players</p>
          </div>

          <TopPlayersSection
            topPlayers={topPlayers}
            handleSubmitTopPlayers={handleSubmitTopPlayers}
          />

          <div className="flex flex-col gap-6 mb-8">
            <div className="flex flex-wrap gap-4 items-center justify-between">
              <PlayerFilters
                teams={teams}
                positions={positions}
                onPositionChange={setPositionFilter}
                onTeamChange={setTeamFilter}
                onNationalityChange={setNationalityFilter}
                onAgeRangeChange={setAgeRange}
                onClearFilters={handleClearFilters}
                currentFilters={{
                  position: positionFilter,
                  team: teamFilter,
                  nationality: nationalityFilter,
                  ageRange: ageRange,
                }}
              />
              <PlayerSearch onSearch={setSearchQuery} />
            </div>
          </div>

          <PlayerTable
            players={filteredPlayers}
            onPlayerClick={setSelectedPlayer}
            onToggleTopPlayer={handleToggleTopPlayer}
            isTopPlayer={isTopPlayer}
          />

          <PlayerDetails
            player={selectedPlayer}
            onClose={() => setSelectedPlayer(null)}
          />
        </main>
      ) : (
        <Loading />
      )}
      <Toaster position="bottom-right" theme="light" />
    </>
  );
}