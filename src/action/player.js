"use server";

import { API_URL } from "@lib/env";
import { fetchWithToken } from "@lib/fetch-with-token";
import { handleResponse } from "./utils";

export const getAllPlayers = async () => {
  try {
    const res = await fetchWithToken(`${API_URL}/api/player`, {
      method: "GET",
    });
    return handleResponse(res);
  } catch (error) {
    return {
      success: false,
      statusCode: 700,
      data: error,
    };
  }
};

export const getPlayerById = async (id) => {
  try {
    const res = await fetchWithToken(`${API_URL}/api/player/each/${id}`, {
      method: "GET",
    });
    return handleResponse(res);
  } catch (error) {
    return {
      success: false,
      statusCode: 700,
      data: error,
    };
  }
};

export const createPlayer = async (playerData) => {
  try {
    const res = await fetchWithToken(`${API_URL}/api/player`, {
      method: "POST",
      body: playerData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return handleResponse(res);
  } catch (error) {
    return {
      success: false,
      statusCode: 700,
      data: error,
    };
  }
};

export const updatePlayer = async (id, updatedData) => {
  try {
    const res = await fetchWithToken(`${API_URL}/api/player/${id}`, {
      method: "PUT",
      body: JSON.stringify(updatedData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return handleResponse(res);
  } catch (error) {
    return {
      success: false,
      statusCode: 700,
      data: error,
    };
  }
};

export const deletePlayer = async (id) => {
  try {
    const res = await fetchWithToken(`${API_URL}/api/player/${id}`, {
      method: "DELETE",
    });
    return handleResponse(res);
  } catch (error) {
    return {
      success: false,
      statusCode: 700,
      data: error,
    };
  }
};

export const getTeams = async () => {
  try {
    const res = await fetchWithToken(`${API_URL}/api/player/team`, {
      method: "GET",
    });
    return handleResponse(res);
  } catch (error) {
    return {
      success: false,
      statusCode: 700,
      data: error,
    };
  }
};

export const createTeam = async (teamData) => {
  try {
    const res = await fetchWithToken(`${API_URL}/api/player/team`, {
      method: "POST",
      body: JSON.stringify(teamData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return handleResponse(res);
  } catch (error) {
    return {
      success: false,
      statusCode: 700,
      data: error,
    };
  }
};

export const getTeamById = async (id) => {
  try {
    const res = await fetchWithToken(`${API_URL}/api/player/team/${id}`, {
      method: "GET",
    });
    return handleResponse(res);
  } catch (error) {
    return {
      success: false,
      statusCode: 700,
      data: error,
    };
  }
};

export const deleteTeam = async (team_name) => {
  try {
    const res = await fetchWithToken(
      `${API_URL}/api/player/team/${team_name}`,
      {
        method: "DELETE",
      }
    );
    return handleResponse(res);
  } catch (error) {
    return {
      success: false,
      statusCode: 700,
      data: error,
    };
  }
};
