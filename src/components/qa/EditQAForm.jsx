import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useApp } from "../../context/AppContext";
import AddQAForm from "./AddQAForm";

const EditQAForm = () => {
  const { id } = useParams();
  const { token, setLoading } = useApp();
  const [question, setQuestion] = useState(null);

  useEffect(() => {
    const fetchQuestion = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_SERVER}/questions/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setQuestion(response.data);
      } catch (error) {
        console.error("Error fetching question:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestion();
  }, [id, token, setLoading]);

  if (!question) return <p>Loading...</p>;

  return <AddQAForm question={question} />;
};

export default EditQAForm;
