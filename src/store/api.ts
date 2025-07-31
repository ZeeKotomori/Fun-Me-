import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface DashboardData {
    users: number;
    notesToday: number;
    leavesChallenge: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
    hashedPassword: string;
    role: 'A' | 'U';
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
    }),
});

export const {
    useGetDashboardDataQuery,
    useGetUsersQuery,
    useCreateUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation,
} = api