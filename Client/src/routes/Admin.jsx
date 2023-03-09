import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminAddCatagor from "../Pages/Admin/AdminAddCatagor";
import AdminCatagory from "../Pages/Admin/AdminCatagory";
import AdminHome from "../Pages/Admin/AdminHome";
import AdminUserlist from "../Pages/Admin/AdminUserlist";
import ArtistList from "../Pages/Admin/ArtistList";
import LoginAdmin from "../Pages/Admin/LoginAdmin";
function Admin() {
  return (
    <Routes>
      <Route path="/login" element={<LoginAdmin />} />
      <Route path="/home" element={<AdminHome />} />
      <Route path="/userList" element={<AdminUserlist />} />
      <Route path="/artists" element={<ArtistList />} />
      <Route path="/category" element={<AdminCatagory />} />
      <Route path="/addcategory" element={<AdminAddCatagor />} />
    </Routes>
  );
}

export default Admin;
