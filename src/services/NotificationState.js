import { create } from "zustand";
import { axiosB } from "@/lib/axios";
import { toast } from "sonner";
import socket from "../lib/socket";

const useNotificationStore = create((set) => ({
  notifications: [],

  loading: false,
  error: null,
  singleNotification: null,
  addNotification: (notification) => {
    set((state) => ({
      notifications: [notification, ...state.notifications],
    }));
  },
  fetchNotificationById: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosB.get(`/api/notifications/${id}`);

      set(() => ({
        notifications: response.data,
        loading: false,
      }));

      return response.data;
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to fetch notification",
        loading: false,
      });
    }
  },

  sendContactForm: async (formData) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosB.post(
        `/api/notifications/contact`,
        formData
      );
      set({ loading: false });
      toast.success(response.data.message);
    } catch (error) {
      console.error("Error sending contact form:", error.message);
      set({
        loading: false,
      });
      toast.error("Failed to send your message. Please try again.");
    }
  },
  createNotification: async (data) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosB.post(`/api/notifications`, data);
      set((state) => ({
        notifications: [
          ...state.notifications,
          { ...data, id: response.data.id },
        ],
        loading: false,
      }));
      toast.success("Notification created successfully.");
    } catch (error) {
      console.error("Error creating notification:", error.message);
      set({
        error: error.response?.data?.message || "Failed to create notification",
        loading: false,
      });
      toast.error("Failed to create notification.");
    }
  },

  deleteNotification: async (id) => {
    set({ loading: true, error: null });
    try {
      await axiosB.delete(`/api/notifications/${id}`);
      set((state) => ({
        notifications: state.notifications.filter(
          (notification) => notification.id !== id
        ),
        loading: false,
      }));
      toast.success("Notification deleted successfully.");
    } catch (error) {
      console.error("Error deleting notification:", error.message);
      set({
        error: error.response?.data?.message || "Failed to delete notification",
        loading: false,
      });
      toast.error("Failed to delete notification.");
    }
  },
  MarkAsRead: async (id) => {
    try {
      set((state) => ({
        notifications: state.notifications.map((notification) =>
          notification.id === id
            ? { ...notification, is_read: true }
            : notification
        ),
      }));
      toast.success("Notification marked as read.");
    } catch (error) {
      console.error("Failed to mark notification as read:", error.message);
      toast.error("Failed to mark notification as read.");
    }
  },
}));
const initializeSocketListeners = (userId) => {
  socket.on("new_notification", (notification) => {
    if (notification.user_id === userId) {
      useNotificationStore.getState().addNotification(notification);
    }
  });
};
export { initializeSocketListeners };

export default useNotificationStore;
