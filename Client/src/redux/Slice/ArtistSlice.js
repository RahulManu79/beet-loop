import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  artist: null,
  name: null,
  token: null,
};

export const artistSlice = createSlice({
  name: "artist",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.artist = action.payload.artist;
      state.name = action.payload.name;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.artist = null;
      state.name = null;
      state.token = null;
    },
  },
});

export const { setLogin, setLogout } = artistSlice.actions;

export default artistSlice.reducer;
