"use server";

import { API_URL } from "@/lib/env";
import { fetchWithToken } from "@/lib/fetch-with-token";
import { handleResponse } from "./utils";

export const fetchTransfers = async () => {
  try {
    const res = await fetchWithToken(`${API_URL}/api/transfer`, {
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

export const fetchTransferById = async (id) => {
  try {
    const res = await fetchWithToken(`${API_URL}/api/transfer/each/${id}`, {
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

export const createTransfer = async (transferData) => {
  try {
    const res = await fetchWithToken(`${API_URL}/api/transfer`, {
      method: "POST",
      body: transferData,
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

export const updateTransfer = async (id, updatedData) => {
  try {
    const res = await fetchWithToken(`${API_URL}/api/transfer/${id}`, {
      method: "PUT",
      body: updatedData,
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

export const deleteTransfer = async (id) => {
  try {
    const res = await fetchWithToken(`${API_URL}/api/transfer/${id}`, {
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
