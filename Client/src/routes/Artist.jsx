import React from "react";
import { Route, Routes } from "react-router-dom";
import ArtistHome from "../Pages/Artist/ArtistHome";
import ArtistLogin from "../Pages/Artist/ArtistLogin";
import ArtistRegister from "../Pages/Artist/ArtistRegister";
import ArtistAddMusic from "../Pages/Artist/ArtistAddMusic";
import ProtectedRoute from "../Components/ProtectedRoute";
import PublicRoute from "../Components/PublicRoute";
import ArtistMusic from "../Pages/Artist/ArtistMusic";
import ArtistAddAlbum from "../Pages/Artist/ArtistaddAlbum";
import ArtistProfilepage from "../Pages/Artist/ArtistProfilepage";
import ArtistEditProfilePage from "../Pages/Artist/ArtistEditProfile";
const Artist = () => {
  return (
    <Routes>
      <Route
        path="/register"
        element={
          <PublicRoute>
            <ArtistRegister />
          </PublicRoute>
        }
      />
      <Route
        path="/login"
        element={
          <PublicRoute>
            <ArtistLogin />
          </PublicRoute>
        }
      />
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <ArtistHome />
          </ProtectedRoute>
        }
      />

      <Route
        path="/addmusic"
        element={
          <ProtectedRoute>
            <ArtistAddMusic />
          </ProtectedRoute>
        }
      />

      <Route
        path="/music"
        element={
          <ProtectedRoute>
            <ArtistMusic />
          </ProtectedRoute>
        }
      />
      <Route
        path="/add-album"
        element={
          <ProtectedRoute>
            <ArtistAddAlbum />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ArtistProfilepage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/edit-profile"
        element={
          <ProtectedRoute>
            <ArtistEditProfilePage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default Artist;
