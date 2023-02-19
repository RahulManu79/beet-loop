import React, { useState, useEffect } from "react";
import loginImage from "../../assets/james-owen-c-NBiJrhwdM-unsplash.jpg";
import { TextFiledCustom } from "../../ui/TextField";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function UserRegister() {
  const navigate = useNavigate();
  const [error, setbError] = useState(null);
  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    if (error) {
      setOpen(true);
    }
  }, [error]);

  const {
    setError,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
    } else if (error?.phone) {
      setError("registerInput", {
        type: "custom",
        message: "Must be a valid Number",
      });
      setOpen(true);
    } else if (error?.name) {
      setError("registerInput", {
        type: "custom",
        message: "Name canot be empty",
      });
      setOpen(true);
    } else if (error?.ConfirmPassword) {
      setError("registerInput", {
        type: "custom",
        message: "Password must be same",
      });
      setOpen(true);
    }
  };

  useEffect(() => {
    formValidate(errors);
  }, [
    errors?.email,
    errors?.password,
    errors?.name,
    errors?.phone,
    errors?.ConfirmPassword,
  ]);

  const onSubmit = async (data) => {
    try {
      console.log(data);
      let name = data.name;
      let email = data.email;
      let phone = data.phone;
      let password = data.password;
      let ConfirmPassword = data.confirmpassword;

      // setbError(null);
      const res = await axios.post("http://localhost:4000/userregister", {
        email,
        name,
        phone,
        password,
        ConfirmPassword,
      });
      let result = res.data;
      if (result.success) {
        navigate("/login");
      } else {
        setbError(res?.data?.message);
      }
    } catch (err) {
      setbError(err?.response.data.message);
      console.log({ err });
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
            <div className="w-full md:w-7/12 h-full  ">
              <div className="flex  text-white justify-center font-semibold mb-4">
                <h1 className="text-2xl ">Register/Sign up</h1>
              </div>

              <div className="flex flex-col ">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="flex justify-center ml-1 ">
                    <TextFiledCustom
                      id="standard-basic"
                      label="Name"
                      required
                      variant="standard"
                      type="text"
                      name="name"
                      {...register("name", { required: true, maxLength: 20 })}
                      sx={{
                        width: 500,
                        maxWidth: "65%",
                        height: 42,
                      }}
                    />
                  </div>
                  {errors.name && errors.message}
                  <div className="flex justify-center ml-1 mt-2">
                    <TextFiledCustom
                      id="standard-basic"
                      label="Email"
                      variant="standard"
                      type="email"
                      name="email"
                      {...register("email", { required: true, maxLength: 30 })}
                      sx={{
                        width: 500,
                        maxWidth: "65%",
                        height: 42,
                      }}
                      required
                    />
                  </div>
                  <div className="flex justify-center ml-1 mt-2">
                    <TextFiledCustom
                      id="standard-basic"
                      label="PhoneNumber"
                      variant="standard"
                      type="text"
                      name="phone"
                      {...register("phone", {
                        required: true,
                        minLength: 10,
                        maxLength: 13,
                      })}
                      sx={{
                        width: 500,
                        maxWidth: "65%",
                        height: 42,
                      }}
                      required
                    />
                  </div>
                  <div className="flex justify-center ml-1 mt-2">
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
                        height: 42,
                      }}
                      required
                    />
                  </div>
                  <div className="flex justify-center ml-1 mt-2">
                    <TextFiledCustom
                      id="standard-basic"
                      label="ConfirmPassword"
                      variant="standard"
                      type="Password"
                      name="confirmpassword"
                      {...register("confirmpassword", {
                        required: true,
                        minLength: 6,
                      })}
                      sx={{
                        width: 500,
                        maxWidth: "65%",
                        height: 42,
                      }}
                      required
                    />
                  </div>
                  <div className="flex justify-center mt-8">
                    <Button variant="contained" type="submit">
                      Register
                    </Button>
                  </div>
                </form>
                <div>
                  <Link to="/login">
                    <p className="underline text-center text-white mt-6">
                      Already have an account
                    </p>
                  </Link>
                </div>
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
                    {error ? error : errors?.registerInput?.message}{" "}
                  </Alert>
                </Snackbar>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserRegister;
