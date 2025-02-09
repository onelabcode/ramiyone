import { create } from "zustand";
import { axiosB } from "@/lib/axios";
import { toast } from "sonner";

export const useBlogStore = create((set) => ({
  blogs: [],
  featuredBlogs: [],
  singleblog: null,
  recommendedBlogs: [],
  loading: false,
  error: null,

  fetchBlogs: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axiosB.get("/api/blog");
      set({ blogs: response.data, loading: false });
    } catch (error) {
      console.error(error);
      set({ error: "Failed to fetch blogs", loading: false });
    }
  },

  fetchBlogById: async (id) => {
    try {
      const response = await axiosB.get(`/api/blog/each/${id}`);
      set({ singleblog: response.data });
    } catch (error) {
      console.error(error);
      set({ error: "Failed to fetch the blog" });
      return null;
    }
  },

  createBlog: async (blogData) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosB.post("/api/blog", blogData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      set((state) => ({
        blogs: [response.data.blog, ...state.blogs],
        loading: false,
      }));
      toast.success("Blog Created Successflly");
    } catch (error) {
      console.error(error);
      set({ error: "Failed to create blog", loading: false });
    }
  },

  updateBlog: async (id, updatedData) => {
    set({ loading: true, error: null });
    try {
      await axiosB.put(`/api/blog/${id}`, updatedData);
      set((state) => ({
        blogs: state.blogs.map((blog) =>
          blog.id === id ? { ...blog, ...updatedData } : blog
        ),
        loading: false,
      }));
      toast.success("Blog Updated Successflly");
    } catch (error) {
      console.error(error);
      set({ error: "Failed to update blog", loading: false });
    }
  },

  deleteBlog: async (id) => {
    set({ loading: true, error: null });
    try {
      await axiosB.delete(`/api/blog/${id}`);
      set((state) => ({
        blogs: state.blogs.filter((blog) => blog.id !== id),
        loading: false,
      }));
      toast.success("Blog deleted Successflly");
    } catch (error) {
      console.error(error);
      set({ error: "Failed to delete blog", loading: false });
    }
  },

  fetchFeaturedBlogs: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axiosB.get("/api/blog/featured");
      set({ featuredBlogs: response.data, loading: false });
    } catch (error) {
      console.error(error);
      set({ error: "Failed to fetch featured blogs", loading: false });
    }
  },

  toggleFeaturedBlog: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosB.put(`/api/blog/${id}/toggle-featured`);
      set((state) => ({
        blogs: state.blogs.map((blog) =>
          blog.id === id
            ? { ...blog, is_featured: response.data.is_featured }
            : blog
        ),
        loading: false,
      }));
    } catch (error) {
      console.error(error);
      set({ error: "Failed to toggle featured status", loading: false });
    }
  },

  fetchRecommendedBlogs: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axiosB.get("/api/blog/recommended");
      set({ recommendedBlogs: response.data, loading: false });
    } catch (error) {
      console.error(error);
      set({ error: "Failed to fetch recommended blogs", loading: false });
    }
  },
}));
