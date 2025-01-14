import { useEffect, useState } from "react";
import { useApp } from "../../context/AppContext";
import { Link, useParams, useNavigate } from "react-router-dom";
import CommentCard from "../comments/CommentCard";
import CommentAddForm from "../comments/CommentAddForm";
import {
  fetchDataByModelAndId,
  getCommentsByModelAndId,
  getMatches,
} from "../../utility/fetchData";

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [comments, setComments] = useState(null);
  const [matches, setMatches] = useState(null);
  const { token, loading, setLoading, appUser } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    if(!token || !id) return;
    loader(id);
    commentsLoader(id);
    matchesLoader(id);
  }, [id, token]);

  const loader = async () => {
    const props = {
      model: "projects",
      id: id,
      token: token,
      setLoading: setLoading,
    };
    const data = await fetchDataByModelAndId(props);
    setProject(data);
  };

  const commentsLoader = async () => {
    const props = {
      model: "projects",
      id: id,
      token: token,
      setLoading: setLoading,
    };
    const data = await getCommentsByModelAndId(props);
    setComments(data.results);
  };

  const matchesLoader = async () => {
    const props = {
      getModel: "users",
      fromModel: "projects",
      fromId: id,
      token: token,
      setLoading: setLoading,
    };
    const data = await getMatches(props);
    setMatches(data.results);
  };
  if (!project) return <p className="text-center my-8">Loading...</p>;

  // Determine if the user can edit the project
  const isOwner = project.ownerId === appUser?.id;
  const isAdminOrModerator =
    appUser?.role === "admin" || appUser?.role === "moderator";
  const canEdit = isOwner || isAdminOrModerator;

  return (
    <div
      className={`max-w-screen-lg mx-auto p-4 my-8 ${loading ? "hidden" : ""}`}
    >
      <h1 className="text-2xl font-bold mb-4">Project Details</h1>
      {project && (
        <div className="card bg-base-100 w-full shadow-xl">
          <div className="card-body">
            <h2 className="card-title">{project.title}</h2>
            <p>
              posted by&nbsp;
              <Link
                to={`/users/${project.User.id}`}
                className="link link-primary link-hover"
              >
                {project.User.firstName} {project.User.lastName}
              </Link>
            </p>
            <h3 className="font-bold">Dates:</h3>
            <p>
              {project.dateFrom ? (
                <>
                  <strong>Start Date: </strong>{" "}
                  {new Date(project.dateFrom).toLocaleDateString()}
                  <br />
                </>
              ) : (
                <>
                  <strong>
                    Start Date:
                    <span className="font-normal"> Not specified</span>
                  </strong>
                  <br />
                </>
              )}
              {project.dateTo ? (
                <>
                  <strong>End Date: </strong>{" "}
                  {new Date(project.dateTo).toLocaleDateString()}
                </>
              ) : (
                <strong>
                  End Date:<span className="font-normal"> Not specified</span>
                </strong>
              )}
            </p>
            <h3 className="font-bold">Description:</h3>
            <p>{project.description}</p>
            <h3 className="font-bold">Skills:</h3>
            <p>
              {project.Skills &&
                project.Skills.map((skill) => (
                  <Link
                    to={`/skills/${skill.id}`}
                    key={skill.id}
                    className="badge badge-outline mr-2"
                  >
                    {skill.name}
                  </Link>
                ))}
            </p>
            <h3 className="font-bold">Matching users:</h3>
            <p>
              {matches &&
                matches.map((user) => (
                  <Link
                    to={`/users/${user.id}`}
                    key={user.id}
                    className="badge badge-outline mr-2"
                  >
                    {user.firstName} {user.lastName}
                  </Link>
                ))}
            </p>
            <div className="card-actions justify-between mt-4">
              <Link to={-1} className="btn btn-primary">
                Back
              </Link>
              {canEdit && (
                <button
                  className="btn btn-primary"
                  onClick={() => navigate(`/projects/edit/${project.id}`)}
                >
                  Edit Project
                </button>
              )}
            </div><br></br>
            <h3 className="font-bold">Comments:</h3>
            <ul>
              {comments &&
                comments.map((comment) => (
                  <li key={comment.id}>
                    <CommentCard comment={comment} />
                  </li>
                ))}
            </ul>
            <CommentAddForm model="projects" id={id} reload={commentsLoader} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetail;
