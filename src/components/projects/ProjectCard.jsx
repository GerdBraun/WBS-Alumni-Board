import { Link } from "react-router-dom";

const ProjectCard = ({ project }) => {
  return (
    <div className="collapse collapse-arrow bg-base-100 border shadow-xl mb-4">
      <input type="checkbox" />
      <div className="collapse-title text-xl font-medium flex items-center gap-4">
        <h2 className="">{project.title}</h2>
        </div>
        <div className="collapse-content">
          {" "}
          <Link to={`/projects/${project.id}`} className="btn btn-primary">
            Details
          </Link>
        
      </div>
    </div>
  );
};

export default ProjectCard;
