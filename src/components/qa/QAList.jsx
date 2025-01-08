import { useEffect, useState } from "react";
import { useApp } from "../../context/AppContext";
import { fetchDataByModelAndId } from "../../utility/fetchData";
import QACard from "./QACard";
import { Link } from 'react-router-dom';

const QAList = () => {
  const [questions, setQuestions] = useState(null);
  const { token, loading, setLoading } = useApp();

  useEffect(() => {
    loader();
  }, []);

  const loader = async () => {
    const props = {
      model: "questions",
      setLoading: setLoading,
      token: token,
    };
    const data = await fetchDataByModelAndId(props);
    setQuestions(data.results);
  };

  return (
    <div className={`container mx-auto p-4 ${loading ? "hidden" : ""}`}>
      <div className="mb-4">
        <Link to="/qa/add" className="btn btn-primary">
          Ask a Question
        </Link>
      </div>
      <ul>
        {questions &&
          questions.map((question) => (
            <li key={question.id}>
              <QACard question={question} />
            </li>
          ))}
      </ul>
    </div>
  );
};

export default QAList;
