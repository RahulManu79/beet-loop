import React, { useState } from "react";
import SideBarAdmin from "../SideBar/AdminSideBar/SideBarAdmin";
// import { useFormik } from "formik";
import { postCategory } from "../../Api/Api";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
function Editctagory() {
  const [Category, setCategory] = useState("");
  const [description, setDiscription] = useState("");
  const [open, setOpen] = React.useState(false);
  const [erropen, seterrOpen] = React.useState(false);
  const [success, setSuccess] = useState(null);
  const [error, seterror] = useState(null);
  const navigate = useNavigate();
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const errhandleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    seterrOpen(false);
  };

  const handlesubmit = async (e) => {
    e.preventDefault();

    let obj = {
      Category: Category,
      discription: description,
    };

    let data = await postCategory(obj);
    console.log(data, "++++++");
    if (data.success == true) {
      setOpen(true);
      setSuccess(data.message);
      navigate("/admin/category");
    } else {
      seterrOpen(true);
      seterror(data.message);
    }
  };
  return (
    <div className="mainqq w-full h-screen flex">
      <div className="w-fit">
        <SideBarAdmin />
      </div>
      <div className="w-full h-screen flex items-center justify-center p-3 ">
        <div className="bg-[#ffffff22] w-full rounded-xl h-[70vh]">
          <div className="w-full h-28   flex flex-col gap-5 p-4">
            <h1 className="text-white font-bold text-2xl mt-4">Add Category</h1>
            <hr className="border border-white" />
          </div>
          <div className="w-full h-[52vh] p-4 flex flex-col">
            <form>
              <h3 className="text-white mb-2">Category Name:</h3>
              <input
                type="text"
                className="bg-transparent border border-white py-1 w-full text-white rounded-md"
                onChange={(e) => setCategory(e.target.value)}
              />
              <h3 className="text-white mt-5 mb-2">Description:</h3>
              <input
                type="text"
                multiple
                className="bg-transparent border border-white py-8 w-full text-white rounded-md"
                onChange={(e) => setDiscription(e.target.value)}
              />
              <button
                className="bg-[#75F94C] py-1 px-2 text-white rounded-lg  mt-5"
                type="submit"
                onClick={handlesubmit}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          {success}
        </Alert>
      </Snackbar>
      <Snackbar open={erropen} autoHideDuration={6000} onClose={errhandleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {error}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Editctagory;
