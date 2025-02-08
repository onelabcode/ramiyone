"use server";

import { API_URL } from "@lib/env";
import { fetchWithToken } from "@lib/fetch-with-token";
import { handleResponse } from "./utils";

// Fetch all managers
export const fetchAllManagers = async () => {
  try {
    const res = await fetchWithToken(`${API_URL}/api/manager`, {
      method: "GET",
    });
    return handleResponse(res);
  } catch (error) {
    return { success: false, statusCode: 700, data: error };
  }
};

// Fetch the latest featured manager
export const fetchLatestFeaturedManager = async () => {
  try {
    const res = await fetchWithToken(`${API_URL}/api/manager/featured`, {
      method: "GET",
    });
    return handleResponse(res);
  } catch (error) {
    return { success: false, statusCode: 700, data: error };
  }
};

// Fetch a single manager by ID
export const fetchManagerById = async (id) => {
  try {
    const res = await fetchWithToken(`${API_URL}/api/manager/each/${id}`, {
      method: "GET",
    });
    return handleResponse(res);
  } catch (error) {
    return { success: false, statusCode: 700, data: error };
  }
};

// Create a new manager
export const createManager = async (formData) => {
  try {
    const res = await fetchWithToken(`${API_URL}/api/manager`, {
      method: "POST",
      body: formData,
    });

    return handleResponse(res);
  } catch (error) {
    return { success: false, statusCode: 700, data: error };
  }
};

// Update a manager
export const updateManager = async (id, updatedData) => {
  try {
    await fetchWithToken(`${API_URL}/api/manager/${id}`, {
      method: "PUT",
      body: updatedData,
    });

    const res = await fetchWithToken(`${API_URL}/api/manager/each/${id}`, {
      method: "GET",
    });

    return handleResponse(res);
  } catch (error) {
    return { success: false, statusCode: 700, data: error };
  }
};

// Update a manager's featured status
export const updateManagerFeaturedStatus = async (id, is_featured) => {
  try {
    await fetchWithToken(`${API_URL}/api/manager/featured/${id}`, {
      method: "PUT",
      body: JSON.stringify({ is_featured }),
      headers: { "Content-Type": "application/json" },
    });

    const res = await fetchWithToken(`${API_URL}/api/manager/each/${id}`, {
      method: "GET",
    });

    return handleResponse(res);
  } catch (error) {
    return { success: false, statusCode: 700, data: error };
  }
};

// Delete a manager
export const deleteManager = async (id) => {
  try {
    await fetchWithToken(`${API_URL}/api/manager/${id}`, {
      method: "DELETE",
    });

    return { success: true };
  } catch (error) {
    return { success: false, statusCode: 700, data: error };
  }
};
