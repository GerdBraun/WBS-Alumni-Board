import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import { fetchDataByModelAndId } from "../../utility/fetchData";

const UserDetail = () => {
  const { token, appUser, loading, setLoading } = useApp();
  const [aUser, setAUser] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    loader();
  }, [id]);

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
        <div className="card bg-base-100 w-full shadow-xl">
          <figure className="w-56 h-auto">
            <img src={aUser?.avatar || "/profile.png"} alt={aUser.firstName} />
          </figure>
          <div className="card-body ">
            <h2 className="card-title text-xl font-bold">
              {aUser.firstName + " " + aUser.lastName}
            </h2>
            <h3 className="font-bold">
              Role:<span className="font-normal">{" " + aUser?.role}</span>
            </h3>
            <h3 className="font-bold">
              Works at:
              <span className="font-normal">
                {" " + aUser?.Company?.name || "undefined"}
              </span>
            </h3>
            <h3 className="font-bold">Skills:{" "}{aUser.Skills &&
              aUser.Skills.map((skill) => (
                <Link
                  to={`/skills/${skill.id}`}
                  key={skill.id}
                  className="badge badge-outline mr-2 font-normal"
                >
                  {skill.name}
                </Link>
              ))}</h3>
            {" "}
            {/* only show from here if has  posted projects and or jobs */}
            <h3 className="font-bold">Projects posted:</h3>
            {aUser.Projects &&
              aUser.Projects.map((project) => (
                <Link
                  to={`/projects/${project.id}`}
                  key={project.id}
                  className="Link underline text-blue-800"
                >
                  {project.title}
                </Link>
              ))}
            <h3 className="font-bold">Jobs posted:</h3>
            {aUser.Jobs &&
              aUser.Jobs.map((job) => (
                <Link to={`/jobs/${job.id}`} key={job.id} className="Link underline text-blue-800">
                  {job.title}
                </Link>
              ))}
          </div>
        </div>
      )}
      <br></br>
      <Link to={-1} className="btn btn-primary">
        Back
      </Link>
    </div>
  );
};

export default UserDetail;
