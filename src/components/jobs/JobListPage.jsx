import React, { useEffect, useState } from "react";
import { fetchJobs } from "../../services/JobService";
import { Link } from "react-router-dom";

const JobListPage = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const getJobs = async () => {
      const data = await fetchJobs();
      setJobs(data.results);
    };
    getJobs();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Job Listings</h1>
      {jobs.map((job) => (
        <div key={job.id} className="collapse bg-gray-100 rounded-lg mb-4">
          <input type="checkbox" />
          <div className="collapse-title text-lg font-medium">
            {job.title} - {job.location}
          </div>
          <div className="collapse-content">
            <p>{job.description}</p>
            <Link
              to={`/jobs/${job.id}`}
              className="btn btn-primary mt-2"
            >
              More Details
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default JobListPage;
