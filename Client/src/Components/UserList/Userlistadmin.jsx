import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import SideBarAdmin from "../SideBar/AdminSideBar/SideBarAdmin";
import "./Admin.css";
import { DataGrid } from "@mui/x-data-grid  ";
import { getUser } from "../../Api/Api";

const columns = [
  { field: "name", headerName: "Name", width: 130 },
  { field: "email", headerName: "Email", width: 130 },
  {
    field: "phone",
    headerName: "Phone",
    type: "number",
    width: 90,
  },
  {
    field: "createdAt",
    headerName: "Joined Date",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
  },
  {
    field: "isBanned",
    headerName: "Status",
    width: 150,
    editable: true,
    renderCell: (params) => (
      <div>
        {!params.row.isBanned ? (
          <p className="text-green-500 py-1 px-3 font-bold">Active</p>
        ) : (
          <p className="text-red-600 py-1 px-3 font-bold">Inactive</p>
        )}
      </div>
    ),
  },
  {
    field: "Action",
    headerName: "Action",
    width: 150,
    editable: true,
    renderCell: (params) => (
      <div>
        {!params.row.isBanned ? (
          <button
            type="button"
            className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-4 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            onClick={() => {
              userBlk(params.row._id);
            }}
          >
            Block
          </button>
        ) : (
          <button
            type="button"
            className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2  dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            onClick={() => {
              userBlk(params.row._id);
            }}
          >
            Unblock
          </button>
        )}{" "}
      </div>
    ),
  },
];

function Userlistadmin() {
  const [user, setUser] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    async function invoke() {
      const data = await getUser();
      if (data.status === "failed") {
        navigate("admin/login");
      } else {
        setUser(data.users);
      }
    }
    invoke();
  }, []);
  console.log(user);
  return (
    <div className="main min-h-[100vh] flex">
      <div className="bg-white w-72">
        <SideBarAdmin />
      </div>
      <div className=" w-5/6 h-screen flex justify-center content-center mt-20 ">
        <div style={{ height: 500, width: "90%" }}>
          <DataGrid
            rows={user}
            columns={columns}
            pageSize={8}
            rowsPerPageOptions={[5]}
            getRowId={(users) => users._id}
          />
        </div>
      </div>
    </div>
  );
}

export default Userlistadmin;
