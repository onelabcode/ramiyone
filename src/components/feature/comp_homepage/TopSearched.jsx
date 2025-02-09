import { Trophy } from "lucide-react";
import { TopSearchedPlayerCard } from "./TopSearchedComp/TopPlayerCard";
import { NewsCarousel } from "./Tutor/NewsCarousel";
import { fetchTopPlayers } from "action/vote";
import { getPlayerById } from "action/player";

export default async function VotePage() {
  const topPlayersRes = await fetchTopPlayers();
  console.log("Top Players", topPlayersRes);
  const topPlayers = topPlayersRes.success ? topPlayersRes.data : [];

  const playerDetails = await Promise.all(
    topPlayers?.map(async (topPlayer) => {
      const player = await getPlayerById(topPlayer.player_id);
      return player ? { ...player, votes: topPlayer.votes } : null;
    })
  );

  const players = playerDetails.filter((player) => player !== null);

  const handleVote = (playerId) => {
    console.log("Voting for player", playerId);
    // const { user } = useAuthStore();
    // if (user?.user_id) {
    //   voteForPlayer(user.user_id, playerId);
    // } else {
    //   toast.error("Only Registered Users Can vote");
    // }
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
