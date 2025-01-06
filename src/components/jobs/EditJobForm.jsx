import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useApp } from "../../context/AppContext";
import AddJobForm from "./AddJobForm";

const EditJobForm = () => {
  const { id } = useParams();
  const { token, setLoading } = useApp();
  const [job, setJob] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_SERVER}/jobs/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setJob(response.data);
      } catch (error) {
        console.error("Error fetching job:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id, token, setLoading]);

  if (!job) return <p>Loading...</p>;

  return <AddJobForm job={job} />;
};

export default EditJobForm;
