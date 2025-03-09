/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createApi,
  fetchBaseQuery,
  BaseQueryFn,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import store from 'store';

import { ErrorResponse } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  localApiUrl,
  stagingApiUrl,
} from '@/constants/environments.constants';

const prepareHeaders = (headers: Headers) => {
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('token') || store.get('token');
  const csrfToken = urlParams.get('csrfToken') || store.get('csrfToken');
  if (token) {
    headers.set('authorization', `Bearer ${token}`);
    headers.set('X-CSRF-TOKEN', csrfToken);
  }
  return headers;
};

// COMMON ERROR HANDLING FUNCTION
const handleQueryError = (
  result: { error?: FetchBaseQueryError },
) => {
  if (result.error) {
    if (Number(result.error.status) === 500) {
      toast.error('An error occurred. Please try again later.');
      return result;
    } else {
      toast.error(
        (result.error as ErrorResponse)?.data?.message || 'An error occurred'
      );
    }
  }
  return result;
};

export const baseQuery = fetchBaseQuery({
  baseUrl: localApiUrl || stagingApiUrl,
  prepareHeaders,
});

export const baseQueryWithReauth: BaseQueryFn = async (
  args: any,
  api: any,
  extraOptions: any
) => {
  // eslint-disable-next-line prefer-const
  let result = await baseQuery(args, api, extraOptions);
  if (result.error) {
    handleQueryError(result);
  }
  return result;
};

export const rootApiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});
