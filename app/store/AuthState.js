import { create } from "zustand";
import { axiosB } from "../libaxios/axios";
import { toast } from "sonner";
const useAuthStore = create((set) => ({
  user: null,
  users: [],
  loading: false,
  error: null,
  setUsers: async (updatedUsers) => {
    set((state) => ({
   users:updatedUsers
    }));
  },
  signup: async (email, password, username) => {

    set({ loading: true, error: null });
    try {
      const response = await axiosB.post("api/auth/signup", {
        email,
        password,
        username,
      });
      set({ user: response.data.user, loading: false });
      toast.success("Account created successfully!");
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Signup failed";
      toast.error(errorMessage);
      set({ error: errorMessage, loading: false });
      throw new Error(errorMessage);
    }
  },

  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosB.post("/api/auth/login", {
        email,
        password,
      });
      set({ user: response.data.user, loading: false });
      if (response.status === 200) {
        return toast.success(response.data.message);
      }
      toast.error(response.data.message);
    } catch (error) {
      const errorMessage = error.response?.data?.message;
      toast.error(errorMessage);
      set({ error: errorMessage || "Login failed", loading: false });
      throw new Error(errorMessage);
    }
  },

  logout: async () => {
    set({ loading: true, error: null });
    try {
      await axiosB.post("/api/auth/logout");
      set({ user: null, loading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Logout failed",
        loading: false,
      });
    }
  },

  refreshToken: async () => {
    set({ loading: true, error: null });
    try {
      await axiosB.get("/api/auth/refreshtoken");
      set({ loading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Token refresh failed",
        loading: false,
      });
    }
  },
  getProfile: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axiosB.get("/api/auth/profile", {
        withCredentials: true,
      });
      set({ user: response.data.user, loading: false });
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to fetch profile";
      set({ error: errorMessage, loading: false });
    }
  },
  getNonAdminUsers: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axiosB.get("/api/auth");
      set({ users: response.data.users, loading: false });
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to fetch non-admin users";
      set({ error: errorMessage, loading: false });
      toast.error(errorMessage);
    }
  },
  deleteUser: async (userId) => {
    set({ loading: true, error: null });
    try {
      const response= await axiosB.delete(`/api/auth/${userId}`);
      
      toast.success(response.data.message);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to delete user";
      set({ error: errorMessage, loading: false });
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
  },
  updateUser: async (userId, role) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosB.put(`/api/auth/${userId}`, { role });
      toast.success(response.data.message);
      set((state) => ({
        ...state,
        users: state.users.map((user) =>
          user.id === userId ? { ...user, role } : user
        ),
        loading: false,
      }));
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to update User";
      set({ error: errorMessage, loading: false });
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
  },
  
}));

export default useAuthStore;
