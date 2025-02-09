"use client";

import { Card } from "@/components/ui/card";
import usePlayerStore from "services/PlayerStore";
import { PlayerStats } from "./components/player-stats";
import { PlayerActions } from "./components/player-action";
import { useEffect, useState } from "react";
import Loading from "@/components/feature/Loading";
import { useParams } from "next/navigation";
import useAuthStore from "services/AuthState";
import useFavoriteStore from "services/FavouriteStore";
import { Heart } from "lucide-react";
import Image from "next/image";

export default function PlayerProfile() {
  const { id } = useParams();
  const { user } = useAuthStore();
  const { singlePlayer, getPlayerById } = usePlayerStore();
  const { addToFavorites } = useFavoriteStore();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getPlayerById(id).finally(() => setLoading(false)); // Fetch new player data
  }, [id]);

  const addToFav = (player_id) => {
    addToFavorites(user.user_id, player_id);
  };

  return (
    <>
      {loading ? (
        <div>
          <Loading />
        </div>
      ) : singlePlayer ? (
        <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <Card className="relative overflow-hidden backdrop-blur-sm bg-opacity-90 border-none shadow-2xl">
              <div className="grid md:grid-cols-2 gap-8 p-8 grid-cols-1">
                <div className="relative group">
                  <div className="relative rounded-xl overflow-hidden shadow-2xl transform-gpu">
                    <Image
                      src={singlePlayer.image}
                      alt={singlePlayer.player_id}
                      className="w-full h-[500px] object-cover rounded-xl transform transition-transform duration-500 group-hover:scale-110"
                      width={500}
                      height={500}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold">{singlePlayer.name}</h2>
                    {user && (
                      <button
                        onClick={() => addToFav(singlePlayer.id)}
                        className="p-2 rounded-full hover:bg-secondary hover:text-white transition"
                        aria-label="Add to Favourites"
                      >
                        <Heart className="w-6 h-6 text-gray-500 hover:text-red-500" />
                      </button>
                    )}
                  </div>
                  <PlayerStats player={singlePlayer} />
                  {user && user.role === "scout" && (
                    <PlayerActions SinglePlayerId={singlePlayer.id} />
                  )}
                </div>
              </div>
            </Card>
          </div>
        </div>
      ) : (
        <div>
          <Loading />
        </div>
      )}
    </>
  );
}
