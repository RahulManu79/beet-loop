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

export const getArtistProfile = async (id) => {
  try {
    const res = await axios.get(
      `http://localhost:4000/artist/getprofile/${id}`,
      {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      }
    );
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

export const addProfilpic = async (obj) => {
  console.log(obj, "////");
  try {
    const res = await axios.post("http://localhost:4000/addprofilpic", obj, {
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
export const addArtistProfilePic = async (obj) => {
  console.log(obj, "////");
  try {
    const res = await axios.post(
      "http://localhost:4000/artist/addprofilpic",
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

export const addplaylist = async (id) => {
  console.log(id, "kvjd");

  try {
    const res = await axios.post(`http://localhost:4000/add-playlist/${id}`, {
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

export const getPlaylist = async (id) => {
  try {
    const res = await axios.get(`http://localhost:4000/get-playlist/${id}`, {
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

export const getCreatedPlaylist = async () => {
  try {
    const res = await axios.get(
      `http://localhost:4000/created-playlist
`,
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

export const addSongToPlaylist = async (obj) => {
  console.log(obj);
  try {
    const res = await axios.post(
      `http://localhost:4000/addsong-playlist`,
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

export const getViewPlaylist = async (id) => {
  console.log(id);
  try {
    const res = await axios.get(
      `http://localhost:4000/get-playlistsongs/${id}`,
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

export const removeFromPlaylis = async (obj) => {
  try {
    const res = await axios.post(
      `http://localhost:4000/playlist-removesong`,
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
export const getArtistSong = async (id) => {
  try {
    const res = await axios.get(
      `http://localhost:4000/artist/getartist-song/${id}`,
      {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      }
    );
    const data = res.data;
    console.log(data);

    if (data) {
      return data;
    }
  } catch (error) {
    return error.response.data.error;
  }
};
export const FollowArtists = async (obj) => {
  try {
    const res = await axios.post(`http://localhost:4000/follow-artist`, obj, {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    });
    const data = res.data;
    console.log(data);

    if (data) {
      return data;
    }
  } catch (error) {
    return error.response.data.error;
  }
};
export const UnFollowArtists = async (obj) => {
  try {
    const res = await axios.post(`http://localhost:4000/unfollow-artist`, obj, {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    });
    const data = res.data;
    console.log(data);

    if (data) {
      return data;
    }
  } catch (error) {
    return error.response.data.error;
  }
};

export const isFollowing = async (id) => {
  try {
    const res = await axios.get(`http://localhost:4000/check-isfollwed/${id}`, {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    });
    const data = res.data;
    console.log(data);

    if (data) {
      return data;
    }
  } catch (error) {
    return error.response.data.error;
  }
};
export const addLike = async (obj) => {
  try {
    const res = await axios.post(`http://localhost:4000/like`, obj, {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    });
    const data = res.data;
    console.log(data);

    if (data) {
      return data;
    }
  } catch (error) {
    return error.response.data.error;
  }
};
