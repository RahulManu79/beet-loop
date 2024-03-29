/* eslint-disable no-irregular-whitespace */
import React, { useState, useEffect } from "react";
import loginImage from "../../assets/james-owen-c-NBiJrhwdM-unsplash.jpg";
import { TextFiledCustom } from "../../ui/TextField";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { Auth } from "../../Config/firebase.config";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function UserRegister() {
  const navigate = useNavigate();
  const [error, setbError] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [phone, setPhone] = useState(null);
  const [otp, setotp] = useState(false);
  const [eOtp, setEOtp] = useState(null);
  const [Res, setRes] = useState(null);
  const [otpVerifyed, setVerified] = useState(false);
  const [success, setSuccess] = useState(null);
  const [login, setLogin] = useState(null);
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(30);
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
      if (otpVerifyed) {
        const res = await axios.post("http://localhost:4000/userregister", {
          email,
          name,
          phone,
          password,
          ConfirmPassword,
        });
        let result = res.data;
        if (result.success) {
          setLogin("User registered Successfully");
          setOpen(true);
          navigate("/login");
        } else {
          setbError(res?.data?.message);
        }
      } else {
        setbError("Mobile OTP verification is pending");
      }
      // setbError(null);
    } catch (err) {
      setbError(err?.response.data.message);
      console.log({ err });
    }
  };
  async function setUpRecaptcha() {
    setotp(true);
    const recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-seeker-container",
      {},
      Auth
    );
    recaptchaVerifier.render();
    const res = await signInWithPhoneNumber(
      Auth,
      `+1${phone}`,
      recaptchaVerifier
    );
    setRes(res);
  }

  const handleConf = async () => {
    try {
      await Res.confirm(eOtp).then((result) => {
        console.log(result);
        setSuccess("OTP Verification Completed");
        setVerified(true);
        setOpen(true);
      });
    } catch (error) {
      setbError("OTP Verification Failed, try Again");
      console.log(error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [seconds]);


  return (
    <>
      <div className="login bg-[#0F1F32]  flex justify-center content-center ">
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
                        maxWidth: "52%",
                        height: 42,
                      }}
                      onChange={(e) => {
                        console.log(e);
                        setPhone(e.target.value);
                      }}
                    />
                    <button
                      className="bg-[#0800ff] text-white w-16 mt-3 h-10  rounded-lg p-2 "
                      onClick={setUpRecaptcha}
                    >
                      Verify
                    </button>
                  </div>
                  <div
                    id="recaptcha-seeker-container"
                    className="flex justify-center ml-1 mt-2"
                  />
                  {otp && (
                    <div className="w-full mt-2 flex flex-col  items-center">
                      <TextFiledCustom
                        id="standard-basic"
                        label="Enter OTP"
                        variant="standard"
                        name="otp"
                        sx={{
                          width: 500,
                          maxWidth: "52%",
                          height: 42,
                        }}
                        onChange={(e) => {
                          console.log(e);
                          setEOtp(e.target.value);
                        }}
                      />
                      <div className="w-full mt-2 flex  justify-center">
                        {seconds > 0 || minutes > 0 ? (
                          <p style={{ fontSize: "12px" }}>
                            Time Remaining:{" "}
                            {minutes < 10 ? `0${minutes}` : minutes} :
                            {seconds < 10 ? `0${seconds}` : seconds}
                          </p>
                        ) : (
                          <Button
                            sx={{ width: "150px" }}
                            onClick={setUpRecaptcha}
                            variant="contained"
                          >
                            Resend OTP
                          </Button>
                        )}
                        {/* {!seconds > 0 && !minutes > 0 && (
                          
                        )} */}
                      </div>
                      <button
                        type="button"
                        className="bg-[#0800ff] text-white w-16 h-10 rounded-lg p-2 "
                        onClick={handleConf}
                      >
                        VERIFY
                      </button>
                    </div>
                  )}
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
                    {error ? error : errors?.registerInput?.message}
                  </Alert>
                </Snackbar>
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
                    {success}
                  </Alert>
                </Snackbar>
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
                    {login}
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
