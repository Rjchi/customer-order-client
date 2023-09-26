import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export const logueoRequest = async (user) =>
  await axios.post(`${API}/api/logueo`, user);

export const registroRequest = async (user) =>
  await axios.post(`${API}/api/registro`, user);
