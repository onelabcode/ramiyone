"use server";

import { API_URL } from "@/lib/env";
import { fetchWithToken } from "@/lib/fetch-with-token";
import { handleResponse } from "./utils";

export const fetchTopPlayers = async () => {
  try {
    const res = await fetchWithToken(`${API_URL}/api/top`, {
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

export const updateTopPlayers = async (players) => {
  try {
    const res = await fetchWithToken(`${API_URL}/api/top`, {
      method: "POST",
      body: JSON.stringify({ players }),
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

export const clearTopPlayers = async () => {
  try {
    const res = await fetchWithToken(`${API_URL}/api/top`, {
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

export const voteForPlayer = async (userId, playerId) => {
  try {
    const res = await fetchWithToken(`${API_URL}/api/top/vote`, {
      method: "POST",
      body: JSON.stringify({ userId, playerId }),
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
