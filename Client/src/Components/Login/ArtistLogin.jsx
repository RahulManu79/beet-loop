/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from "react";
import "./UserLogin.css";
import loginImage from "../../assets/james-owen-c-NBiJrhwdM-unsplash.jpg";
import { TextFiledCustom } from "../../ui/TextField";
import Button from "@mui/material/Button";
import {} from "react-icons";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useDispatch } from "react-redux";
import { setLogin } from "../../redux/Slice/ArtistSlice";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function LoginArtist() {
  const navigate = useNavigate();
  const [error, setbError] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [loged, setLoged] = useState(false);
  const dispatch = useDispatch();

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
    let email = data.email;
    let password = data.password;
    try {
      setError(null);
      setLoged(false);
      axios
        .post("http://localhost:4000/artist/login", {
          email,
          password,
        })
        .then((response) => {
          let result = response.data;
          console.log(result);
          if (result.success) {
            setLoged(true);
            dispatch(
              setLogin({
                user: "user",
                name: result.name,
                token: result.token,
                id: result.id,
              })
            );
            navigate("/artist/home");
            localStorage.setItem("token", response.data.data);
          } else {
            setbError(response.data.message);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="login min-h-[100vh] bg-[#0F1F32]  flex justify-center content-center ">
        <div className="innerbox bg-[#152537] p-10 shadow">
          <div className="w-full flex justify-center">
            <div className="hidden md:flex justify-center md:w-5/12 h-full ">
              <img className="h-full" src={loginImage} alt="" />
            </div>
            <div className="w-full md:w-7/12 h-full mt-3 ">
              <div className="flex  text-white justify-center font-semibold mt-5">
                <h1 className="text-2xl ">Welcome Artist</h1>
              </div>
              <div className="flex flex-col mt-8 ">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="flex justify-center ml-1">
                    <TextFiledCustom
                      id="standard-basic"
                      label="Email"
                      variant="standard"
                      type="email"
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
                  {/* {errors.email && {setOpen(true)}} */}

                  <div className="flex justify-center ml-1 mt-5">
                    <TextFiledCustom
                      id="standard-basic"
                      label="Password"
                      variant="standard"
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
                    <Button variant="contained" type="submit">
                      Login Now
                    </Button>
                  </div>
                </form>
                <div>
                  <Link to="/forgotpassword">
                    <p className="underline text-center text-white mt-6">
                      Forgot Password ?
                    </p>
                  </Link>
                  <Link to="/signoptions">
                    <p className="underline text-center text-white mt-6">
                      Don't Have An Account? Register Here
                    </p>
                  </Link>
                </div>
                {loged ? (
                  <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                  >
                    <Alert
                      onClose={handleClose}
                      severity="success"
                      sx={{ width: "100%" }}
                    >
                      {loged}
                    </Alert>
                  </Snackbar>
                ) : (
                  <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                  >
                    <Alert
                      onClose={handleClose}
                      severity="error"
                      sx={{ width: "100%" }}
                    >
                      {error ? error : errors?.registerInput?.message}
                    </Alert>
                  </Snackbar>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginArtist;
