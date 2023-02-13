import React from "react";
import { useNavigate } from "react-router-dom";
import artistImg from "../../assets/aiden-marples-Udu9NgiNFk8-unsplash-768x512.jpg";
import FanImg from "../../assets/istockphoto-502194861-612x612.jpg";
import { ColorButton } from "../../ui/Button";

function SignOps() {
  let navigate = useNavigate();
  const fanRegister = (e) => {
    navigate("/userregister");
  };

  const artistRegister = () => {
    navigate("/artistregister");
  };
  return (
    <>
      <div className="min-h-[100vh] bg-[#0F1F32]  flex ">
        <div className=" w-5/12 h-screen flex justify-center items-center">
          <div className="bg-[#152537] scale-150 transform-gpu shadow w-80 h-96 rounded-lg flex flex-col justify-center items-center">
            <img className="w-56 mb-8 rounded" src={artistImg} alt="" />

            <ColorButton onClick={artistRegister}>Artist</ColorButton>
          </div>
        </div>

        <div className=" w-2/12  shadow">
          <div className="mt-8">
            <h1 className="text-center text-white align-text-top text-2xl font-bold tracking-wider">
              Register as
            </h1>
          </div>
          <div className="flex justify-center items-center mt-44">
            <p className="text-justify text-white align-text-top text-4xl font-bold tracking-wider">
              Or
            </p>
          </div>
        </div>
        <div className=" w-5/12 h-screen flex justify-center items-center">
          <div className="bg-[#152537] scale-150 transform-gpu  shadow w-80 h-96 rounded-lg flex flex-col justify-center items-center">
            <img className="w-56 mb-11 rounded" src={FanImg} alt="" />
            <ColorButton onClick={fanRegister}>Fan</ColorButton>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignOps;
