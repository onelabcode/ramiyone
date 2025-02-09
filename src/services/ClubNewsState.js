import { create } from "zustand";
import { toast } from "sonner";
import { axiosB } from "@/lib/axios";

export const useClubNewsStore = create((set) => ({
  clubNews: [], // Array to store all club news
  singleClubNews: null, // Single club news item
  loading: false, // Loading state
  error: null, // Error state

  // Fetch all club news
  fetchAllClubNews: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axiosB.get("/api/clubnews");
      set({ clubNews: response.data, loading: false });
    } catch (error) {
      console.error("Error fetching club news:", error);
      set({ error: "Failed to fetch club news", loading: false });
    }
  },

  // Fetch a single club news item by ID
  fetchClubNewsById: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosB.get(`/api/clubnews/each/${id}`);
      set({ singleClubNews: response.data, loading: false });
    } catch (error) {
      console.error("Error fetching club news by ID:", error);
      set({ error: "Failed to fetch club news", loading: false });
    }
  },

  // Create a new club news item
  createClubNews: async (formData) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosB.post("/api/clubnews", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      set((state) => ({
        clubNews: [response.data.news, ...state.clubNews],
        loading: false,
      }));
      toast.success("Club news created successfully");
    } catch (error) {
      console.error("Error creating club news:", error);
      set({ error: "Failed to create club news", loading: false });
    }
  },

  // Update a club news item
  updateClubNews: async (id, updatedData) => {
    set({ loading: true, error: null });
    try {
      await axiosB.put(`/api/clubnews/${id}`, updatedData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Fetch the updated club news item
      const response = await axiosB.get(`/api/clubnews/each/${id}`);

      set((state) => ({
        clubNews: state.clubNews.map((news) =>
          news.id === id ? response.data : news
        ),
        loading: false,
      }));

      toast.success("Club news updated successfully");
    } catch (error) {
      console.error("Error updating club news:", error);
      set({ error: "Failed to update club news", loading: false });
    }
  },

  // Delete a club news item
  deleteClubNews: async (id) => {
    set({ loading: true, error: null });
    try {
      await axiosB.delete(`/api/clubnews/${id}`);
      set((state) => ({
        clubNews: state.clubNews.filter((news) => news.id !== id),
        loading: false,
      }));
      toast.success("Club news deleted successfully");
    } catch (error) {
      console.error("Error deleting club news:", error);
      set({ error: "Failed to delete club news", loading: false });
    }
  },
}));
