import React from "react";
import { Route, Routes } from "react-router-dom";
import ArtistHome from "../Pages/ArtistHome";
import ArtistLogin from "../Pages/ArtistLogin";
import ArtistRegister from "../Pages/ArtistRegister";
import ProtectedRoute from "../Components/ProtectedRoute";
import PublicRoute from "../Components/PublicRoute";
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
    </Routes>
  );
};

export default Artist;
