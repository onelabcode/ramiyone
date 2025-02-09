import { create } from "zustand";
import { axiosB } from "@/lib/axios";
import { toast } from "sonner";
const usePlayerStore = create((set) => ({
  players: [],
  teams: [],
  singlePlayer: null,
  currentPlayer: null,
  playerloading: false,
  uploading: false,
  teamloading: false,
  currentTeam: null,
  getAllPlayers: async () => {
    set({ playerloading: true });
    try {
      const response = await axiosB.get("/api/player");
      set({ players: response.data, playerloading: false });
    } catch (error) {
      console.error("Error fetching players:", error);
      set({ playerloading: false });
    }
  },

  getPlayerById: async (id) => {
    try {
      const response = await axiosB.get(`/api/player/each/${id}`);
      set({ singlePlayer: response.data });
      return response.data;
    } catch (error) {
      console.error("Error fetching player:", error);
    }
  },

  createPlayer: async (playerData) => {
    set({ uploading: true });
    try {
      const response = await axiosB.post("/api/player", playerData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      set((state) => ({
        players: [...state.players, response.data.player],
      }));
      set({ uploading: false });
      if (response.status === 201) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "An error occurred while creating the a Player.";
      set({ uploading: false });
      console.error("Error creating Player:", errorMessage);
      toast.error(errorMessage);
    }
  },

  updatePlayer: async (id, updatedData) => {
    console.log(updatedData);
    set({ uploading: true });
    try {
      const update = await axiosB.put(`/api/player/${id}`, updatedData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const response = await axiosB.get(`/api/player/each/${id}`);

      set((state) => ({
        players: state.players.map((player) =>
          player.id === id ? response.data : player
        ),
        uploading: false,
      }));
      if (update.status == 201) {
        return toast.error(update.data.error);
      }
      toast.success("Player updated successfully");
    } catch (error) {
      console.error("Error updating player:", error);
      toast.error(error.response?.data?.message);
      set({ uploading: false });
    }
  },

  deletePlayer: async (id) => {
    try {
      await axiosB.delete(`/api/player/${id}`);
      set((state) => ({
        players: state.players.filter((player) => player.id !== id),
      }));

      toast.success("Player deleted successfully");
    } catch (error) {
      console.error("Error deleting player:", error);
    }
  },

  getTeams: async () => {
    set({ teamloading: true });
    try {
      const response = await axiosB.get("/api/player/team");

      set({ teams: response.data.teams, teamloading: false });
    } catch (error) {
      console.error("Error fetching teams:", error);
      set({ teamloading: false });
    }
  },

  createTeam: async (teamData) => {
    set({ teamloading: true });
    try {
      const response = await axiosB.post("/api/player/team", teamData);
      set((state) => ({
        teams: [...state.teams, response.data.team],
      }));
      toast.success(response.data.message);
      set({ teamloading: false });
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "An error occurred while creating the team.";
      console.error("Error creating team:", errorMessage);
      toast.error(errorMessage);
      set({ teamloading: false });
    }
  },
  getTeamById: async (id) => {
    set({ teamloading: true });
    try {
      const response = await axiosB.get(`/api/player/team/${id}`);

      set({ currentTeam: response.data.team, teamloading: false });
      return response.data.team;
    } catch (error) {
      console.error("Error fetching team:", error);
      toast.error("Failed to fetch the team. Please try again.");
      set({ teamloading: false });
    }
  },

  deleteTeam: async (team_name) => {
    try {
      await axiosB.delete(`/api/player/team/${team_name}`);
      set((state) => ({
        teams: state.teams.filter((team) => team.team_name !== team_name),
      }));

      toast.success("Team deleted successfully");
    } catch (error) {
      console.error("Error deleting team:", error);
    }
  },
}));

export default usePlayerStore;
