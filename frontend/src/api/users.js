import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
});

export const syncUser = async () => {
  const res = await api.post("/users/sync");
  console.log(res.data || []);
  return res.data.data || [];
};
