import { create } from "zustand";
import { axiosB } from "@lib/axios";
import { toast } from "sonner";

export const useTrialouts = create((set) => ({
  trialouts: [],

  fetchTrialouts: async () => {
    try {
      const response = await axiosB.get("/api/trial");
      set({ trialouts: response.data });
    } catch (error) {
      console.error("Error fetching trialouts:", error.message);
    }
  },

  createTrialout: async (trialoutData) => {
    try {
      const response = await axiosB.post("/api/trial", trialoutData);
      set((state) => ({
        trialouts: [...state.trialouts, response.data],
      }));
      toast.success(response.data.message);
    } catch (error) {
      console.error("Error creating trialout:", error.message);
    }
  },

  updateTrialout: async (id, status) => {
    try {
      await axiosB.put(`/api/trial/${id}`, { status });
      set((state) => ({
        trialouts: state.trialouts.map((trialout) =>
          trialout.id === id ? { ...trialout, status } : trialout
        ),
      }));
      toast.success(`Status updated to ${status} successfully`);
    } catch (error) {
      console.error("Error updating trialout:", error.message);
    }
  },

  deleteTrialout: async (id) => {
    try {
      await axiosB.delete(`/api/trial/${id}`);
      set((state) => ({
        trialouts: state.trialouts.filter((trialout) => trialout.id !== id),
      }));
      toast.success("Trialout deleted successfully");
    } catch (error) {
      console.error("Error deleting trialout:", error.message);
    }
  },
}));
