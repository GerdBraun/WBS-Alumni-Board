import { useEffect, useState } from "react";
import { useApp } from "../../context/AppContext";
import ProjectCard from "./ProjectCard";
import { fetchDataByModelAndId } from "../../utility/fetchData";

const ProjectList = () => {
  const [projects, setProjects] = useState(null);
  const { token, loading, setLoading } = useApp();

  useEffect(() => {
    loader();
  }, []);

  const loader = async () => {
    const props = {
      model: "projects",
      setLoading: setLoading,
      token: token,
    };
    const data = await fetchDataByModelAndId(props);
    setProjects(data.results);
  };

  return (
    <div
      className={`container max-w-screen-lg mx-auto p-4 ${
        loading ? "hidden" : ""
      }`}
    >
      <h1 className="text-2xl font-bold mb-4">Projects Listing</h1>

      {projects &&
        projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
    </div>
  );
};

export default ProjectList;
