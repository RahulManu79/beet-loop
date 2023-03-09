/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { Auth } from "../../Config/firebase.config";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import axios from "axios";
import { async } from "@firebase/util";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Forgotpass() {
  const [email, setEmail] = useState("");
  const [otp, SetOtp] = useState(false);
  const [gotOtp, setGotOtp] = useState(false);
  const [Password, setPassword] = useState("");
  const [conpass, setConPass] = useState("");
  const [phone, setPhone] = useState("");
  const [eOtp, setEOtp] = useState(null);
  const [otpVerifyed, setVerified] = useState(false);
  const [success, setSuccess] = useState(null);
  const [Res, setRes] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [erropen, seterrOpen] = React.useState(false);
  const [error, setbError] = useState("");
  const [role, setRole] = useState("");

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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  const handleVerify = (e) => {
    e.preventDefault();
    if (email && phone) {
      const isValid = validateEmail(email);
      if (isValid) {
        if (phone.length === 10) {
          setGotOtp(true);
          setUpRecaptcha(phone);
        } else {
          setbError("Please give a valid phone number.");
        }
      } else {
        setbError("Please give a valid email");
      }
    } else {
      setbError("please provide a valid email address or phone number");
    }
  };

  const resetPassword = async () => {
    console.log(Password, conpass);
    try {
      if (Password === conpass) {
        const res = await axios.post("http://localhost:4000/resetpass", {
          Password,
          email,
          role,
        });
        let result = res.data;
        if (result.success) {
          setSuccess(res.data.message);
          setOpen(true);
          if (role === "fan") {
            navigate("/login");
          } else {
            navigate("/artist/login");
          }
        } else {
          setbError(res?.data?.message);
        }
      } else {
        seterrOpen(true);
        setbError("password must be same");
      }
    } catch (error) {
      console.log(error);
      seterrOpen(true);
      setbError("error in updating password");
    }
  };

  async function setUpRecaptcha() {
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
    console.log(res);
    setRes(res);
  }
  const handleConf = async () => {
    try {
      await Res.confirm(eOtp).then((result) => {
        console.log(result);
        SetOtp(true);
        setSuccess("OTP Verification Completed");
        setVerified(true);
        setOpen(true);
      });
    } catch (error) {
      setbError("OTP Verification Failed, try Again");
      seterrOpen(true);
      console.log(error);
    }
  };

  return (
    <div className="w-screen h-screen bg-[#0F1F32] flex justify-center items-center">
      <div className="w-6/12 h-3/4 bg-[#152537] rounded-2xl shadow-2xl flex items-center justify-center">
        {otp ? (
          <form
            onSubmit={handleSubmit(resetPassword)}
            className="w-72 h-72 flex flex-col justify-center  rounded-lg hover:ease-in-out transition-all"
          >
            <h1 className="text-white text-2xl font-bold">
              Enter your New Password
            </h1>
            <hr />
            <div className="w-full flex flex-col mt-2">
              <h1 className="text-white">Password:</h1>

              <input
                type="password"
                required
                placeholder="Enter Password"
                className="w-full rounded-md border p-2"
                {...register("password", {
                  required: "Fill this field with valid password",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                  pattern: {
                    value:
                      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/,
                    message:
                      "Password must contain at least one uppercase letter, one lowercase letter, one number, and be at least 6 characters long",
                  },
                })}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors?.password && (
                <span className="text-[red]">{errors.password.message}</span>
              )}
            </div>
            <div className="w-full flex flex-col mt-2">
              <h1 className="text-white">Confirm Password:</h1>
              <input
                type="password"
                required
                placeholder="Enter your password"
                className="w-full rounded-md border  p-2"
                {...register("ConfirmPassword", {
                  required: "Please confirm your password",
                  //   validate: validatePasswordMatch,
                })}
                onChange={(e) => setConPass(e.target.value)}
              />
              {errors?.ConformPassword && (
                <span className="text-[red]">
                  {errors.ConfirmPassword.message}
                </span>
              )}
            </div>
            <div className="flex flex-col w-full justify-center mt-3 items-center">
              <h1 className="text-xl font-semibold">Select Your Role</h1>
              <label htmlFor="Role">
                {/* Role: */}
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-32 bg-[#1616e2] rounded-md p-2 text-white"
                >
                  <option value="fan">User</option>
                  <option value="artist">Artist</option>
                </select>
              </label>
            </div>
            <button
              className="bg-[#001944] mt-3 h-10 rounded-lg text-white font-semibold hover:bg-[blue]"
              type="submit"
            >
              Reset Password
            </button>
          </form>
        ) : (
          <form
            className="w-72 h-96  flex flex-col justify-center p-5 rounded-lg hover:ease-in-out transition-all"
            onSubmit={handleVerify}
          >
            <h1 className="text-xl font-extrabold text-center">
              Verify Your Account
            </h1>
            <hr />
            <div className="flex flex-col justify-center">
              <h1 className="text-xl font-bold mt-3">
                Enter Your Email Address
              </h1>
              <input
                type="email"
                required
                className="h-10 w-full rounded-md "
                placeholder="Enter your email address here"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <h1 className="text-xl font-bold mt-3">
                Enter Your phone number
              </h1>
              <input
                type="number"
                required
                className="h-10 w-full rounded-md"
                placeholder="Enter your phone number here"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <div id="recaptcha-seeker-container" />
              {gotOtp && (
                <div className="w-full flex-col justify-center">
                  <h1 className="text-xl font-bold mt-3">
                    Enter the OTP we send
                  </h1>
                  <input
                    type="number"
                    required
                    className="h-10 w-full rounded-md mt-3"
                    placeholder="Enter your OTP here"
                    onChange={(e) => setEOtp(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="bg-[#001944] mt-3 h-10 rounded-lg text-white font-semibold hover:bg-[blue]"
                    onClick={handleConf}
                  >
                    Verify
                  </button>
                </div>
              )}
              {!gotOtp && (
                <button
                  className="bg-[#001944] mt-3 h-10 rounded-lg text-white font-semibold hover:bg-[blue]"
                  onClick={setUpRecaptcha}
                >
                  SEND OTP
                </button>
              )}
            </div>
          </form>
        )}
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

export default Forgotpass;
