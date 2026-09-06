import axios from "axios";


const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
  timeout: 10000,
});


export const checkBackendHealth = async () => {
  const response = await api.get("/health");

  return response.data;
};


export const getDestinations = async () => {
  const response = await api.get("/destinations/");

  return response.data.destinations;
};


export const analyzeDestination = async ({
  destination,
  date,
  time,
}) => {
  const response = await api.post("/analysis/", {
    destination,
    date,
    time,
  });

  return response.data;
};


export default api;