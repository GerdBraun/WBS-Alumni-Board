import { Link } from "react-router-dom";

const ProjectCard = ({ project }) => {
  return (
    <div className="card bg-base-100 w-full shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{project.title}</h2>
        <p>posted by {project.User.firstName} {project.User.lastName}</p>
        <div className="card-actions justify-end">
          <Link to={`/projects/${project.id}`} className="btn btn-primary">Details</Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
