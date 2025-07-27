import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface DashboardData {
    users: number;
    notesToday : number;
    leavesChallenge : string;
}

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
    endpoints: (builder) => ({
        getDashboardData: builder.query<DashboardData, void>({
            query: () => 'dashboard',
        }),
    }),
})

export const { useGetDashboardDataQuery } = api;