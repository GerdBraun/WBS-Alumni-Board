import { useEffect, useState } from "react";
import { useApp } from "../../context/AppContext";
import { fetchDataByModelAndId } from "../../utility/fetchData";
import { Link, useSearchParams } from "react-router-dom";
import ProjectCard from "./ProjectCard";
import SearchForm from "../parts/SearchForm";

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
      <div
        className={`container max-w-screen-lg mx-auto ${
          loading ? "hidden" : ""
        }`}
      >
        <h1 className="text-2xl font-bold mb-4">Projects Listing</h1>
        <SearchForm searchPlaceholder="Search projects..." searchModel="projects" />
        {projects &&
          projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
          ))}
      </div>
      {paginationData && (
        <div className="flex justify-around mt-8">
          <div className="join">
            <Link
              to={`/projects?page=${paginationData.currentPage - 1}`}
              className="join-item btn btn-primary"
              disabled={!paginationData.hasPreviousPage}
            >
              «
            </Link>
            <Link
              to={`/projects?page=${paginationData.currentPage}`}
              className="join-item btn bg-base-100 hover:bg-base-100"
            >
              Page {paginationData.currentPage}
            </Link>
            <Link
              to={`/projects?page=${paginationData.currentPage + 1}`}
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

export default ProjectList;
