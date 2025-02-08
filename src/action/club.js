"use server";

import { API_URL } from "@lib/env";
import { fetchWithToken } from "@lib/fetch-with-token";
import { handleResponse } from "./utils";

// Fetch all club news
export const fetchAllClubNews = async () => {
  try {
    const res = await fetchWithToken(`${API_URL}/api/clubnews`, {
      method: "GET",
    });
    return handleResponse(res);
  } catch (error) {
    return { success: false, statusCode: 700, data: error };
  }
};

// Fetch a single club news item by ID
export const fetchClubNewsById = async (id) => {
  try {
    const res = await fetchWithToken(`${API_URL}/api/clubnews/each/${id}`, {
      method: "GET",
    });
    return handleResponse(res);
  } catch (error) {
    return { success: false, statusCode: 700, data: error };
  }
};

// Create a new club news item
export const createClubNews = async (formData) => {
  try {
    const res = await fetchWithToken(`${API_URL}/api/clubnews`, {
      method: "POST",
      body: formData,
    });

    return handleResponse(res);
  } catch (error) {
    return { success: false, statusCode: 700, data: error };
  }
};

// Update a club news item
export const updateClubNews = async (id, updatedData) => {
  try {
    await fetchWithToken(`${API_URL}/api/clubnews/${id}`, {
      method: "PUT",
      body: updatedData,
    });

    const res = await fetchWithToken(`${API_URL}/api/clubnews/each/${id}`, {
      method: "GET",
    });

    return handleResponse(res);
  } catch (error) {
    return { success: false, statusCode: 700, data: error };
  }
};

// Delete a club news item
export const deleteClubNews = async (id) => {
  try {
    await fetchWithToken(`${API_URL}/api/clubnews/${id}`, {
      method: "DELETE",
    });

    return { success: true };
  } catch (error) {
    return { success: false, statusCode: 700, data: error };
  }
};
