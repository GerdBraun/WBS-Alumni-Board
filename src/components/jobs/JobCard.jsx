import React from "react";
import { Link } from "react-router-dom";

const JobCard = ({ job }) => {
  return (
    <div className="collapse bg-gray-100 rounded-lg mb-4">
      <input type="checkbox" />
      <div className="collapse-title text-lg font-medium flex items-center gap-4">
        {/* Company Logo */}
        <img
          src={job.Company?.logo || "/logo.png"} // Use default logo if null
          alt={job.Company?.name || "Company Logo"}
          className="h-10 w-10 object-cover rounded-full"
        />
        {/* Job Title and Location */}
        <span>
          {job.title} - {job.location}
        </span>
      </div>
      <div className="collapse-content">
        <p>{job.description}</p>
        <Link to={`/jobs/${job.id}`} className="btn btn-primary mt-2">
          More Details
        </Link>
      </div>
    </div>
  );
};

export default JobCard;
