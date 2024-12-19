import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchDataByModelAndId } from "../../utility/fetchData";
import { useApp } from "../../context/AppContext";

const JobListPage = () => {
  const [jobs, setJobs] = useState([]);
  const { token, loading, setLoading } = useApp();

  useEffect(() => {
    const loadJobs = async () => {
      const props = {
        model: "jobs",
        setLoading: setLoading,
        token: token,
      };
      const data = await fetchDataByModelAndId(props);
      setJobs(data?.results || []);
    };
    loadJobs();
  }, [token, setLoading]);

  return (
    <div className={`container mx-auto p-4 ${loading ? "hidden" : ""}`}>
      <h1 className="text-2xl font-bold mb-4">Job Listings</h1>
      {jobs.map((job) => (
        <div key={job.id} className="collapse bg-gray-100 rounded-lg mb-4">
          <input type="checkbox" />
          <div className="collapse-title text-lg font-medium flex items-center gap-4">
            {/* Company Logo */}
            <img
              src={job.Company?.logo || "/logo.png"} // Use default logo if null
              alt={job.Company?.name || "Company Logo"}
              className="h-10 w-10 object-cover rounded-full"
            />
            {/* Job Title and Location */}
            <span>
              {job.title} - {job.location}
            </span>
          </div>
          <div className="collapse-content">
            <p>{job.description}</p>
            <Link to={`/jobs/${job.id}`} className="btn btn-primary mt-2">
              More Details
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default JobListPage;
