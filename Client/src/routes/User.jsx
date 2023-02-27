import React from "react";
import { Route, Routes } from "react-router-dom";

import Signoptins from "../Pages/Signoptins";
import UserHome from "../Pages/UserHome";
import UserLogin from "../Pages/UserLogin";
import Userregister from "../Pages/Userregister";
import ProtectedRoute from "../Components/ProtectedRoute";
import PublicRoute from "../Components/PublicRoute";
import Userprofile from "../Pages/Userprofile";
import UserProfileEdit from "../Pages/UserProfileEdit";
import UserPlayList from "../Pages/UserPlayList";

function User() {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <PublicRoute>
            <UserLogin />
          </PublicRoute>
        }
      />
      <Route
        path="/signoptions"
        element={
          <PublicRoute>
            <Signoptins />
          </PublicRoute>
        }
      />
      <Route
        path="/userregister"
        element={
          <PublicRoute>
            <Userregister />
          </PublicRoute>
        }
      />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <UserHome />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Userprofile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile/edit"
        element={
          <ProtectedRoute>
            <UserProfileEdit />
          </ProtectedRoute>
        }
      />

      <Route
        path="/playlist"
        element={
          <ProtectedRoute>
            <UserPlayList />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default User;
