import  { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import Stats from "./Stats";
import { fetchJobs } from "../services/JobService.js";

const HomePage = () => {
  const [jobs, setJobs] = useState([]); 

  // Fetch job previews
  useEffect(() => {
    const getJobs = async () => {
      const data = await fetchJobs();
      console.log(data);
      setJobs(data.results || []);
    };
    getJobs();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <div
        className="hero bg-base-200 min-h-96 w-full"
        style={{
          backgroundImage: "url(website-programming-code-picjumbo-com.jpg)",
        }}
      >
        <div className="hero-overlay bg-opacity-80"></div>
        <div className="hero-content text-center p-8">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">
              Welcome to the
              <br />
              FULLSTACK.team
            </h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
            <Link to="/login" className="btn btn-primary">
              Get Started
            </Link>
          </div>
        </div>
      </div>

      {/* Job Previews Section */}
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 text-center">Job Previews</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <div
                key={job.id}
                className="card bg-white shadow-md p-4 rounded-lg"
              >
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
            ))
          ) : (
            <p className="text-gray-500 text-center">
              No jobs available at the moment.
            </p>
          )}
        </div>
      </div>

      {/* stats */}
      <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Log in and you will see</h1>
      <Stats />
      </div>
    </div>
  );
};

export default HomePage;
