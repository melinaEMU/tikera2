import { createSlice } from "@reduxjs/toolkit";

//Token from Localstorage
const nameFromStorage = localStorage.getItem("tikeraName");
const emailFromStorage = localStorage.getItem("tikeraEmail");
const roleFromStorage = localStorage.getItem("tikeraRole");
const tokenFromStorage = localStorage.getItem("tikeraToken");

//Consts
const initialState = {
  name: nameFromStorage || null,
  email: emailFromStorage || null,
  role: roleFromStorage || null,
  token: tokenFromStorage || null,
  page: null,
};

//Slice
const tikeraSlice = createSlice({
  name: "tikera",
  initialState,
  reducers: {
    changePage: (state, { payload: newPage }) => {
      state.page = newPage;
    },
    login: (state, { payload: { name, email, role, token } }) => {
      state.name = name;
      state.email = email;
      state.role = role;
      state.token = token;
      localStorage.setItem("tikeraName", name);
      localStorage.setItem("tikeraEmail", email);
      localStorage.setItem("tikeraRole", role);
      localStorage.setItem("tikeraToken", token);
    },
    logout: (state) => {
      state.name = null;
      state.email = null;
      state.role = null;
      state.token = null;
      localStorage.removeItem("tikeraName");
      localStorage.removeItem("tikeraEmail");
      localStorage.removeItem("tikeraRole");
      localStorage.removeItem("tikeraToken");
    },
  },
});

//Actions
export const { changePage, login, logout } = tikeraSlice.actions;

//Selectors
export const selectName = (state) => state.tikera.name;
export const selectEmail = (state) => state.tikera.email;
export const selectRole = (state) => state.tikera.role;
export const selectToken = (state) => state.tikera.token;
export const selectPage = (state) => state.tikera.page;

//Reducer
export const tikeraReducer = tikeraSlice.reducer;
