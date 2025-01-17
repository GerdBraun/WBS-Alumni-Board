import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import { fetchDataByModelAndId } from "../../utility/fetchData";

const UserDetail = () => {
  const { token, appUser, loading, setLoading } = useApp();
  const [aUser, setAUser] = useState(null);
  const [canEdit, setCanEdit] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    if (id && token) loader();
  }, [id, token]);

  const loader = async () => {
    const props = {
      model: "users",
      id: id,
      token: token,
      setLoading: setLoading,
    };
    const data = await fetchDataByModelAndId(props);

    setAUser(data);
    console.log("hi there user: ", { data });

    // Determine if the user can edit the company
    const isOwner = id == appUser?.id;
    const isAdminOrModerator =
      appUser?.role === "admin" || appUser?.role === "moderator";

    setCanEdit(isOwner || isAdminOrModerator);
  };
  return (
    <div
      className={`max-w-screen-lg mx-auto p-4 my-8 ${loading ? "hidden" : ""}`}
    >
      {!appUser && (
        <>
          <h1 className="text-2xl font-bold mb-4">
            Please log in to see user details
          </h1>
        </>
      )}
      {aUser && (
        <>
          {" "}
          <h1 className="text-2xl font-bold mb-4">User Details</h1>
          <div className="card bg-base-100 border w-full shadow-xl">
            {" "}
            <div className="card-body ">
              <figure className="w-56 h-auto">
                <img
                  src={aUser?.avatar || "/profile.png"}
                  alt={aUser.firstName}
                />
              </figure>
              <h2 className="card-title text-xl font-bold mb-4 ">
                {aUser.firstName + " " + aUser.lastName}
              </h2>
              <h3 className="font-bold">
                Role:<span className="font-normal">{" " + aUser?.role}</span>
              </h3>
              <h3 className="font-bold">
                Works at:{" "}
                <span className="font-normal">
                  {aUser?.Company?.name || "-"}
                </span>
              </h3>
              <h3 className="font-bold">
                Skills:{" "}
                {aUser.Skills.length !== 0 ? (
                  aUser.Skills.map((skill) => (
                    <Link
                      to={`/skills/${skill.id}`}
                      key={skill.id}
                      className="badge badge-outline mr-2 font-normal"
                    >
                      {skill.name}
                    </Link>
                  ))
                ) : (
                  <span className="font-normal">-</span>
                )}
              </h3>{" "}
              {/* only show from here if has  posted projects and or jobs */}
              <h3 className="font-bold">Projects posted:</h3>
              {aUser.Projects.length !== 0 ? (
                aUser.Projects.map((project) => (
                  <Link
                    to={`/projects/${project.id}`}
                    key={project.id}
                    className="Link link-primary link-hover"
                  >
                    {project.title}
                  </Link>
                ))
              ) : (
                <span className="font-normal">-</span>
              )}
              <h3 className="font-bold">Jobs posted:</h3>
              {aUser.Jobs.length !== 0 ? (
                aUser.Jobs.map((job) => (
                  <Link
                    to={`/jobs/${job.id}`}
                    key={job.id}
                    className="Link link-primary link-hover"
                  >
                    {job.title}
                  </Link>
                ))
              ) : (
                <span className="font-normal">-</span>
              )}
            </div>
            <div className="card-actions justify-between p-6 ">
              {" "}
              <Link to={-1} className="btn btn-primary">
                Back
              </Link>
              {canEdit && (
                <Link to={`/users/edit/${id}`} className="btn btn-primary">
                  Edit
                </Link>
              )}
            </div>
          </div>
        </>
      )}
      <br></br>
    </div>
  );
};

export default UserDetail;
