import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://nesine-case-study.onrender.com',
    }),
    tagTypes: ['Match', 'Kupon', 'User'],
    endpoints: () => ({}),
});
