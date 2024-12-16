import React, { useEffect, useState } from "react";
import { fetchJobs } from "../../services/JobService";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const getJobs = async () => {
      const data = await fetchJobs();
      console.log(data)
      setJobs(data.results); // results contains the job list.
    };
    getJobs();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Job Previews</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {jobs.map((job) => (
          <div key={job.id} className="card bg-white shadow-md p-4 rounded-lg">
            <h2 className="text-xl font-bold">{job.title}</h2>
            <p>{job.location}</p>
            <p className="text-gray-600 mt-2">
              {job.description.slice(0, 50)}...
            </p>
            <Link
              to="/login"
              className="text-blue-500 hover:underline mt-2 inline-block"
            >
              Log in to view more
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
