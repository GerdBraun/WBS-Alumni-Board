import React from "react";
import { Link } from "react-router-dom";

const JobCard = ({ job }) => {
  return (
    <div className="collapse collapse-arrow bg-base-100 border shadow-xl mb-4">
      <input type="checkbox" />
      <div className="collapse-title text-xl font-medium flex items-center gap-4">
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
        <p className="mb-4">{job.description.substring(0, 200)+"..."}</p>
        <Link to={`/jobs/${job.id}`} className="btn btn-primary mt-2">
          More Details
        </Link>
      </div>
    </div>
  );
};

export default JobCard;
