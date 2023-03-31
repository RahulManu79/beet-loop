import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  name: null,
  token: null,
  id: null,
  pic: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.name = action.payload.name;
      state.token = action.payload.token;
      state.id = action.payload.id;
      state.pic = action.payload.pic;
    },
    setLogout: (state) => {
      state.user = null;
      state.name = null;
      state.token = null;
      state.id = null;
      state.pic = null;
    },
  },
});

export const { setLogin, setLogout } = userSlice.actions;

export default userSlice.reducer;
