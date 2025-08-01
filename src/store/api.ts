import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface DashboardData {
    users: number;
    notesToday: number;
    challenge: number;
}

export interface User {
    id: string;
    name: string;
    email: string;
    hashedPassword: string;
    role: 'A' | 'U';
}

export interface Challenge {
    id: string;
    title: string;
    description: string;
    username: string;
    userId?: string;
    createdAt: string;
}

export interface ChallengeLog {
    id: string;
    challengeId: string;
    userId: string;
    action: 'created' | 'updated' | 'deleted';
    details?: string;
    createdAt: string;
    updatedAt: string;
}

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
    tagTypes: ['Dashboard', 'Users'],
    endpoints: (builder) => ({
        getDashboardData: builder.query<DashboardData, void>({
            query: () => 'dashboard',
            providesTags: ['Dashboard'],
        }),

        createUser: builder.mutation<void, Partial<User>>({
            query: (user) => ({
                url: 'user',
                method: 'POST',
                body: user,
            }),
            invalidatesTags: ['Users'],
        }),

        getUsers: builder.query<User[], void>({
            query: () => 'user',
            providesTags: ['Users'],
        }),

        deleteUser: builder.mutation<void, string>({
            query: (id) => ({
                url: `user/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Users'],
        }),

        updateUser: builder.mutation<void, { id: string; data: Partial<User> }>({
            query: ({ id, data }) => ({
                url: `user/${id}`,
                method: 'PUT',
                body: data,
            }),
        }),

        getChallenge: builder.query<Challenge[], void>({
            query: () => 'challenge',
            providesTags: ['Dashboard'],
        }),

        createChallenge: builder.mutation<void, Partial<Challenge>>({
            query: (challenge) => ({
                url: 'challenge',
                method: 'POST',
                body: challenge,
            }),
            invalidatesTags: ['Dashboard'],
        }),

        updateChallenge: builder.mutation<void, { id: string; data: Partial<Challenge> }>({
            query: ({ id, data }) => ({
                url: `challenge/${id}`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: ['Dashboard'],
        }),

        deleteChallenge: builder.mutation<void, string>({
            query: (id) => ({
                url: `challenge/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Dashboard'],
        }),

        getChallengeLogs: builder.query<ChallengeLog[], void>({
            query: () => 'challenge/logs',
            providesTags: ['Dashboard'],
        })
    }),
});

export const {
    useGetDashboardDataQuery,
    useGetUsersQuery,
    useCreateUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation,
    useGetChallengeQuery,
    useCreateChallengeMutation,
    useUpdateChallengeMutation,
    useDeleteChallengeMutation,
} = api