import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './rootApiSlice';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Auth'],
  endpoints: (builder) => ({
    // LOGIN
    login: builder.mutation({
      query: ({ email, password }) => ({
        url: '/auth/users/login',
        method: 'POST',
        body: { email, password },
      }),
      invalidatesTags: ['Auth'],
    }),

    // SIGNUP
    signup: builder.mutation({
      query: ({ email, password, username }) => ({
        url: '/auth/users',
        method: 'POST',
        body: { email, password, username },
      }),
      invalidatesTags: ['Auth'],
    }),

    // SHORTEN URL
    shortenUrl: builder.mutation({
      query: ({ long_url }) => ({
        url: '/urls/shorten',
        method: 'POST',
        body: { long_url },
      }),
    }),

    // DELETE URL
    deleteUrl: builder.mutation({
      query: ({ short_code }) => ({
        url: `/urls/${short_code}`,
        method: 'DELETE',
      }),
    }),
  }),
})

export const {
  useLoginMutation,
  useSignupMutation,
  useShortenUrlMutation,
  useDeleteUrlMutation,
} = apiSlice;

export default apiSlice;
