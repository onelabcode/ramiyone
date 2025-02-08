"use client";
import { useEffect, useState } from "react";
import { Trophy } from "lucide-react";
import { TopSearchedPlayerCard } from "./TopSearchedComp/TopPlayerCard";
import useTopPlayersStore from "services/VoteState";
import usePlayerStore from "services/PlayerStore";
import useAuthStore from "services/AuthState";
import { toast } from "sonner";
import { NewsCarousel } from "./Tutor/NewsCarousel";

export default function VotePage() {
  const { fetchTopPlayers, topPlayers, voteForPlayer } = useTopPlayersStore();
  const { user } = useAuthStore();
  const [players, setPlayers] = useState([]);
  const { getPlayerById } = usePlayerStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchTopPlayers();
      } catch (error) {
        console.error("Error fetching top players:", error);
      }
    };

    fetchData();
  }, [fetchTopPlayers]);

  useEffect(() => {
    const fetchPlayerDetails = async () => {
      if (!topPlayers || topPlayers.length === 0) return;

      try {
        const playerPromises = topPlayers.map(async (topPlayer) => {
          const player = await getPlayerById(topPlayer.player_id);
          return player ? { ...player, votes: topPlayer.votes } : null;
        });
        const playerDetails = await Promise.all(playerPromises);
        setPlayers(playerDetails.filter((player) => player !== null));
      } catch (error) {
        console.error("Error fetching player details:", error);
      }
    };

    fetchPlayerDetails();
  }, [topPlayers, getPlayerById]);

  const handleVote = (playerId) => {
    if (user?.user_id) {
      voteForPlayer(user.user_id, playerId);
    } else {
      toast.error("Only Registered Users Can vote");
    }
  };
  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Trophy className="h-12 w-12 text-yellow-500" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Top Players of the Month
          </h1>
          <p className="text-lg text-gray-600">
            Vote for your favorite players and help them reach the top!
          </p>
        </div>

        <div className="overflow-x-auto sm:overflow-hidden">
          <NewsCarousel className="pb-4">
            {players.map((player) => (
              <div
                key={player.id}
                className="flex-[0_0_100%] md:flex-[0_0_85%] lg:flex-[0_0_32%] min-w-0 px-2"
              >
                <TopSearchedPlayerCard
                  key={player.id}
                  player={player}
                  onVote={handleVote}
                />
              </div>
            ))}
          </NewsCarousel>
        </div>
      </div>
    </div>
  );
}
