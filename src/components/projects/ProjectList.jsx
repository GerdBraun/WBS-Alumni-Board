import { useEffect, useState } from "react";
import { useApp } from "../../context/AppContext";
import ProjectCard from "./ProjectCard";

const ProjectList = () => {
  const [projects, setProjects] = useState(null);
  const { getProjects, loading } = useApp();

  useEffect(() => {
    loader();
  }, []);

  const loader = async () => {
    const data = await getProjects();
    setProjects(data.results);
  };

  return (
    <ul
      className={`max-w-screen-lg mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 my-8 ${
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
  );
};

export default ProjectList;