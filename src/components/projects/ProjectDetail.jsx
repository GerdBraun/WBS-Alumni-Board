import { useEffect, useState } from "react";
import { useApp } from "../../context/AppContext";
import { Link, useParams } from "react-router-dom";
import CommentCard from "../comments/CommentCard";

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [comments, setComments] = useState(null);
  const { getProjects, getCommentsByModelAndId,loading } = useApp();
  useEffect(() => {
    loader(id);
    commentsLoader(id);
  }, [id]);

  const loader = async () => {
    const data = await getProjects(id);
    setProject(data);
  };

  const commentsLoader = async () => {
    const data = await getCommentsByModelAndId({ model: "projects", id });
    setComments(data.results);
  };

  return (
    <div
      className={`max-w-screen-lg mx-auto p-4 my-8 ${loading ? "hidden" : ""}`}
    >
      {project && (
        <div className="card bg-base-100 w-full shadow-xl">
          <div className="card-body">
            <h2 className="card-title">{project.title}</h2>
            <p>
              posted by&nbsp;
              <Link to={`/users/${project.User.id}`} className="link">
                {project.User.firstName} {project.User.lastName}
              </Link>
            </p>
            <h3 className="font-bold">Description:</h3>
            <p>{project.description}</p>
            <h3 className="font-bold">Skills:</h3>
            <p>
              {project.Skills &&
                project.Skills.map((skill) => (
                  <span key={skill.id} className="badge badge-outline mr-2">
                    {skill.name}
                  </span>
                ))}
            </p>
            <div className="card-actions justify-end">
              <Link to={-1} className="btn btn-primary">
                Back
              </Link>
            </div>
            <h3 className="font-bold">Comments:</h3>
            <ul>
              {comments &&
                comments.map((comment) => (
                  <li key={comment.id}>
                    <CommentCard comment={comment} />
                  </li>
                ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetail;
