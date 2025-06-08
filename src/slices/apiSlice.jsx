import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

//Consts
const BASE_URL = import.meta.env.VITE_API_URL;

//Slice
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().tikera.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Movies", "Screenings", "UserInfo"],
  endpoints: (build) => ({
    login: build.mutation({
      query: ({ email, password }) => ({
        url: `/login`,
        method: "POST",
        body: {
          email,
          password,
        },
      }),
      invalidatesTags: ["UserInfo"],
    }),
    register: build.mutation({
      query: ({ name, email, password, password_confirmation }) => ({
        url: `/register`,
        method: "POST",
        body: {
          name,
          email,
          password,
          password_confirmation,
        },
      }),
      invalidatesTags: ["UserInfo"],
    }),
    getMoviesByWeek: build.query({
      query: (weekNumber) => `/movies/week?week_number=${weekNumber}`,
      providesTags: ["Movies"],
    }),
    getSingleMovie: build.query({
      query: (movieId) => `/movies/${movieId}`,
      providesTags: ["Movies", "Screenings"],
    }),
    createBooking: build.mutation({
      query: ({ screening_id, seats, ticket_types }) => ({
        url: `/bookings`,
        method: "POST",
        body: {
          screening_id,
          seats,
          ticket_types,
        },
      }),
      invalidatesTags: ["Screenings"],
    }),
    getUserBookings: build.query({
      query: () => `/bookings`,
      providesTags: ["Movies", "Screenings", "UserInfo"],
    }),
  }),
});

//Hooks
export const {
  useLoginMutation,
  useRegisterMutation,
  useGetMoviesByWeekQuery,
  useGetSingleMovieQuery,
  useCreateBookingMutation,
  useGetUserBookingsQuery,
} = apiSlice;
