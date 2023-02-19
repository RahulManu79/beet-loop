import React, { useState, useEffect } from "react";
import "./Adminlogin.css";
import img from "../../assets/register_img.png";
import { TextFiledCustom } from "../../ui/TextField";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

import { useForm } from "react-hook-form";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
function AdminLogin() {
  const navigate = useNavigate();
  const [error, setbError] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [loged, setLoged] = useState(false);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (error) {
      setOpen(true);
    }
  }, [error]);

  useEffect(() => {
    if (loged) {
      setOpen(true);
    }
  }, [loged]);

  const formValidate = (error) => {
    if (!Object.keys(error).length) return;
    if (error?.email) {
      setError("registerInput", {
        type: "custom",
        message: "Incorrect email",
      });
      setOpen(true);
    } else if (error?.password) {
      setError("registerInput", {
        type: "custom",
        message: "Invalid password",
      });
      setOpen(true);
    }
  };

  useEffect(() => {
    formValidate(errors);
  }, [errors?.email, errors?.password]);

  const onSubmit = (data) => {
    console.log(data);
    let email = data.email;
    let password = data.password;
    try {
      setError(null);
      setLoged(false);
      axios
        .post("http://localhost:4000/admin/login", {
          email,
          password,
        })
        .then((response) => {
          let result = response.data;
          if (result.success) {
            setLoged(true);
            navigate("/admin/home");
            localStorage.setItem("token", response.data.data);
          } else {
            setbError(response.data.message);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };
  console.log({ error });
  return (
    <>
      <div className="gradient flex justify-center content-center">
        <div className="inner bg-[#070527] w-3/4 h-4/5 flex justify-center content-center rounded-xl shadow-lime-900">
          <div className="w-6/12 h-full flex justify-center content-center p-24">
            <img src={img} alt="" />
          </div>
          <div className="flex justify-center mb-10 mr-8">
            <div className=" w-8/12 flex flex-col justify-center content-center">
              <div className="flex justify-center content-center text-white font-bold text-2xl mb-14">
                <h1>Welcome Admin</h1>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex justify-center content-center">
                  <TextFiledCustom
                    id="standard-basic"
                    label="Email"
                    variant="standard"
                    type="email"
                    color="secondary"
                    name="email"
                    {...register("email", {
                      required: true,
                      maxLength: 20,
                    })}
                    sx={{
                      width: 500,
                      maxWidth: "65%",
                    }}
                    required
                  />
                </div>
                <div className="flex justify-center content-center mt-6">
                  <TextFiledCustom
                    id="standard-basic"
                    label="Password"
                    variant="standard"
                    color="secondary"
                    type="Password"
                    name="password"
                    {...register("password", {
                      required: true,
                      minLength: 6,
                    })}
                    sx={{
                      width: 500,
                      maxWidth: "65%",
                    }}
                    required
                  />
                </div>
                <div className="flex justify-center mt-6">
                  <Button variant="contained" type="submit" color="success">
                    Login Now
                  </Button>
                </div>
              </form>
            </div>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
              <Alert
                onClose={handleClose}
                severity="error"
                sx={{ width: "100%" }}
              >
                {error ? error : errors?.registerInput?.message}
              </Alert>
            </Snackbar>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminLogin;
