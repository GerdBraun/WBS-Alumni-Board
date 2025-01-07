import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useApp } from "../../context/AppContext";
import AddProjectForm from "./AddProjectForm";

const EditProjectForm = () => {
  const { id } = useParams();
  const { token, setLoading } = useApp();
  const [project, setProject] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_SERVER}/projects/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setProject(response.data);
      } catch (error) {
        console.error("Error fetching project:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id, token, setLoading]);

  if (!project) return <p>Loading...</p>;

  return <AddProjectForm project={project} />;
};

export default EditProjectForm;
