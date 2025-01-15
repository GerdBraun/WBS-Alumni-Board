import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { fetchDataByModelAndId } from "../../utility/fetchData";
import { useApp } from "../../context/AppContext";
import JobCard from "./JobCard";

const JobListPage = () => {
  const [jobs, setJobs] = useState([]);
  const { token, loading, setLoading } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();
  const [paginationData, setPaginationData] = useState(null);

  useEffect(() => {
    loadJobs();
  }, [token, searchParams, setLoading]);

  const loadJobs = async () => {
    const props = {
      model: "jobs",
      setLoading: setLoading,
      token: token,
      page: searchParams.get("page"),
    };
    const data = await fetchDataByModelAndId(props);
    setJobs(data?.results || []);

    setPaginationData({
      ...paginationData,
      currentPage: data.currentPage,
      totalPages: data.totalPages,
      hasNextPage: data.hasNextPage,
      hasPreviousPage: data.hasPreviousPage,
    });
  };

  return (
    <div
      className={`container max-w-screen-lg mx-auto p-4 ${
        loading ? "hidden" : ""
      }`}
    >
      <h1 className="text-2xl font-bold mb-4">Job Listings</h1>
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
      {paginationData && (
        <div className="flex justify-around mt-8">
          <div className="join">
            <Link
              to={`/jobs?page=${paginationData.currentPage - 1}`}
              className="join-item btn btn-primary"
              disabled={!paginationData.hasPreviousPage}
            >
              «
            </Link>
            <Link
              to={`/companies?page=${paginationData.currentPage}`}
              className="join-item btn bg-base-100 hover:bg-base-100"
            >
              Page {paginationData.currentPage}
            </Link>
            <Link
              to={`/jobs?page=${paginationData.currentPage + 1}`}
              className="join-item btn btn-primary"
              disabled={!paginationData.hasNextPage}
            >
              »
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobListPage;
