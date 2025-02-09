"use server";
import { headers } from "next/headers";
/**
 * Retrieves the authentication token from the cookies.
 *
 * @returns The authentication token if available, otherwise `undefined`.
 */
export const getHeaders = async () => {
  const headersList = Object.fromEntries(await headers());

  return headersList;
};

/**
 * Fetches a resource with an authentication token.
 *
 * @param {string | URL | Request} input The URL or the request object to fetch.
 * @param {RequestInit} init The request options to use.
 * @returns The response of the request.
 * @throws {Error} If there is no valid authentication token.
 */
export const fetchWithToken = async (input, init) => {
  const reqHeaders = await getHeaders();

  if (!init) {
    return fetch(input);
  }

  // Add the authentication token to the request headers.
  init.headers = {
    ...init.headers,
    ...reqHeaders,
  };

  // Perform the request.
  return fetch(input, init);
};
