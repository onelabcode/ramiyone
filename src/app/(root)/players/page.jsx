"use client";

import { useEffect, useState } from "react";
import { SidebarFilter } from "@app/component/player/SideBarFilter";
import { SearchBar } from "@app/component/player/SideBar";
import { PlayerCard } from "@app/component/player/player-card";
import usePlayerStore from "@app/store/PlayerStore";
import Loading from "@app/component/Loading";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Home() {
  const { players, getAllPlayers, getTeams, teams } = usePlayerStore();

  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [positionFilter, setPositionFilter] = useState("all");
  const [teamFilter, setTeamFilter] = useState("all");
  const [nationalityFilter, setNationalityFilter] = useState("all");
  const [ageRange, setAgeRange] = useState({ min: "", max: "" });

  const ITEMS_PER_PAGE = 9;
  const totalPages = Math.ceil(filteredPlayers.length / ITEMS_PER_PAGE);

  useEffect(() => {
    getAllPlayers();
    getTeams();
  }, []);

  useEffect(() => {
    if (players) {
      setFilteredPlayers(players);
    }
  }, [players]);

  useEffect(() => {
    let filtered = players;

    if (positionFilter !== "all") {
      filtered = filtered.filter((player) => {
        const playerPositions = player.position.toLowerCase().split("/");
        return playerPositions.includes(positionFilter.toLowerCase());
      });
    }

    if (teamFilter !== "all") {
      filtered = filtered.filter((player) => player.team_name === teamFilter);
    }

    if (nationalityFilter !== "all") {
      filtered = filtered.filter(
        (player) => player.nationality === nationalityFilter
      );
    }

    if (ageRange.min !== "" || ageRange.max !== "") {
      filtered = filtered.filter((player) => {
        const age = player.age;
        const minAge = ageRange.min !== "" ? parseInt(ageRange.min) : 0;
        const maxAge = ageRange.max !== "" ? parseInt(ageRange.max) : Infinity;
        return age >= minAge && age <= maxAge;
      });
    }

    setFilteredPlayers(filtered);
    setCurrentPage(1);
  }, [players, positionFilter, teamFilter, nationalityFilter, ageRange]);

  if (!players) {
    return <Loading />;
  }

  const handleSearch = (query) => {
    const filtered = players.filter((player) =>
      player.player_id.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredPlayers(filtered);
    setCurrentPage(1);
  };

  const getCurrentPagePlayers = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredPlayers.slice(startIndex, endIndex);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    buttons.push(
      <Button
        key="prev"
        variant="outline"
        size="icon"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="h-8 w-8"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
    );

    if (startPage > 1) {
      buttons.push(
        <Button
          key={1}
          variant={currentPage === 1 ? "default" : "outline"}
          onClick={() => handlePageChange(1)}
          className="h-8 w-8"
        >
          1
        </Button>
      );
      if (startPage > 2) {
        buttons.push(
          <span key="dots1" className="px-2">
            ...
          </span>
        );
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <Button
          key={i}
          variant={currentPage === i ? "default" : "outline"}
          onClick={() => handlePageChange(i)}
          className="h-8 w-8"
        >
          {i}
        </Button>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        buttons.push(
          <span key="dots2" className="px-2">
            ...
          </span>
        );
      }
      buttons.push(
        <Button
          key={totalPages}
          variant={currentPage === totalPages ? "default" : "outline"}
          onClick={() => handlePageChange(totalPages)}
          className="h-8 w-8"
        >
          {totalPages}
        </Button>
      );
    }

    buttons.push(
      <Button
        key="next"
        variant="outline"
        size="icon"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="h-8 w-8"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    );

    return buttons;
  };

  return (
    <div className="min-h-screen w-full">
      <div className="flex flex-col space-y-3 mx-auto items-center text-center max-w-3xl mt-5">
        <h1 className="text-3xl sm:text-3xl md:text-5xl font-bold font-mono tracking-wide text-gray-900">
          Discover Players
        </h1>
        <p className="w-full sm:w-2/3 text-gray-600 md:text-base text-sm">
          Explore football talent with advanced filters and search tools to find
          your ideal player.
        </p>
      </div>
      <div className="container py-8 px-4 max-w-full">
        <h1 className="text-3xl font-bold mb-8">Filter</h1>
        <div className="flex gap-8 max-md:flex-col">
          <SidebarFilter
            onPositionChange={setPositionFilter}
            onTeamChange={setTeamFilter}
            onNationalityChange={setNationalityFilter}
            onAgeRangeChange={setAgeRange}
            teams={teams}
            positionValue={positionFilter}
            teamValue={teamFilter}
            nationalityValue={nationalityFilter}
            ageRange={ageRange}
          />

          <div className="flex-1">
            <SearchBar onSearch={handleSearch} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getCurrentPagePlayers().map((player) => (
                <PlayerCard key={player.id} player={player} />
              ))}
            </div>
            {filteredPlayers.length > 0 && (
              <div className="flex justify-center gap-2 mt-8">
                {renderPaginationButtons()}
              </div>
            )}
            {filteredPlayers.length === 0 && (
              <div className="text-center mt-8 text-gray-500">
                No players found matching your criteria
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
