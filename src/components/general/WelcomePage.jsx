import { useEffect, useState } from "react";
import { useApp } from "../../context/AppContext";
import { getMatches } from "../../utility/fetchData";
import { Link } from "react-router-dom";

const WelcomePage = () => {
  const [jobMatches, setJobMatches] = useState(null);
  const [projectMatches, setProjectMatches] = useState(null);
  const { appUser, token, loading, setLoading } = useApp();

  const jobMatchesLoader = async () => {
    const props = {
      getModel: "jobs",
      fromModel: "users",
      fromId: appUser.id,
      token: token,
      setLoading: setLoading,
    };
    const data = await getMatches(props);
    setJobMatches(data.results);
  };

  const projectMatchesLoader = async () => {
    const props = {
      getModel: "projects",
      fromModel: "users",
      fromId: appUser.id,
      token: token,
      setLoading: setLoading,
    };
    const data = await getMatches(props);
    setProjectMatches(data.results);
  };

  useEffect(() => {
    if (!appUser) return;
    jobMatchesLoader();
    projectMatchesLoader();
    console.log("appUser",appUser)
  }, [appUser]);

  return (
    <div
      className={`max-w-screen-lg mx-auto p-4 my-8 ${loading ? "hidden" : ""}`}
    ><h1 className="font-bold text-2xl">Hi {appUser.firstName} {appUser.lastName}!</h1>
    <br></br>
      <p className="font-semibold text-xl">Welcome Back! &#128526;</p>
      <br></br>
      <h3 className="font-semibold">
        We found lots of people you may like to get in touch with:
      </h3>
      <p>
        <Link className="link link-primary link-hover" to="/users">see them all</Link>
      </p>
      <br></br>
      <h3 className="font-semibold">
        And the following jobs match your profile:
      </h3>
      <ul>
        {jobMatches &&
          jobMatches.map((job) => (
            <li key={job.id}>
              <Link className="link link-primary link-hover" to={`/jobs/${job.id}`}>{job.title}</Link>
            </li>
          ))}
      </ul>
      <br></br>
      <h3 className="font-semibold">
        You may also like to have a look at these interesting projects, picked especially for you:
      </h3>
      <ul>
        {projectMatches &&
          projectMatches.map((project) => (
            <li key={project.id}>
              <Link className="link link-primary link-hover" to={`/projects/${project.id}`}>{project.title}</Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default WelcomePage;
