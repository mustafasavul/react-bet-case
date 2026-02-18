import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const bettingApi = createApi({
  reducerPath: "bettingApi",
  baseQuery: fetchBaseQuery({ baseUrl: "" }),
  endpoints: (builder) => ({
    getMatches: builder.query<any, void>({
      query: () => "/matches",
    }),
  }),
});

export const { useGetMatchesQuery } = bettingApi;