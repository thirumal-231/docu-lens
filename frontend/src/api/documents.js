import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
});

export const getDocuments = async () => {
  const res = await api.get("/documents");
  return res.data.data || [];
};
