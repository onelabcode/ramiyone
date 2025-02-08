"use server";

import { auth } from "@lib/auth/auth";

/**
 * Retrieves the authentication token from the cookies.
 *
 * @returns The authentication token if available, otherwise `undefined`.
 */
const getToken = async () => {
  const authToken = await auth();

  return authToken?.user?.accessToken
    ? `Bearer ${authToken.user?.accessToken}`
    : undefined;
};

/**
 * Fetches a resource with an authentication token.
 *
 * @param input The URL or the request object to fetch.
 * @param init The request options to use.
 * @returns The response of the request.
 * @throws {Error} If there is no valid authentication token.
 */
export const fetchWithToken = async (input, init) => {
  const bearerToken = await getToken();

  if (!bearerToken) {
    throw new Error("Unauthorized. No token found.");
  }

  if (!init) {
    return fetch(input);
  }

  // Add the authentication token to the request headers.
  init.headers = {
    ...init.headers,
    Authorization: bearerToken,
  };

  // Perform the request.
  return fetch(input, init);
};
