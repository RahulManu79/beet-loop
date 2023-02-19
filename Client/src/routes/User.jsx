import React from "react";
import { Route, Routes } from "react-router-dom";

import Signoptins from "../Pages/Signoptins";
import UserHome from "../Pages/UserHome";
import UserLogin from "../Pages/UserLogin";
import Userregister from "../Pages/Userregister";
import ProtectedRoute from "../Components/ProtectedRoute";
import PublicRoute from "../Components/PublicRoute";

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
    </Routes>
  );
}

export default User;
