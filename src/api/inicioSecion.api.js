import axios from "axios";

const API = import.meta.env.VITE_API_URL;

const logueoRequest = async (user) =>
  await axios.post(`${API}/api/logueo`, user);

const registroRequest = async (user) =>
  await axios.post(`${API}/api/registro`, user);

export default { logueoRequest, registroRequest };
