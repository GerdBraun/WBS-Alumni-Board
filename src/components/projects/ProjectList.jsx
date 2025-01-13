import { useEffect, useState } from "react";
import { useApp } from "../../context/AppContext";
import { fetchDataByModelAndId } from "../../utility/fetchData";
import { Link, useSearchParams } from "react-router-dom";
import ProjectCard from "./ProjectCard";

const ProjectList = () => {
  const [projects, setProjects] = useState(null);
  const { token, loading, setLoading } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();
  const [paginationData, setPaginationData] = useState(null);

  useEffect(() => {
    if (token) loader();
  }, [token, searchParams]);

  const loader = async () => {
    const props = {
      model: "projects",
      setLoading: setLoading,
      token: token,
      page: searchParams.get("page"),
      // offset: searchParams.get("offset"),
      // limit: paginationData.limit,
    };
    const data = await fetchDataByModelAndId(props);
    setProjects(data.results);

    setPaginationData({
      ...paginationData,
      currentPage: data.currentPage,
      totalPages: data.totalPages,
      hasNextPage: data.hasNextPage,
      hasPreviousPage: data.hasPreviousPage,
    });
  };

  return (
    <div className="max-w-screen-lg mx-auto p-4 my-8">
      <ul
        className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ${
          loading ? "hidden" : ""
        }`}
      >
        {projects &&
          projects.map((project) => (
            <li key={project.id}>
              <ProjectCard project={project} />
            </li>
          ))}
      </ul>
      {paginationData && (
        <div className="flex justify-around mt-8">
          <div className="join">
            <Link
              to={`/projects?page=${paginationData.currentPage - 1}`}
              className="join-item btn"
              disabled={!paginationData.hasPreviousPage}
            >
              «
            </Link>
            <button className="join-item btn">
              Page {paginationData.currentPage}
            </button>
            <Link
              to={`/projects?page=${paginationData.currentPage + 1}`}
              className="join-item btn"
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

export default ProjectList;
