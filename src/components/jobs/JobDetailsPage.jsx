import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchJobById } from "../../services/JobService"; 

const JobDetailsPage = () => {
  const { id } = useParams(); 
  const [job, setJob] = useState(null);

  useEffect(() => {
    const getJobDetails = async () => {
      try {
        const data = await fetchJobById(id); // Fetch job details from JobService
        setJob(data);
      } catch (error) {
        console.error("Error fetching job details:", error);
      }
    };
    getJobDetails();
  }, [id]);

  if (!job) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-4">
      {/* Job Title */}
      <h1 className="text-3xl font-bold mb-4">{job.title}</h1>

      {/* Job Company */}
      <p className="text-lg mb-2">
        <strong>Company:</strong> {job.Company?.name || "N/A"}
      </p>

      {/* Job Owner */}
      <p className="text-lg mb-2">
        <strong>Posted by:</strong> {job.User?.firstName} {job.User?.lastName}
      </p>

      {/* Job Location */}
      <p className="text-lg mb-2">
        <strong>Location:</strong> {job.location || "Not specified"}
      </p>

      {/* Job Description */}
      <p className="mt-4 mb-4">{job.description}</p>

      {/* Skills */}
      {job.Skills?.length > 0 && (
        <div className="mt-4 mb-4">
          <strong>Skills Required:</strong>
          <ul className="list-disc pl-5 mt-2">
            {job.Skills.map((skill) => (
              <li key={skill.id} className="text-gray-700">
                {skill.name}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Created and Updated Dates */}
      <p className="text-gray-500 text-sm">
        <strong>Created At:</strong>{" "}
        {new Date(job.createdAt).toLocaleDateString()} |{" "}
        <strong>Updated At:</strong>{" "}
        {new Date(job.updatedAt).toLocaleDateString()}
      </p>

      {/* Apply Button */}
      <a
        href={job.link}
        className="btn btn-primary mt-4"
        target="_blank"
        rel="noopener noreferrer"
      >
        Apply Here
      </a>
    </div>
  );
};

export default JobDetailsPage;
