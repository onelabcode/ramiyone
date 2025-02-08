import { create } from "zustand";
import { axiosB } from "@lib/axios";
import { toast } from "sonner";

const useProfileStore = create((set) => ({
  Profiles: null,
  loading: false,
  error: null,
  singleScout: null,
  fetchScoutProfiles: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axiosB.get(`/api/scout`);

      set(() => ({
        Profiles: response.data,
        loading: false,
      }));
    } catch (error) {
      set({
        error:
          error.response?.data?.message || "Failed to fetch scout profiles",
        loading: false,
      });
    }
  },
  fetchScoutById: async (id) => {
    try {
      const response = await axiosB.get(`/api/scout/each/${id}`);
      set({ singleScout: response.data });

      return response.data;
    } catch (error) {
      console.error("Error fetching scout profile:", error.message);
    }
  },
  createScoutProfile: async (data, profile) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosB.post(`/api/scout/${profile}`, data);
      set((state) => ({
        scoutProfiles: [...state.scoutProfiles, response.data],
        loading: false,
      }));
      toast.info(response.data.message);
    } catch (error) {
      set({
        error:
          error.response?.data?.message || "Failed to create scout profile",
        loading: false,
      });
    }
  },

  updateScoutProfileStatus: async (id, status, role) => {
    set({ loading: true, error: null });
    try {
      await axiosB.put(`/api/scout/${id}`, { status, role });
      set((state) => ({
        Profiles: state.Profiles.filter((profile) => profile.id !== id),
        loading: false,
      }));
    } catch (error) {
      set({
        error:
          error.response?.data?.message ||
          "Failed to update scout profile status",
        loading: false,
      });
    }
  },

  deleteScoutProfile: async (id) => {
    set({ loading: true, error: null });
    try {
      await axiosB.delete(`/api/scout/${id}`);
      set((state) => ({
        Profiles: state.Profiles.filter((profile) => profile.id !== id),
        loading: false,
      }));
      toast.success("Request deleted successfully.");
    } catch (error) {
      set({
        error:
          error.response?.data?.message || "Failed to delete scout profile",
        loading: false,
      });
    }
  },
}));

export default useProfileStore;
