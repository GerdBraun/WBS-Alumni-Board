import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import {
  fetchDataByModelAndId,
  getCommentsByModelAndId,
} from "../../utility/fetchData";
import CommentCard from "../comments/CommentCard";
import CommentAddForm from "../comments/CommentAddForm";

const CompanyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [company, setCompany] = useState(null);
  const [comments, setComments] = useState([]);
  const { token, loading, setLoading, appUser } = useApp();

  useEffect(() => {
    const loadCompanyDetails = async () => {
      const props = {
        model: "companys",
        id: id,
        token: token,
        setLoading: setLoading,
      };
      const companyDetails = await fetchDataByModelAndId(props);
      console.log("Fetched Company Data:", companyDetails);
      setCompany(companyDetails);
      console.log(companyDetails);
      commentsLoader();
    };
    loadCompanyDetails();
  }, [id, token, setLoading]);

  const commentsLoader = async () => {
    const props = {
      model: "companies",
      id: id,
      token: token,
      setLoading: setLoading,
    };
    const commentsData = await getCommentsByModelAndId(props);
    setComments(commentsData?.results || []);
  };

  if (!company) return <p className="text-center my-8">Loading...</p>;
  // Determine if the user can edit the company
  const isOwner = company.ownerId === appUser?.id;
  const isAdminOrModerator =
    appUser?.role === "admin" || appUser?.role === "moderator";
  console.log("company Owner ID:", company.ownerId);
  console.log("App User ID:", appUser?.id);

  const canEdit = isOwner || isAdminOrModerator;

  return (
    <>
      {company && (
        <div className="max-w-screen-lg mx-auto p-4 my-8">
          <h1 className="text-2xl font-bold mb-4">Company Details</h1>

          {/* Company Card */}
          <div className="card bg-base-100 w-full border shadow-xl">
            <div className="card-body">
              <figure className="w-56 h-auto">
                <img
                  src={company?.logo || "/logo.png"}
                  alt={company.name}
                />
              </figure>
              {/* Title */}
              <h2 className="card-title text-3xl font-bold mb-4">
                {company.name}
              </h2>

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
              <CommentAddForm
                model="companies"
                id={id}
                reload={commentsLoader}
              />
              {/* Created and Updated Dates */}
              <p className="text-gray-500 text-sm mt-4">
                <strong>Created At:</strong>{" "}
                {new Date(company.createdAt).toLocaleDateString()} |{" "}
                <strong>Updated At:</strong>{" "}
                {new Date(company.updatedAt).toLocaleDateString()}
              </p>

              {/* Edit and Back Buttons */}
              <div className="card-actions justify-between mt-4">
                {/* {canEdit && (
                  <button
                    className="btn btn-primary"
                    onClick={() => navigate(`/companies/edit/${company.id}`)}
                  >
                    Edit company
                  </button>
                )} */}

                <Link to={-1} className="btn btn-primary">
                  Back
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CompanyDetail;
