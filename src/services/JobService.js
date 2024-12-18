import axios from "axios";

const API_URL = "http://localhost:3000/api/jobs";

export const fetchJobs = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

//For job details page
export const fetchJobById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// Fetch comments for a specific job
export const fetchJobComments = async (id) => {
  const response = await axios.get(`http://localhost:3000/api/comments/jobs/${id}`);
  return response.data.results;
};

// Fetch matching users for a specific job
export const fetchMatchingUsersForJob = async (id) => {
  const response = await axios.get(`http://localhost:3000/api/match/users/jobs/${id}`);
  return response.data.results;
};
