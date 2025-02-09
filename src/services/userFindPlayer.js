import { create } from "zustand";
import { axiosB } from "@/lib/axios";
import { toast } from "sonner";

const useFindPlayerStore = create((set) => ({
  playerRequests: [],

  addPlayerRequest: (request) => {
    set((state) => ({
      playerRequests: [request, ...state.playerRequests],
    }));
  },

  createPlayerRequest: async (data) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosB.post(`/api/find`, data);

      toast.success(response.data.message);
    } catch (error) {
      console.error("Error creating player request:", error.message);
      set({
        error:
          error.response?.data?.message || "Failed to create player request",
        loading: false,
      });
      toast.error("Failed to create player request.");
      throw new Error(error.response?.data?.message);
    }
  },
  fetchPlayerRequests: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axiosB.get(`/api/find`);
      set({ playerRequests: response.data.requests, loading: false });
    } catch (error) {
      console.error("Error fetching player requests:", error.message);
      set({
        error:
          error.response?.data?.message || "Failed to fetch player requests",
        loading: false,
      });
      toast.error("Failed to fetch player requests.");
    }
  },

  deletePlayerRequest: async (id) => {
    set({ loading: true, error: null });
    try {
      await axiosB.delete(`/api/find/${id}`);
      set((state) => ({
        playerRequests: state.playerRequests.filter(
          (request) => request.id !== id
        ),
        loading: false,
      }));
      toast.success("Player request deleted successfully.");
    } catch (error) {
      console.error("Error deleting player request:", error.message);
      set({
        error:
          error.response?.data?.message || "Failed to delete player request",
        loading: false,
      });
      toast.error("Failed to delete player request.");
    }
  },
  updatePlayerRequestStatus: async (id, status) => {
    set({ loading: true, error: null });
    try {
      await axiosB.put(`/api/find/${id}`, { status });
      set((state) => ({
        playerRequests: state.playerRequests.map((request) =>
          request.id === id ? { ...request, status } : request
        ),
        loading: false,
      }));
      toast.success(`Player request status updated to ${status}.`);
    } catch (error) {
      console.error("Error updating player request status:", error.message);
      set({
        error:
          error.response?.data?.message ||
          "Failed to update player request status",
        loading: false,
      });
      toast.error("Failed to update player request status.");
    }
  },
}));

export default useFindPlayerStore;
