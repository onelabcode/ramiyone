import { create } from "zustand";
import { axiosB } from "@lib/axios";
import { toast } from "sonner";

const useFavoriteStore = create((set) => ({
  favorites: [],

  getFavorites: async (userId) => {
    try {
      const response = await axiosB.get(`/api/favorite/${userId}`);

      set({ favorites: response.data });
    } catch (error) {
      console.error("Error fetching favorites:", error);
      toast.error("Failed to fetch favorites. Please try again.");
    }
  },

  addToFavorites: async (userId, playerId) => {
    try {
      const response = await axiosB.post(`/api/favorite`, {
        user_id: userId,
        player_id: playerId,
      });

      if (response.status === 201) {
        set((state) => ({
          favorites: [...state.favorites, response.data.player],
        }));
        toast.success("Player added to favorites successfully");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error adding to favorites:", error);
      toast.error("Failed to add player to favorites. Please try again.");
    }
  },

  removeFromFavorites: async (userId, playerId) => {
    try {
      const response = await axiosB.post(`/api/favorite/remove`, {
        user_id: userId,
        player_id: playerId,
      });

      if (response.status === 200) {
        set((state) => ({
          favorites: state.favorites.filter(
            (favorite) => favorite.id !== playerId
          ),
        }));
        toast.success("Player removed from favorites successfully");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error removing from favorites:", error);
      toast.error("Failed to remove player from favorites. Please try again.");
    }
  },
}));

export default useFavoriteStore;
