import { create } from "zustand";
import { axiosB } from "@/lib/axios";
import { toast } from "sonner";
export const useRequests = create((set) => ({
  requests: [],

  fetchRequests: async () => {
    try {
      const response = await axiosB.get("/api/requests");
      set({ requests: response.data });
    } catch (error) {
      console.error("Error fetching requests:", error.message);
    }
  },
  fetchRequestById: async (id) => {
    try {
      const response = await axiosB.get(`/api/requests/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching request by ID:", error.message);
    }
  },

  createRequests: async (requestData) => {
    try {
      const response = await axiosB.post("/api/requests", requestData);
      set((state) => ({
        requests: [...state.requests, response.data],
      }));
      toast.success(response.data.message);
    } catch (error) {
      console.error("Error creating request:", error.message);
      set(() => ({}));
    }
  },
  updateRequest: async (id, status) => {
    try {
      await axiosB.put(`/api/requests/${id}`, { status });
      set((state) => ({
        requests: state.requests.map((req) =>
          req.id === id ? { ...req, status } : req
        ),
      }));
      toast.success(`Status Updated to ${status} successfully`);
    } catch (error) {
      console.error("Error updating request:", error.message);
    }
  },
  deleteRequest: async (id) => {
    try {
      await axiosB.delete(`/api/requests/${id}`);
      set((state) => ({
        requests: state.requests.filter((req) => req.id !== id),
      }));
      toast.success("Request deleted successfully");
    } catch (error) {
      console.error("Error deleting request:", error.message);
    }
  },
}));
