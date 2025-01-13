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
    <div className={`container max-w-screen-lg mx-auto p-4 ${loading ? "hidden" : ""}`}>
       <h1 className="text-2xl font-bold mb-4">Questions & Answers</h1>

    
      <ul>
        {questions &&
          questions.map((question) => (
            <li key={question.id}>
              <QACard question={question} />
            </li>
          ))}
      </ul>
      <div className="mb-4">
        <Link to="/qa/add" className="btn btn-primary">
          Ask a Question
        </Link>
      </div>
    </div>
 
  );
};

export default QAList;
