import { useEffect, useState } from "react";
import { useApp } from "../../context/AppContext";
import { fetchDataByModelAndId } from "../../utility/fetchData";
import QACard from "./QACard";
import { Link, useSearchParams } from "react-router-dom";

const QAList = () => {
  const [questions, setQuestions] = useState(null);
  const { token, loading, setLoading } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();
  const [paginationData, setPaginationData] = useState(null);


  useEffect(() => {
    if (token) loader();
  }, [token, searchParams]);

  const loader = async () => {
    const props = {
      model: "questions",
      setLoading: setLoading,
      token: token,
      page: searchParams.get("page"),
    };
    const data = await fetchDataByModelAndId(props);
    setQuestions(data.results);

    setPaginationData({
      ...paginationData,
      currentPage: data.currentPage,
      totalPages: data.totalPages,
      hasNextPage: data.hasNextPage,
      hasPreviousPage: data.hasPreviousPage,
    });
  };

  return (
    <div className={`container mx-auto p-4 ${loading ? "hidden" : ""}`}>
      <div className="mb-4">
        <Link to="/qa/add" className="btn btn-primary">
          Ask a Question
        </Link>
      </div>
    <div className={`container max-w-screen-lg mx-auto p-4 ${loading ? "hidden" : ""}`}>
      <ul>
        {questions &&
          questions.map((question) => (
            <li key={question.id}>
              <QACard question={question} />
            </li>
          ))}
      </ul>
    </div>
    {paginationData && (
        <div className="flex justify-around mt-8">
        <div className="join">
          <Link
            to={`/qa?page=${paginationData.currentPage - 1}`}
            className="join-item btn"
            disabled={!paginationData.hasPreviousPage}
          >
            «
          </Link>
          <button className="join-item btn">
            Page {paginationData.currentPage}
          </button>
          <Link
            to={`/qa?page=${paginationData.currentPage + 1}`}
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

export default QAList;
