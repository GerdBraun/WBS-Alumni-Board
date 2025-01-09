import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import {
  fetchDataByModelAndId,
  getCommentsByModelAndId,
} from "../../utility/fetchData";
import CommentCard from "../comments/CommentCard";
import CommentAddForm from "../comments/CommentAddForm";

const QADetails = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [comments, setComments] = useState(null);
  const { token, loading, setLoading } = useApp();

  useEffect(() => {
    loader();
    commentsLoader();
  }, [id]);

  const loader = async () => {
    const props = {
      model: "questions",
      id: id,
      token: token,
      setLoading: setLoading,
    };
    const data = await fetchDataByModelAndId(props);
    console.log(data);
    setQuestion(data);
  };

  const commentsLoader = async () => {
    const props = {
      model: "questions",
      id: id,
      token: token,
      setLoading: setLoading,
    };
    const data = await getCommentsByModelAndId(props);
    setComments(data.results);
  };

  return (
    <div className="container max-w-screen-lg mx-auto p-4">
      {question && (
        <>
          {/* question Title */}
          <h1 className="text-3xl font-bold mb-4">{question.title}</h1>

          {/* question Description */}
          <p className="mt-4 mb-4">{question.description}</p>
          <h3 className="font-bold">Answers:</h3>
          <ul>
            {comments &&
              comments.map((comment) => (
                <li key={comment.id}>
                  <CommentCard comment={comment} />
                </li>
              ))}
          </ul>
          <CommentAddForm model="questions" id={id} reload={commentsLoader} />
          </>
      )}
    </div>
  );
};

export default QADetails;
