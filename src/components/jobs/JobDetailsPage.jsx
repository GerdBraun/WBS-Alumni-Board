import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CommentCard from "../comments/CommentCard";
import {
  fetchDataByModelAndId,
  getCommentsByModelAndId,
  getMatches,
} from "../../utility/fetchData";
import { useApp } from "../../context/AppContext";
import CommentAddForm from "../comments/CommentAddForm";

const JobDetailsPage = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [comments, setComments] = useState([]);
  const [matchingUsers, setMatchingUsers] = useState([]);
  const { token, loading, setLoading } = useApp();

  useEffect(() => {
    const loadJobDetails = async () => {
      const props = {
        model: "jobs",
        id: id,
        token: token,
        setLoading: setLoading,
      };

      const jobDetails = await fetchDataByModelAndId(props);
      console.log("Fetched Job Data:", jobDetails);
      setJob(jobDetails);

      // const commentsProps = {
      //   model: "jobs",
      //   id: id,
      //   token: token,
      //   setLoading: setLoading,
      // };

      // const commentsData = await getCommentsByModelAndId(commentsProps);
      // setComments(commentsData?.results || []);
      commentsLoader();

      const matchesProps = {
        getModel: "users",
        fromModel: "jobs",
        fromId: id,
        token: token,
        setLoading: setLoading,
      };

      const users = await getMatches(matchesProps);
      setMatchingUsers(users?.results || []);
    };

    loadJobDetails();
  }, [id, token, setLoading]);

  const commentsLoader = async () => {
    const props = {
      model: "jobs",
      id: id,
      token: token,
      setLoading: setLoading,
    };
    const data = await getCommentsByModelAndId(props);
    setComments(data.results);
  };


  if (!job) return <p className="text-center my-8">Loading...</p>;

  return (
    <div className="max-w-screen-lg mx-auto p-4 my-8">
      {/* Job Card */}
      <div className="card bg-base-100 w-full shadow-xl">
        <div className="card-body">
          {/* Title */}
          <h2 className="card-title text-3xl font-bold mb-4">{job.title}</h2>
          {/* Posted By */}
          <p className="mb-2">
            posted by&nbsp;
            <Link to={`/users/${job.User?.id}`} className="link">
              {job.User?.firstName} {job.User?.lastName}
            </Link>
          </p>

          {/* Company */}
          <p className="text-lg mb-2">
            <strong>Company:</strong> {job.Company?.name || "N/A"}
          </p>

          {/* Location */}
          <p className="text-lg mb-4">
            <strong>Location:</strong> {job.location || "Not specified"}
          </p>

          {/* Description */}
          <h3 className="font-bold mt-4">Description:</h3>
          <p className="text-gray-700 mb-4">{job.description}</p>

          {/* Skills */}
          {job.Skills?.length > 0 && (
            <>
              <h3 className="font-bold mb-2">Skills Required:</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {job.Skills.map((skill) => (
                  <Link
                    to={`/skills/${skill.id}`}
                    key={skill.id}
                    className="badge badge-outline"
                  >
                    {skill.name}
                  </Link>
                ))}
              </div>
            </>
          )}

          {/* Matching Users */}
          <h3 className="font-bold mt-4 mb-2">Matching Users:</h3>
          {matchingUsers.length > 0 ? (
            <div className="flex flex-wrap gap-2 mb-4">
              {matchingUsers.map((user) => (
                <Link
                  to={`/users/${user.id}`}
                  key={user.id}
                  className="badge badge-outline"
                >
                  {user.firstName} {user.lastName}
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No matching users found.</p>
          )}

          {/* Comments */}
          <h3 className="font-bold mt-4 mb-2">Comments:</h3>
          {comments.length > 0 ? (
            <ul>
              {comments.map((comment) => (
                <li key={comment.id}>
                  <CommentCard comment={comment} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No comments yet.</p>
          )}

          <CommentAddForm model="jobs" id={id} reload={commentsLoader} />

          {/* Created and Updated Dates */}
          <p className="text-gray-500 text-sm mt-4">
            <strong>Created At:</strong>{" "}
            {new Date(job.createdAt).toLocaleDateString()} |{" "}
            <strong>Updated At:</strong>{" "}
            {new Date(job.updatedAt).toLocaleDateString()}
          </p>

          {/* Apply and Back Buttons */}
          <div className="card-actions justify-between mt-4">
            <a
              href={job.link}
              className="btn btn-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Apply Here
            </a>
            <Link to={-1} className="btn btn-primary">
              Back
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsPage;
