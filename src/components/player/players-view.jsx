"use client";
import { useEffect, useState, useCallback } from "react";
import { SidebarFilter } from "@/components/feature/player/SideBarFilter";
import { SearchBar } from "@/components/feature/player/SideBar";
import { PlayerCard } from "@/components/feature/player/player-card";
import { getPlayersFilters } from "action/player";
import { PaginationPlayer } from "./pageination";
import LoadingAnimate from "../feature/LoadingAnimate";

export default function PlayersView({ teams }) {
  const [playersData, setPlayersData] = useState({
    content: [],
    total: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({
    position: "all",
    team: "all",
    nationality: "all",
    ageRange: { min: "", max: "" },
    search: "",
    page: 1,
    limit: 9,
  });

  const handleSearch = useCallback((query) => {
    setFilters((prev) => ({ ...prev, search: query }));
  }, []);

  const fetchPlayers = useCallback(async () => {
    try {
      setIsLoading(true);
      const filterQuery = new URLSearchParams({
        position: filters.position === "all" ? "" : filters.position,
        team_name: filters.team === "all" ? "" : filters.team,
        nationality: filters.nationality === "all" ? "" : filters.nationality,
        min_age: filters.ageRange.min,
        max_age: filters.ageRange.max,
        search: filters.search,
        page: filters.page.toString(),
        limit: filters.limit.toString(),
      });

      const res = await getPlayersFilters(filterQuery.toString());
      if (res.success) {
        setPlayersData({ content: res.data.content, total: res.data.total });
      } else {
        setPlayersData({ content: [], total: 0 });
      }
    } catch (error) {
      console.error("Error fetching players:", error);
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchPlayers();
  }, [fetchPlayers]);

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
            onPositionChange={(val) =>
              setFilters((prev) => ({ ...prev, position: val }))
            }
            onTeamChange={(val) =>
              setFilters((prev) => ({ ...prev, team: val }))
            }
            onNationalityChange={(val) =>
              setFilters((prev) => ({ ...prev, nationality: val }))
            }
            onAgeRangeChange={(val) =>
              setFilters((prev) => ({ ...prev, ageRange: val }))
            }
            teams={teams}
            positionValue={filters.position}
            teamValue={filters.team}
            nationalityValue={filters.nationality}
            ageRange={filters.ageRange}
          />

          <div className="flex-1">
            <SearchBar onSearch={handleSearch} />
            {isLoading ? (
              <LoadingAnimate />
            ) : (
              <>
                {playersData.content.length > 0 ? (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {playersData.content.map((player) => (
                        <PlayerCard key={player.id} player={player} />
                      ))}
                    </div>
                    <div className="mt-8">
                      <PaginationPlayer
                        page={filters.page}
                        onPageChange={(page) =>
                          setFilters((prev) => ({ ...prev, page }))
                        }
                        totalContent={playersData.total}
                        limit={filters.limit}
                      />
                    </div>
                  </>
                ) : (
                  <div className="text-center mt-8 text-gray-500">
                    No players found matching your criteria
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
