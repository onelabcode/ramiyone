"use server";

import { API_URL } from "@lib/env";
import { fetchWithToken } from "@lib/fetch-with-token";
import { handleResponse } from "./utils";

// Sign up a new user
export const signup = async (email, password, username) => {
  try {
    const res = await fetchWithToken(`${API_URL}/api/auth/signup`, {
      method: "POST",
      body: JSON.stringify({ email, password, username }),
    });

    return handleResponse(res);
  } catch (error) {
    return { success: false, statusCode: 700, data: error };
  }
};

// Log in a user
export const login = async (email, password) => {
  try {
    const res = await fetchWithToken(`${API_URL}/api/auth/login`, {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    return handleResponse(res);
  } catch (error) {
    return { success: false, statusCode: 700, data: error };
  }
};

// Log out a user
export const logout = async () => {
  try {
    await fetchWithToken(`${API_URL}/api/auth/logout`, {
      method: "POST",
    });

    return { success: true };
  } catch (error) {
    return { success: false, statusCode: 700, data: error };
  }
};

// Refresh authentication token
export const refreshToken = async () => {
  try {
    await fetchWithToken(`${API_URL}/api/auth/refreshtoken`, {
      method: "GET",
    });

    return { success: true };
  } catch (error) {
    return { success: false, statusCode: 700, data: error };
  }
};

// Get user profile
export const getProfile = async () => {
  try {
    const res = await fetchWithToken(`${API_URL}/api/auth/profile`, {
      method: "GET",
      credentials: "include",
    });

    return handleResponse(res);
  } catch (error) {
    return { success: false, statusCode: 700, data: error };
  }
};

// Get all non-admin users
export const getNonAdminUsers = async () => {
  try {
    const res = await fetchWithToken(`${API_URL}/api/auth`, {
      method: "GET",
    });

    return handleResponse(res);
  } catch (error) {
    return { success: false, statusCode: 700, data: error };
  }
};

// Delete a user
export const deleteUser = async (userId) => {
  try {
    await fetchWithToken(`${API_URL}/api/auth/${userId}`, {
      method: "DELETE",
    });

    return { success: true };
  } catch (error) {
    return { success: false, statusCode: 700, data: error };
  }
};

// Update a user's role
export const updateUser = async (userId, role) => {
  try {
    await fetchWithToken(`${API_URL}/api/auth/${userId}`, {
      method: "PUT",
      body: JSON.stringify({ role }),
    });

    return { success: true };
  } catch (error) {
    return { success: false, statusCode: 700, data: error };
  }
};
