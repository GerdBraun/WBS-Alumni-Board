import { useEffect, useState } from "react";
import { useApp } from "../../context/AppContext";
import { fetchDataByModelAndId } from "../../utility/fetchData";
import SkillsCard from "./SkillsCard";

const SkillsList = () => {
  const [skills, setSkills] = useState(null);
  const { token, loading, setLoading } = useApp();

  useEffect(() => {
    loader();
  }, []);

  const loader = async () => {
    const props = {
      model: "skills",
      setLoading: setLoading,
      token: token,
    };
    const data = await fetchDataByModelAndId(props);
    setSkills(data.results);
  };

  return (
    <div
      className={`container max-w-screen-lg mx-auto p-4 ${
        loading ? "hidden" : ""
      }`}
    >
      <h1 className="text-2xl font-bold mb-4">Skills Listing</h1>
      <ul>
        {skills &&
          skills.map((skill) => (
            <li key={skill.id}>
              <SkillsCard skill={skill} />
            </li>
          ))}
      </ul>
    </div>
  );
};

export default SkillsList;
