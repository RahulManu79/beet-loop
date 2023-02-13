import React from "react";
import "./UserLogin.css";
import loginImage from "../../../assets/james-owen-c-NBiJrhwdM-unsplash.jpg";
import { TextFiledCustom } from "../../../ui/TextField";
import Button from "@mui/material/Button";

function Login() {
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
                <h1 className="text-2xl ">Login/Sign in</h1>
              </div>
              <div className="flex flex-col mt-8 ">
                <form action="">
                  <div className="flex justify-center ml-1">
                    <TextFiledCustom
                      id="standard-basic"
                      label="Email"
                      variant="standard"
                      type="email"
                      sx={{
                        width: 500,
                        maxWidth: "65%",
                      }}
                      required
                    />
                  </div>
                  <div className="flex justify-center ml-1 mt-5">
                    <TextFiledCustom
                      id="standard-basic"
                      label="Password"
                      variant="standard"
                      type="Password"
                      sx={{
                        width: 500,
                        maxWidth: "65%",
                      }}
                      required
                    />
                  </div>
                  <div className="flex justify-center mt-6">
                    <Button variant="contained">Login Now</Button>
                  </div>
                </form>
                <div>
                  <p className="underline text-center text-white mt-6">
                    Forgot Password ?
                  </p>
                  <p className="underline text-center text-white mt-6">
                    Don't Have An Account? Register Here
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
