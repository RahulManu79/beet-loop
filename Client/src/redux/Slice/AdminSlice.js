import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  admin: null,
  name: null,
  token: null,
};

export const adminSlice = createSlice({
  name: "Admin",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.admin = action.payload.admin;
      state.name = action.payload.name;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.admin = null;
      state.name = null;
      state.token = null;
    },
  },
});

export const { setLogin, setLogout } = adminSlice.actions;

export default adminSlice.reducer;
