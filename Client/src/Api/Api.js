import axios from "axios";

export const getUser = async () => {
  try {
    const response = await axios.get("http://localhost:4000/admin/getUser");
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
    const response = await axios.get("http://localhost:4000/admin/getArtist");
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
      `http://localhost:4000/admin/userBlk/${userId}`
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
      `http://localhost:4000/admin/artistBlk/${id}`
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
      `http://localhost:4000/admin/doArtistVry/${id}`
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
    const res = await axios.get(`http://localhost:4000/getprofile/${id}`);
    const data = res.data;
    if (data) {
      return data;
    }
  } catch (error) {
    return error.response.data.error;
  }
};
