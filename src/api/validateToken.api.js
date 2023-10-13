import axios from "axios";

const API = import.meta.env.VITE_API_URL;

const validateTokenRequest = async (token) =>
  await axios.get(`${API}/api/validate-token`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export default { validateTokenRequest };
