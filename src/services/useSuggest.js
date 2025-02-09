import { create } from "zustand";
import { axiosB } from "@/lib/axios";
import { toast } from "sonner";

const usePlayerSuggestionsStore = create((set) => ({
  playerSuggestions: [],
  loading: false,
  error: null,

  fetchPlayerSuggestions: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axiosB.get(`/api/playersuggestion`);
      set({ playerSuggestions: response.data, loading: false });
    } catch (error) {
      console.error("Error fetching player suggestions:", error.message);
      set({
        error:
          error.response?.data?.message || "Failed to fetch player suggestions",
        loading: false,
      });
      toast.error("Failed to fetch player suggestions.");
    }
  },

  createPlayerSuggestion: async (data) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosB.post(`/api/playersuggestion`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      set((state) => ({
        playerSuggestions: [
          ...state.playerSuggestions,
          { ...data, id: response.data.id },
        ],
        loading: false,
      }));
      toast.success("Player suggestion created successfully.");
    } catch (error) {
      console.error("Error creating player suggestion:", error.message);
      set({
        error:
          error.response?.data?.message || "Failed to create player suggestion",
        loading: false,
      });
      toast.error("Failed to create player suggestion.");
    }
  },

  deletePlayerSuggestion: async (id) => {
    set({ loading: true, error: null });
    try {
      await axiosB.delete(`/api/playersuggestion/${id}`);
      set((state) => ({
        playerSuggestions: state.playerSuggestions.filter(
          (suggestion) => suggestion.id !== id
        ),
        loading: false,
      }));
      toast.success("Player suggestion deleted successfully.");
    } catch (error) {
      console.error("Error deleting player suggestion:", error.message);
      set({
        error:
          error.response?.data?.message || "Failed to delete player suggestion",
        loading: false,
      });
      toast.error("Failed to delete player suggestion.");
      throw new Error(error.response?.data?.message);
    }
  },

  updatePlayerSuggestionStatus: async (id, status) => {
    set({ loading: true, error: null });
    try {
      await axiosB.put(`/api/playersuggestion/${id}`, { status });
      set((state) => ({
        playerSuggestions: state.playerSuggestions.map((suggestion) =>
          suggestion.id === id ? { ...suggestion, status } : suggestion
        ),
        loading: false,
      }));
      toast.success(`Player suggestion status updated to ${status}.`);
    } catch (error) {
      console.error("Error updating player suggestion status:", error.message);
      set({
        error:
          error.response?.data?.message ||
          "Failed to update player suggestion status",
        loading: false,
      });
      toast.error("Failed to update player suggestion status.");
      throw new Error(error.response?.data?.message);
    }
  },
}));

export default usePlayerSuggestionsStore;
