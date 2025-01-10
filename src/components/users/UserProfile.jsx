import { useEffect } from "react";
import { useApp } from "../../context/AppContext";
import { Link } from "react-router-dom";

const UserProfile = () => {
  const { appUser, loading } = useApp();

  useEffect(() => {console.log(appUser) }, [appUser]);

  return (
    <>
      {appUser && (
        <div
          className={`max-w-screen-lg mx-auto p-4 my-8 ${
            loading ? "hidden" : ""
          }`}
        >
          <div className="card bg-base-100 w-full shadow-xl">
            <h2 className="text-2xl font-bold mb-4 text-center">
              Your Profile
            </h2>
            <figure className="w-56 h-auto">
              <img
                src={appUser?.avatar || "/profile.png"}
                alt={appUser.firstName}
              />
            </figure>
            <div className="card-body ">
              <h2 className="card-title text-xl font-bold">
                {appUser.firstName + " " + appUser.lastName}
              </h2>
              <h3 className="font-bold">
                Role:<span className="font-normal">{" " + appUser?.role}</span>
              </h3>
              <h3 className="font-bold">
                Works at:{" "}
                <span className="font-normal">
                  {appUser?.Company?.name || "-"}
                </span>
              </h3>
              <h3 className="font-bold">
                Email: <span className="font-normal">{appUser?.email}</span>
              </h3>
              <h3 className="font-bold">
                Skills:
                {appUser.Skills ? (
                  appUser.Skills.map((skill) => (
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
              </h3>

              <h3 className="font-bold">Projects posted:</h3>
              {appUser.Projects ? (
                appUser.Projects.map((project) => (
                  <Link
                    to={`/projects/${project.id}`}
                    key={project.id}
                    className="Link underline text-blue-800"
                  >
                    {project.title}
                  </Link>
                ))
              ) : (
                <span className="font-normal">-</span>
              )}
              <h3 className="font-bold">Jobs posted:</h3>
              {appUser.Jobs ? (
                appUser.Jobs.map((job) => (
                  <Link
                    to={`/jobs/${job.id}`}
                    key={job.id}
                    className="Link underline text-blue-800"
                  >
                    {job.title}
                  </Link>
                ))
              ) : (
                <span className="font-normal">-</span>
              )}

              <Link
                to={`/users/edit/${appUser?.id}`}
                className="btn btn-primary mt-3 ml-11"
              >
                Edit Profile
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default UserProfile;
