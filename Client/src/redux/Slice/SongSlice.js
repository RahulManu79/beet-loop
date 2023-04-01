import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  songURL: null,
  img: null,
  song: null,
};

export const songSlice = createSlice({
  name: "song",
  initialState,
  reducers: {
    setSongURL: (state, action) => {
      state.songURL = action.payload.songURL;
    },
    setImageURL: (state, action) => {
      state.img = action.payload.img;
    },
    setSongDetails: (state, action) => {
      state.song = action.payload.song;
    },
  },
});

export const { setSongURL, setImageURL, setSongDetails } = songSlice.actions;

export default songSlice.reducer;
