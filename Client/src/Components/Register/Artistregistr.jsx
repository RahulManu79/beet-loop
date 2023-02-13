import React, { useState } from "react";
import loginImage from "../../assets/james-owen-c-NBiJrhwdM-unsplash.jpg";
import { TextFiledCustom } from "../../ui/TextField";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
function ArtistRegistr() {
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
                <h1 className="text-2xl ">Login/Sign in</h1>
              </div>
              <div className="flex flex-col ">
                <form action="">
                  <div className="flex justify-center ml-1 ">
                    <TextFiledCustom
                      id="standard-basic"
                      label="Name"
                      variant="standard"
                      type="name"
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
                      label="Email"
                      variant="standard"
                      type="email"
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
                      type="number"
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
                      sx={{
                        width: 500,
                        maxWidth: "65%",
                        height: 42,
                      }}
                      required
                    />
                  </div>
                  <div className="flex justify-center mt-8">
                    <Button variant="contained">Login Now</Button>
                  </div>
                </form>
                <div>
                  <Link to="/">
                    <p className="underline text-center text-white mt-6">
                      Already have an account
                    </p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ArtistRegistr;
