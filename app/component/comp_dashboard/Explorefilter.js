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

export default function Home() {
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [topPlayers, setTopPlayers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [positionFilter, setPositionFilter] = useState("all");
  const [teamFilter, setTeamFilter] = useState("all");
  const [nationalityFilter, setNationalityFilter] = useState("all");
  const [ageFilter, setAgeFilter] = useState("all");
  const { getAllPlayers, getTeams, teams, players } = usePlayerStore();
  const { updateTopPlayers}=useTopPlayersStore();
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

  const filteredPlayers = players.filter((player) => {
    const matchesSearch = player.player_id
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesPosition =
      positionFilter === "all" || player.position === positionFilter;
    const matchesTeam = teamFilter === "all" || player.team_name === teamFilter;
    const matchesNationality =
      nationalityFilter === "all" || player.nationality === nationalityFilter;

    let matchesAge = true;
    if (ageFilter === "u18") matchesAge = player.age < 18;
    else if (ageFilter === "18-21")
      matchesAge = player.age >= 18 && player.age <= 21;
    else if (ageFilter === "22-25")
      matchesAge = player.age >= 22 && player.age <= 25;
    else if (ageFilter === "25+") matchesAge = player.age > 25;

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
  {teams&&players?  <main className="container mx-auto py-8">
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
            onPositionChange={setPositionFilter}
            onTeamChange={setTeamFilter}
            onNationalityChange={setNationalityFilter}
            onAgeChange={setAgeFilter}
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
    :<Loading/>}
         <Toaster position="bottom-right" theme="light" />
  </>
  );
}
