import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { adminSlice } from "./Slice/AdminSlice";
import { artistSlice } from "./Slice/ArtistSlice";
import { userSlice } from "./Slice/UserSlice";
import { songSlice } from "./Slice/SongSlice";
const persistConfig = {
  key: "root",
  version: 1,
  storage,
};
const AdminpersistedReducer = persistReducer(persistConfig, adminSlice.reducer);
const ArtistpersistedReducer = persistReducer(
  persistConfig,
  artistSlice.reducer
);
const UserpersistedReducer = persistReducer(persistConfig, userSlice.reducer);
const SongpersistedReducer = persistReducer(persistConfig, songSlice.reducer);

export const store = configureStore({
  reducer: {
    userLogin: UserpersistedReducer,
    adminLogin: AdminpersistedReducer,
    artistLogin: ArtistpersistedReducer,
    setSong: SongpersistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
