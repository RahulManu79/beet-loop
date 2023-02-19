import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminHome from "../Pages/AdminHome";
import AdminUserlist from "../Pages/AdminUserlist";
import LoginAdmin from "../Pages/LoginAdmin";
function Admin() {
  return (
    <Routes>
      <Route path="/login" element={<LoginAdmin />} />
      <Route path="/home" element={<AdminHome />} />
      <Route path="/userList" element={<AdminUserlist />} />
    </Routes>
  );
}

export default Admin;
