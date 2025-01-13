import { useEffect, useState } from "react";
//import { Link } from "react-router-dom";
import { fetchDataByModelAndId } from "../../utility/fetchData";
import { useApp } from "../../context/AppContext";
import JobCard from "./JobCard";

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
    <div className={`container max-w-screen-lg mx-auto p-4 ${loading ? "hidden" : ""}`}>
      <h1 className="text-2xl font-bold mb-4">Jobs Listing</h1>
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
};

export default JobListPage;
