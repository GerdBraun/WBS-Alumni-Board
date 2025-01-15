import { useEffect, useState } from "react";
import { useApp } from "../../context/AppContext";
import { fetchDataByModelAndId } from "../../utility/fetchData";

const Stats = () => {
  const [stats, setStats] = useState(null);
  const { token, loading, setLoading } = useApp();

  useEffect(() => {
    loader();
  }, []);

  const loader = async () => {
    const props = {
      model: "stats",
      setLoading: setLoading,
      token: token,
    };
    const data = await fetchDataByModelAndId(props);
    console.log(data);
    setStats(data);
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats && (
        <>
          <div className="stats shadow w-full text-center">
            <div className="stat">
              <div className="stat-title">Users</div>
              <div className="stat-value text-primary">{stats.users.toLocaleString()}</div>
              <div className="stat-desc">
                with {stats.skills.toLocaleString()} skills
                <br />
                that's{" "}
                {(stats.skills / stats.users).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}{" "}
                skills per user
              </div>
            </div>
          </div>
          <div className="stats shadow w-full text-center">
            <div className="stat">
              <div className="stat-title">Projects</div>
              <div className="stat-value text-primary">
                {stats.projects.toLocaleString()}
              </div>
              <div className="stat-desc">
                with {stats.commentsOnProjects.toLocaleString()} comments
                <br />
                that's{" "}
                {(stats.commentsOnProjects / stats.projects).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}{" "}
                comments per project
              </div>
            </div>
          </div>
          <div className="stats shadow w-full text-center">
            <div className="stat">
              <div className="stat-title">Job offers</div>
              <div className="stat-value text-primary">{stats.jobs.toLocaleString()}</div>
              <div className="stat-desc">
                with {stats.commentsOnJobs.toLocaleString()} comments
                <br />
                that's{" "}
                {(stats.commentsOnJobs / stats.jobs).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}{" "}
                comments per job
              </div>
            </div>
          </div>
          <div className="stats shadow w-full text-center">
            <div className="stat">
              <div className="stat-title">Questions</div>
              <div className="stat-value text-primary">
                {stats.questions.toLocaleString()}
              </div>
              <div className="stat-desc">
                with {stats.answersToQuestions.toLocaleString()} answers
                <br />
                that's{" "}
                {(stats.answersToQuestions / stats.questions).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}{" "}
                answers per question
             </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Stats;
