import React from "react";
import { Route, Routes } from "react-router-dom";

import Signoptins from "../Pages/common Pages/Signoptins";
import UserHome from "../Pages/user/UserHome";
import UserLogin from "../Pages/user/UserLogin";
import Userregister from "../Pages/user/Userregister";
import ProtectedRoute from "../Components/ProtectedRoute";
import PublicRoute from "../Components/PublicRoute";
import Userprofile from "../Pages/user/Userprofile";
import UserProfileEdit from "../Pages/user/UserProfileEdit";
import UserPlayList from "../Pages/user/UserPlayList";
import UserForgotPass from "../Pages/common Pages/UserForgotPass";
import UserMusic from "../Pages/user/UserMusic";
import UserPremium from "../Pages/user/UserPremium";
import YourLibrary from "../Pages/user/YourLibrary";
import PlayLitView from "../Pages/user/PlayLitView";
import UserFollowArtist from "../Pages/user/UserFollowArtist";
import UserFavoritesPage from "../Pages/user/UserFavouritesPage";

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
        path="/music"
        element={
          <ProtectedRoute>
            <UserMusic />
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

      <Route
        path="/forgotpassword"
        element={
          <PublicRoute>
            <UserForgotPass />
          </PublicRoute>
        }
      />

      <Route
        path="/plans"
        element={
          <ProtectedRoute>
            <UserPremium />
          </ProtectedRoute>
        }
      />
      <Route
        path="/collection"
        element={
          <ProtectedRoute>
            <YourLibrary />
          </ProtectedRoute>
        }
      />
      <Route
        path="/playlist-view"
        element={
          <ProtectedRoute>
            <PlayLitView />
          </ProtectedRoute>
        }
      />
      <Route
        path="/list-artist"
        element={
          <ProtectedRoute>
            <UserFollowArtist />
          </ProtectedRoute>
        }
      />
      <Route
        path="/favorites"
        element={
          <ProtectedRoute>
            <UserFavoritesPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default User;
