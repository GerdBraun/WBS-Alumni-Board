import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
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
  const { token, loading, setLoading ,appUser} = useApp();
  const navigate = useNavigate();
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
  if (!question) return <p>Loading...</p>;

  // Determine if the user can edit the question
  const isOwner = question.ownerId === appUser?.id;
  const isAdminOrModerator =
    appUser?.role === "admin" || appUser?.role === "moderator";
  const canEdit = isOwner || isAdminOrModerator;


  return (
    <div className="container mx-auto p-4">
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
          
          {/* Edit and Back Buttons */}
          <div className="flex justify-between mb-4">
            {canEdit && (
              <button
                className="btn btn-primary"
                onClick={() => navigate(`/qa/edit/${question.id}`)}
              >
                Edit Question
              </button>
            )}
            <Link to="/qa" className="btn btn-primary">
              Back to Questions
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default QADetails;
