"use server";

import { API_URL } from "@/lib/env";
import { fetchWithToken } from "@/lib/fetch-with-token";
import { handleResponse } from "./utils";

export const fetchBlogs = async () => {
  try {
    const res = await fetchWithToken(`${API_URL}/api/blog`, {
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

export const fetchBlogById = async (id) => {
  try {
    const res = await fetchWithToken(`${API_URL}/api/blog/each/${id}`, {
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

export const createBlog = async (blogData) => {
  try {
    const res = await fetchWithToken(`${API_URL}/api/blog`, {
      method: "POST",
      body: blogData,
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

export const updateBlog = async (id, updatedData) => {
  try {
    const res = await fetchWithToken(`${API_URL}/api/blog/${id}`, {
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

export const deleteBlog = async (id) => {
  try {
    const res = await fetchWithToken(`${API_URL}/api/blog/${id}`, {
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

export const fetchFeaturedBlogs = async () => {
  try {
    const res = await fetchWithToken(`${API_URL}/api/blog/featured`, {
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

export const toggleFeaturedBlog = async (id) => {
  try {
    const res = await fetchWithToken(
      `${API_URL}/api/blog/${id}/toggle-featured`,
      {
        method: "PUT",
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

export const fetchRecommendedBlogs = async () => {
  try {
    const res = await fetchWithToken(`${API_URL}/api/blog/recommended`, {
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
