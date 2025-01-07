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
    >
      <h3 className="font-bold">
        We found lots of people you would like to keep in contact with:
      </h3>
      <p>
        <Link to="/users">see them all</Link>
      </p>
      <h3 className="font-bold">
        We found the following jobs matching your profile:
      </h3>
      <ul>
        {jobMatches &&
          jobMatches.map((job) => (
            <li key={job.id}>
              <Link to={`/jobs/${job.id}`}>{job.title}</Link>
            </li>
          ))}
      </ul>
      <h3 className="font-bold">
        We found the following projects matching your profile:
      </h3>
      <ul>
        {projectMatches &&
          projectMatches.map((project) => (
            <li key={project.id}>
              <Link to={`/projects/${project.id}`}>{project.title}</Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default WelcomePage;
