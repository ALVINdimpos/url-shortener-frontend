import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./rootApiSlice";

export const apiQuerySlice = createApi({
  reducerPath: "apiQuery",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    // FETCH URLS
    fetchUrls: builder.query({
      query: ({ page, size }) => ({
        url: "/urls",
        params: { page, size },
      }),
    }),

    // GET URL
    getUrl: builder.query({
      query: ({ shortCode }) => ({
        url: `/urls/${shortCode}`,
      }),
    }),

    // GET URL STATS
    getUrlStats: builder.query({
      query: ({ shortCode }) => ({
        url: `/urls/stats/${shortCode}`,
      }),
    }),

    // GET USER BY ID
    getUserById: builder.query({
      query: ({ id }) => ({
        url: `/auth/users/${id}`,
      }),
    }),

    // LOGOUT
    logout: builder.query({
      query: () => ({
        url: "/auth/users/logout",
      }),
    }),

    // AUTHENTICATE WITH GOOGLE
    authenticateWithGoogle: builder.query({
      query: () => ({
        url: "/auth/users/google",
      }),
    }),

    // AUTHENTICATE WITH GOOGLE CALLBACK
    authenticateWithGoogleCallback: builder.query({
      query: () => ({
        url: "/auth/users/google/callback",
      }),
    }),

    // AUTHENTICATE WITH GITHUB
    authenticateWithGithub: builder.query({
      query: () => ({
        url: "/auth/users/github",
      }),
    }),

    // AUTHENTICATE WITH GITHUB CALLBACK
    authenticateWithGithubCallback: builder.query({
      query: () => ({
        url: "/auth/users/github/callback",
      }),
    }),
  }),
});

export const {
  useLazyFetchUrlsQuery,
  useLazyGetUrlQuery,
  useLazyGetUrlStatsQuery,
  useLazyGetUserByIdQuery,
  useLazyLogoutQuery,
  useLazyAuthenticateWithGoogleQuery,
  useLazyAuthenticateWithGoogleCallbackQuery,
  useLazyAuthenticateWithGithubQuery,
  useLazyAuthenticateWithGithubCallbackQuery,
} = apiQuerySlice;

export default apiQuerySlice;
