import axios from "axios";

const API_URL = import.meta.env.VITE_API_SERVER || "http://localhost:3000/api";

// Fetch all jobs
export const fetchJobs = async (limit) => {
  try {
    const limitString = limit ? `?limit=${limit}` : "";
    const response = await axios.get(`${API_URL}/jobs${limitString}`);
    console.log("API Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return { results: [] };
  }
};
