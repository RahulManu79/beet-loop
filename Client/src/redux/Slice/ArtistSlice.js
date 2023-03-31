import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  artist: null,
  name: null,
  token: null,
  id: null,
  pic: null,
};

export const artistSlice = createSlice({
  name: "artist",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.artist = action.payload.artist;
      state.name = action.payload.name;
      state.token = action.payload.token;
      state.id = action.payload.id;
      state.pic = action.payload.pic;
    },
    setLogout: (state) => {
      state.artist = null;
      state.name = null;
      state.token = null;
      state.id = null;
      state.pic = null;
    },
  },
});

export const { setLogin, setLogout } = artistSlice.actions;

export default artistSlice.reducer;
