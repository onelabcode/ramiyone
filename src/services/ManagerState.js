import { create } from "zustand";
import { toast } from "sonner";
import { axiosB } from "@lib/axios";

export const useManagerStore = create((set) => ({
  managers: [],
  featuredManager: null,
  singleManager: null,
  loading: false,
  error: null,

  fetchAllManagers: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axiosB.get("/api/manager");
      set({ managers: response.data, loading: false });
    } catch (error) {
      console.error("Error fetching managers:", error);
      set({ error: "Failed to fetch managers", loading: false });
    }
  },

  fetchLatestFeaturedManager: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axiosB.get("/api/manager/featured");
      set({ featuredManager: response.data, loading: false });
    } catch (error) {
      console.error("Error fetching latest featured manager:", error);
      set({ error: "Failed to fetch latest featured manager", loading: false });
    }
  },

  fetchManagerById: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosB.get(`/api/manager/each/${id}`);
      set({ singleManager: response.data, loading: false });
    } catch (error) {
      console.error("Error fetching manager by ID:", error);
      set({ error: "Failed to fetch manager", loading: false });
    }
  },

  createManager: async (formData) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosB.post("/api/manager", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      set((state) => ({
        managers: [response.data.manager, ...state.managers],
        loading: false,
      }));
      toast.success("Manager created successfully");
    } catch (error) {
      console.error("Error creating manager:", error);
      set({ error: "Failed to create manager", loading: false });
    }
  },

  updateManager: async (id, updatedData) => {
    set({ loading: true, error: null });
    try {
      await axiosB.put(`/api/manager/${id}`, updatedData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const response = await axiosB.get(`/api/manager/${id}`);

      set((state) => ({
        managers: state.managers.map((manager) =>
          manager.id === id ? response.data : manager
        ),
        featuredManager:
          state.featuredManager?.id === id
            ? response.data
            : state.featuredManager,
        loading: false,
      }));

      toast.success("Manager updated successfully");
    } catch (error) {
      console.error("Error updating manager:", error);
      set({ error: "Failed to update manager", loading: false });
    }
  },

  updateManagerFeaturedStatus: async (id, is_featured) => {
    set({ loading: true, error: null });
    try {
      await axiosB.put(`/api/manager/featured/${id}`, { is_featured });

      const response = await axiosB.get(`/api/manager/each/${id}`);

      set((state) => ({
        managers: state.managers.map((manager) =>
          manager.id === id ? response.data : manager
        ),
        featuredManager: response.data,
        loading: false,
      }));

      toast.success(`Manager featured status updated to ${is_featured}`);
    } catch (error) {
      console.error("Error updating manager featured status:", error);
      set({
        error: "Failed to update manager featured status",
        loading: false,
      });
    }
  },

  deleteManager: async (id) => {
    set({ loading: true, error: null });
    try {
      await axiosB.delete(`/api/manager/${id}`);
      set((state) => ({
        managers: state.managers.filter((manager) => manager.id !== id),
        featuredManager:
          state.featuredManager?.id === id ? null : state.featuredManager,
        loading: false,
      }));
      toast.success("Manager deleted successfully");
    } catch (error) {
      console.error("Error deleting manager:", error);
      set({ error: "Failed to delete manager", loading: false });
    }
  },
}));
