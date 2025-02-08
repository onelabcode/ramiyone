import { create } from "zustand";
import { toast } from "sonner";
import { axiosB } from "@lib/axios";

export const useBrandStore = create((set) => ({
  brands: [],
  singleBrand: null,
  loading: false,
  error: null,

  fetchBrands: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axiosB.get("/api/brand");
      set({ brands: response.data, loading: false });
    } catch (error) {
      console.error("Error fetching brands:", error);
      set({ error: "Failed to fetch brands", loading: false });
    }
  },

  fetchBrandById: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosB.get(`/api/brand/${id}`);
      set({ singleBrand: response.data, loading: false });
    } catch (error) {
      console.error("Error fetching brand:", error);
      set({ error: "Failed to fetch brand", loading: false });
    }
  },

  createBrand: async (brandData) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosB.post("/api/brand", brandData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      set((state) => ({
        brands: [response.data.brand, ...state.brands],
        loading: false,
      }));
      toast.success("Brand created successfully");
    } catch (error) {
      console.error("Error creating brand:", error);
      set({ error: "Failed to create brand", loading: false });
    }
  },

  updateBrand: async (id, updatedData) => {
    set({ loading: true, error: null });
    try {
      await axiosB.put(`/api/brand/${id}`, updatedData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const response = await axiosB.get(`/api/brand/each/${id}`);

      set((state) => ({
        brands: state.brands.map((brand) =>
          brand.id === id ? response.data : brand
        ),
        loading: false,
      }));

      toast.success("Brand updated successfully");
    } catch (error) {
      console.error("Error updating brand:", error);
      set({ error: "Failed to update brand", loading: false });
    }
  },

  deleteBrand: async (id) => {
    set({ loading: true, error: null });
    try {
      await axiosB.delete(`/api/brand/${id}`);
      set((state) => ({
        brands: state.brands.filter((brand) => brand.id !== id),
        loading: false,
      }));
      toast.success("Brand deleted successfully");
    } catch (error) {
      console.error("Error deleting brand:", error);
      set({ error: "Failed to delete brand", loading: false });
    }
  },
}));
