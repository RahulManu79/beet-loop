import React, { useState, useEffect } from "react";
import Header from "../Header/Userheader";
import UserProfileSidebar from "../SideBar/ProfileSidebar/UserProfileSidebar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getProfile } from "../../Api/Api";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";

import { TextFiledCustom } from "../../ui/TextField";
function UserEditProfile() {
  const [user, setUser] = useState([]);
  const { id } = useSelector((state) => state.userLogin);
  const navigate = useNavigate();

  useEffect(() => {
    async function invoke() {
      const data = await getProfile(id);
      if (data.status === "failed") {
        navigate("/login");
        localStorage.removeItem("token");
      } else {
        setUser(data.data);
      }
    }
    invoke();
  }, []);

  console.log(user);
  const onSubmit = async (data) => {
    console.log(data);
  };

  const {
    setError,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div className=" w-full h-screen bg-[#0F1F32] flex">
      <UserProfileSidebar />

      <div className=" w-5/6">
        <div className="w-full  flex justify-end content-end">
          <Header />
        </div>

        <h1 className="text-white ml-8 font-extrabold text-2xl">
          Edit Profile
        </h1>

        <div className=" h-4/6 w-12/12 flex justify-center items-center ">
          <div className=" ">
            <div className=" rounded-lg flex justify-center shadow-sm-500 items-center content-center">
              <div className="flex flex-col ">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="flex justify-center ml-1 ">
                    <TextFiledCustom
                      id="standard-basic"
                      label=""
                      value={user.name}
                      required
                      variant="standard"
                      type="text"
                      name="name"
                      {...register("name", { required: true, maxLength: 20 })}
                      sx={{
                        width: 500,
                        maxWidth: "100%",
                        height: 42,
                      }}
                    />
                  </div>
                  {errors.name && errors.message}
                  <div className="flex justify-center ml-1 mt-2">
                    <TextFiledCustom
                      id="standard-basic"
                      label=""
                      variant="standard"
                      value={user.email}
                      type="email"
                      name="email"
                      {...register("email", { required: true, maxLength: 30 })}
                      sx={{
                        width: 500,
                        maxWidth: "100%",
                        height: 42,
                      }}
                      required
                    />
                  </div>
                  <div className="flex justify-center ml-1 mt-2">
                    <TextFiledCustom
                      id="standard-basic"
                      label=""
                      variant="standard"
                      type="text"
                      value={user.phone}
                      name="phone"
                      {...register("phone", {
                        required: true,
                        minLength: 10,
                        maxLength: 13,
                      })}
                      sx={{
                        width: 500,
                        maxWidth: "100%",
                        height: 42,
                      }}
                      required
                    />
                  </div>
                  <div className="flex justify-center mt-8">
                    <Button variant="contained" type="submit">
                      Update
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserEditProfile;

{
  /* <table className="w-[900px] text-white shadow-md">
  <tr className="border-b-2 border-black">
    <th className="">User Name:</th>
    <td className="p-3 text-sm">{user?.name}</td>
  </tr>
  <tr className="border-b-2 border-black">
    <th>Email</th>
    <td className="p-3 text-sm ">{user?.email}</td>
  </tr>
  <tr className="border-b-2 border-black">
    <th>Phone</th>
    <td className="p-3 text-sm border-black">{user?.phone}</td>
  </tr>
</table>; */
}
