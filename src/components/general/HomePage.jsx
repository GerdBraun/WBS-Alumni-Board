import  { useEffect, useState } from "react";
 
import { Link } from "react-router-dom";
import Stats from "./Stats";
import { useApp } from "../../context/AppContext";
import { fetchJobs } from "../../utility/jobService.js";

const HomePage = () => {
  const [jobs, setJobs] = useState([]);
  const { appUser } = useApp();// for getting logged in user

  // Fetch job previews
  useEffect(() => {
    const getJobs = async () => {
      const data = await fetchJobs(2);
      console.log(data);
      setJobs(data.results || []);
    };
    getJobs();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <div
        className="hero rounded-xl min-h-96 max-w-screen-lg mx-auto shadow-xl"
        style={{
          // backgroundImage: "url(website-programming-code-picjumbo-com.jpg)",
        }}
      >
        {/* <div className="hero-overlay bg-opacity-60 rounded-xl"></div> */}
        <div className="hero-content text-center p-8">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold text-white">
              Welcome to the
              <br />
              FULLSTACK.team
            </h1>
            <p className="py-6 text-white">
              The place for all devs (and others) to keep in touch!
              <br />
              Projects, jobs, skills - everything at your fingertips.
            </p>
            <Link to={appUser ? "/welcome": "/login"} className="btn btn-primary">
              Get Started
            </Link>
          </div>
        </div>
      </div>

      {/* Job Previews Section */}
      <div className="container max-w-screen-lg mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 text-center">Job Previews</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <div
                key={job.id}
                className="card bg-base-100 shadow-md p-4 rounded-lg"
              >
                <h2 className="text-xl font-bold">{job.title}</h2>
                <p>Location: {job.location || "-"}</p>
                <p className="mt-2">
                  {job.description.slice(0, 50)}...
                </p>
                <Link
                  to={appUser ? `/jobs/${job.id}` : "/login"} // Conditional link
                  className="link link-primary mt-2 link-hover"
                >
                  {appUser ? "View More" : "Log in to view more"}
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
      <div className="container max-w-screen-lg mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Log in and you will see</h1>
      <Stats />
      </div>
    </div>
  );
};

export default HomePage;
