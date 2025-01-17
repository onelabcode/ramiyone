import { create } from "zustand";
import { axiosB } from "../libaxios/axios";
import { toast } from "sonner";

const useDashboardStore = create((set) => ({
  stats: {
    totalPlayers: 0,
    activeScouts: 0,
    totalTeams: 0,
    reportsGenerated: 0,
  },
  recentActivities: [],
  barChartData: [], 
  pieChartData: [],
  loading: false,
  error: null,


  fetchDashboardData: async () => {
    set({ loading: true, error: null });

    try {
      const response = await axiosB.get("/api/auth/dashboard");
      const { stats, activities, charts } = response.data;

      const { bar, pie } = charts;

      set({
        stats,
        recentActivities: activities,
        barChartData: bar, 
        pieChartData: pie,
        loading: false,
      });

      toast.success("Dashboard data loaded successfully!");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to fetch dashboard data";
      set({ error: errorMessage, loading: false });
      toast.error(errorMessage);
    }
  },
}));

export default useDashboardStore;
