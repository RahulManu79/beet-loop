import axios from "axios";

export default "http://localhost:3000";

export const getUser = async () => {
  try {
    const response = await axios.get("http://localhost:4000/admin/getUser");
    const data = response.data;
    if (data) {
      console.log(data);
      return data;
    }
  } catch (error) {
    return error.response.data.error;
  }
};
