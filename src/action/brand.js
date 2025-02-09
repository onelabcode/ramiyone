"use server";

import { API_URL } from "@/lib/env";
import { fetchWithToken } from "@/lib/fetch-with-token";
import { handleResponse } from "./utils";

// Fetch all brands
export const fetchBrands = async () => {
  try {
    const res = await fetchWithToken(`${API_URL}/api/brand`, {
      method: "GET",
    });
    return handleResponse(res);
  } catch (error) {
    return { success: false, statusCode: 700, data: error };
  }
};

// Fetch a single brand by ID
export const fetchBrandById = async (id) => {
  try {
    const res = await fetchWithToken(`${API_URL}/api/brand/${id}`, {
      method: "GET",
    });
    return handleResponse(res);
  } catch (error) {
    return { success: false, statusCode: 700, data: error };
  }
};

// Create a new brand
export const createBrand = async (brandData) => {
  try {
    const res = await fetchWithToken(`${API_URL}/api/brand`, {
      method: "POST",
      body: brandData,
    });

    return handleResponse(res);
  } catch (error) {
    return { success: false, statusCode: 700, data: error };
  }
};

// Update an existing brand
export const updateBrand = async (id, updatedData) => {
  try {
    await fetchWithToken(`${API_URL}/api/brand/${id}`, {
      method: "PUT",
      body: updatedData,
    });

    const res = await fetchWithToken(`${API_URL}/api/brand/${id}`, {
      method: "GET",
    });

    return handleResponse(res);
  } catch (error) {
    return { success: false, statusCode: 700, data: error };
  }
};

// Delete a brand
export const deleteBrand = async (id) => {
  try {
    await fetchWithToken(`${API_URL}/api/brand/${id}`, {
      method: "DELETE",
    });

    return { success: true };
  } catch (error) {
    return { success: false, statusCode: 700, data: error };
  }
};
