"use client";

import { useEffect, useState } from "react";

import { SidebarFilter } from "@/app/component/player/SideBarFilter";
import { SearchBar } from "@/app/component/player/SideBar";
import { PlayerCard } from "@/app/component/player/player-card";
import usePlayerStore from "@/app/store/PlayerStore";
import Loading from "@/app/component/Loading";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

export default function Home() {
  const { players, getAllPlayers, getTeams, teams } = usePlayerStore();

  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [visiblePlayers, setVisiblePlayers] = useState([]);
  const [itemsToShow, setItemsToShow] = useState(10);
  const [positionFilter, setPositionFilter] = useState("all");
  const [teamFilter, setTeamFilter] = useState("all");
  const [nationalityFilter, setNationalityFilter] = useState("all");
  const [ageFilter, setAgeFilter] = useState("all");

  useEffect(() => {
    getAllPlayers();
    getTeams();
  }, []);

  useEffect(() => {
    if (players) {
      setFilteredPlayers(players);
      setVisiblePlayers(players.slice(0, itemsToShow));
    }
  }, [players, itemsToShow]);
  const handleFilter = (type, value) => {
    switch (type) {
      case "position":
        setPositionFilter(value);
        break;
      case "team":
        setTeamFilter(value);
        break;
      case "nationality":
        setNationalityFilter(value);
        break;
      case "age":
        setAgeFilter(value);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    let filtered = players;

    if (positionFilter !== "all") {
      filtered = filtered.filter(
        (player) => player.position === positionFilter
      );
    }

    // Apply team filter
    if (teamFilter !== "all") {
      filtered = filtered.filter((player) => player.team_name === teamFilter);
    }

    // Apply nationality filter
    if (nationalityFilter !== "all") {
      filtered = filtered.filter(
        (player) => player.nationality === nationalityFilter
      );
    }

    // Apply age filter
    if (ageFilter !== "all") {
      switch (ageFilter) {
        case "u18":
          filtered = filtered.filter((player) => player.age < 18);
          break;
        case "18-21":
          filtered = filtered.filter(
            (player) => player.age >= 18 && player.age <= 21
          );
          break;
        case "22-25":
          filtered = filtered.filter(
            (player) => player.age >= 22 && player.age <= 25
          );
          break;
        case "25+":
          filtered = filtered.filter((player) => player.age > 25);
          break;
      }
    }

    setFilteredPlayers(filtered);
    setVisiblePlayers(filtered.slice(0, itemsToShow));
  }, [
    players,
    positionFilter,
    teamFilter,
    nationalityFilter,
    ageFilter,
    itemsToShow,
  ]);

  if (!players) {
    return <Loading />;
  }

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = players.filter((player) =>
      player.player_id.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredPlayers(filtered);
    setVisiblePlayers(filtered.slice(0, itemsToShow));
  };

  const loadMorePlayers = () => {
    if (itemsToShow < filteredPlayers.length) {
      setItemsToShow((prev) => prev + 10);
    }
  };

  return (
    <div className="min-h-screen w-full">
      <div className="flex flex-col space-y-3 mx-auto items-center text-center max-w-3xl mt-5">
        <h1 className="text-3xl sm:text-3xl md:text-5xl font-bold font-mono tracking-wide text-gray-900">
          Explore Players
        </h1>
        <p className="w-full sm:w-2/3 text-gray-600 text-base md:text-base text-sm">
  Dive into the world of football talent with advanced filters and powerful search tools to help you find the perfect player that matches your criteria.
</p>

      </div>
      <div className="container py-8 px-4 max-w-full">
        <h1 className="text-3xl font-bold mb-8">Filter</h1>
        <div className="flex gap-8 max-md:flex-col">
          <SidebarFilter
            onPositionChange={setPositionFilter}
            onTeamChange={setTeamFilter}
            onNationalityChange={setNationalityFilter}
            onAgeChange={setAgeFilter}
            teams={teams}
            positionValue={positionFilter}
            teamValue={teamFilter}
            nationalityValue={nationalityFilter}
            ageValue={ageFilter}
          />
    
          <div className="flex-1">
            <SearchBar onSearch={handleSearch} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {visiblePlayers.map((player) => (
                <PlayerCard key={player.id} player={player} />
              ))}
            </div>
            {visiblePlayers.length < filteredPlayers.length && (
              <div className="text-center mt-6">
                <Button
                  variant="outline"
                  onClick={loadMorePlayers}
                  className="group gap-2"
                >
                  Load More
                  <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
