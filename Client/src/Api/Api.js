// import { async } from "@firebase/util";
import axios from "axios";

export const getUser = async () => {
  try {
    const response = await axios.get("http://localhost:4000/admin/getUser", {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    });
    const data = response.data;
    if (data) {
      return data;
    }
  } catch (error) {
    return error.response.data.error;
  }
};

export const getArtist = async () => {
  try {
    const response = await axios.get("http://localhost:4000/admin/getArtist", {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    });
    const data = response.data;
    console.log(data);
    if (data) {
      return data;
    }
  } catch (error) {
    return error.response.data.error;
  }
};

export const doUserBlk = async (userId) => {
  try {
    const response = await axios.get(
      `http://localhost:4000/admin/userBlk/${userId}`,
      {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      }
    );
    const data = response.data;
    if (data) {
      console.log(data);
      return data;
    }
  } catch (error) {
    return error.response.data.error;
  }
};

export const doArtistBlk = async (id) => {
  try {
    const response = await axios.get(
      `http://localhost:4000/admin/artistBlk/${id}`,
      {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      }
    );
    const data = response.data;
    if (data) {
      console.log(data);
      return data;
    }
  } catch (error) {
    return error.response.data.error;
  }
};

export const doArtistVry = async (id) => {
  try {
    const res = await axios.get(
      `http://localhost:4000/admin/doArtistVry/${id}`,
      {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      }
    );
    const data = res.data;
    if (data) {
      console.log(data);
      return data;
    }
  } catch (error) {
    return error.response.data.error;
  }
};

export const getProfile = async (id) => {
  try {
    const res = await axios.get(`http://localhost:4000/getprofile/${id}`, {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    });
    const data = res.data;
    console.log(res);
    if (data) {
      return data;
    }
  } catch (error) {
    return error.response.data.error;
  }
};

export const getSongs = async () => {
  try {
    const { data } = await axios.get("http://localhost:4000/artist/getsongs", {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    });

    if (data) {
      return data;
    }
  } catch (error) {
    return error.response.data.error;
  }
};

export const getCatagory = async () => {
  try {
    const res = await axios.get("http://localhost:4000/admin/getcatagory", {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    });
    const data = res.data;
    if (data) {
      return data;
    }
  } catch (error) {
    return error.response.data.error;
  }
};

export const postCategory = async (obj) => {
  try {
    console.log(obj);

    const res = await axios.post(
      "http://localhost:4000/admin/addcatagory",
      obj,
      {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      }
    );
    const data = res.data;
    if (data) {
      return data;
    }
  } catch (error) {
    return error.response.data.error;
  }
};
