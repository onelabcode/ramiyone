import { create } from "zustand";
import { axiosB } from "../libaxios/axios";
import { toast } from "sonner";

const useTopPlayersStore = create((set) => ({
  topPlayers: [],
  loading: false,
  error: null,

  fetchTopPlayers: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axiosB.get("/api/top");
      set({ topPlayers: response.data, loading: false });
 
    } catch (error) {
      set({ error: error.response?.data || "Error fetching top players", loading: false });
    }
  },

  updateTopPlayers: async (players) => {

    if (players.length !== 3) {
      set({ error: "Exactly 3 players must be submitted." });
      return;
    }

    set({ loading: true, error: null });
    try {
      const response = await axiosB.post("/api/top", { players });
      set({ loading: false });
      await useTopPlayersStore.getState().fetchTopPlayers();
     toast.success(response.data.message);
    } catch (error) {
      set({ error: error.response?.data || "Error updating top players", loading: false });
    }
  },

  clearTopPlayers: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axiosB.delete("/api/top");
      set({ topPlayers: [], loading: false });
      return response.data;
    } catch (error) {
      set({ error: error.response?.data || "Error clearing top players", loading: false });
    }
  },
  voteForPlayer: async (userId, playerId) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosB.post("/api/top/vote", { userId, playerId });
      set((state) => {
        const updatedTopPlayers = state.topPlayers.map((player) =>
          player.player_id === playerId
            ? { ...player, votes: (player.votes || 0) + 1 }
            : player
        );
        return { topPlayers: updatedTopPlayers, loading: false };
      });
  
      toast.success(response.data.message); 
    } catch (error) {
      set({ error: error.response?.data.message || "Error voting for the player", loading: false });
      toast.error(error.response?.data.message || "You have already voted for this player."); 
    }
  },
  
  clearError: () => {
    set({ error: null });
  },
}));

export default useTopPlayersStore;
