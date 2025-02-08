"use server";

import { API_URL } from "@lib/env";
import { fetchWithToken } from "@lib/fetch-with-token";
import { handleResponse } from "./utils";

export const getTutors = async () => {
  try {
    const res = await fetchWithToken(`${API_URL}/api/tutor`, {
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
