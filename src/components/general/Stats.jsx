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
              <div className="stat-value">{stats.users}</div>
              <div className="stat-desc">with {stats.skills} skills</div>
            </div>
          </div>
          <div className="stats shadow w-full text-center">
            <div className="stat">
              <div className="stat-title">Pojects</div>
              <div className="stat-value">{stats.projects}</div>
              <div className="stat-desc">
                with {stats.commentsOnProjects} comments
              </div>
            </div>
          </div>
          <div className="stats shadow w-full text-center">
            <div className="stat">
              <div className="stat-title">Job offers</div>
              <div className="stat-value">{stats.jobs}</div>
              <div className="stat-desc">
                with {stats.commentsOnJobs} comments
              </div>
            </div>
          </div>
          <div className="stats shadow w-full text-center">
            <div className="stat">
              <div className="stat-title">Questions</div>
              <div className="stat-value">{stats.questions}</div>
              <div className="stat-desc">
                with {stats.answersToQuestions} answers
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Stats;
