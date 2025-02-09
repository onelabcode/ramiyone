import { create } from "zustand";
import { axiosB } from "@/lib/axios";
import { toast } from "sonner";

const useTutorStore = create((set) => ({
  tutors: [],
  featuredTutors: [],
  currentTutor: null,
  loading: false,

  createTutor: async (tutorData) => {
    try {
      set({ loading: true });
      const response = await axiosB.post("/api/tutor", tutorData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      set((state) => ({
        tutors: [response.data.tutor, ...state.tutors],
      }));
      toast.success("Tutor created successfully");
      set({ loading: false });
    } catch (error) {
      console.error("Error creating tutor:", error.message);
      set({ loading: false });
    }
  },

  getTutors: async () => {
    try {
      const response = await axiosB.get("/api/tutor");
      set({ tutors: response.data });
    } catch (error) {
      console.error("Error fetching tutors:", error.message);
    }
  },

  getTutorById: async (id) => {
    try {
      const response = await axiosB.get(`/api/tutor/each/${id}`);
      set({ currentTutor: response.data });
    } catch (error) {
      console.error("Error fetching tutor:", error.message);
    }
  },

  updateTutor: async (id, updatedData) => {
    try {
      await axiosB.put(`/api/tutor/${id}`, updatedData);
      set((state) => ({
        tutors: state.tutors.map((tutor) =>
          tutor.id === id ? { ...tutor, ...updatedData } : tutor
        ),
      }));
      toast.success("Tutor updated successfully");
    } catch (error) {
      console.error("Error updating tutor:", error.message);
    }
  },

  deleteTutor: async (id) => {
    try {
      await axiosB.delete(`/api/tutor/${id}`);
      set((state) => ({
        tutors: state.tutors.filter((tutor) => tutor.id !== id),
      }));
      toast.success("Tutor deleted successfully");
    } catch (error) {
      console.error("Error deleting tutor:", error.message);
    }
  },

  getFeaturedTutors: async () => {
    try {
      const response = await axiosB.get("/api/tutor/featured");
      set({ featuredTutors: response.data });
    } catch (error) {
      console.error("Error fetching featured tutors:", error.message);
    }
  },

  toggleFeaturedTutor: async (id) => {
    try {
      const response = await axiosB.put(`/api/tutor/${id}/toggle-featured`);
      set((state) => ({
        tutors: state.tutors.map((tutor) =>
          tutor.id === id
            ? { ...tutor, is_featured: response.data.is_featured }
            : tutor
        ),
      }));
    } catch (error) {
      console.error("Error toggling featured status:", error.message);
    }
  },

  getLatestTutors: async () => {
    try {
      const response = await axiosB.get("/api/tutor/latest");
      set({ tutors: response.data });
    } catch (error) {
      console.error("Error fetching latest tutors:", error.message);
    }
  },
}));

export default useTutorStore;
