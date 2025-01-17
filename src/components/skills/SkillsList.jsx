import { useEffect, useState } from "react";
import { useApp } from "../../context/AppContext";
import { fetchDataByModelAndId } from "../../utility/fetchData";
import { Link, useSearchParams } from "react-router-dom";
import SkillsCard from "./SkillsCard";
import SearchForm from "../parts/SearchForm";

const SkillsList = () => {
  const [skills, setSkills] = useState(null);
  const { token, loading, setLoading } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();
  const [paginationData, setPaginationData] = useState(null);

  // TODO: check functionality!!!
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    console.log("searchTerm: ", searchTerm);
    searchParams.set("search", searchTerm);
    if(token) loader();
  }, [searchTerm,token]);

  useEffect(() => {
    setSearchTerm(searchParams.get("search"));
    if (token) loader();
  }, [token, searchParams]);

  const loader = async () => {
    const props = {
      model: "skills",
      setLoading: setLoading,
      token: token,
      page: searchParams.get("page"),
      search: searchTerm,
    };
    const data = await fetchDataByModelAndId(props);
    setSkills(data.results);

    setPaginationData({
      ...paginationData,
      currentPage: data.currentPage,
      totalPages: data.totalPages,
      hasNextPage: data.hasNextPage,
      hasPreviousPage: data.hasPreviousPage,
    });
  };

  return (
    <div
      className={`container max-w-screen-lg mx-auto p-4 ${
        loading ? "hidden" : ""
      }`}
    >
      <h1 className="text-2xl font-bold mb-4">Skills Listing</h1>
      <SearchForm searchPlaceholder="Search skills..." searchModel="skills" searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <ul>
        {skills &&
          skills.map((skill) => (
            <li key={skill.id}>
              <SkillsCard skill={skill} />
            </li>
          ))}
      </ul>
      {paginationData && (
        <div className="flex justify-around mt-8">
          <div className="join">
            <Link
              to={`/skills?page=${paginationData.currentPage - 1}`}
              className="join-item btn btn-primary"
              disabled={!paginationData.hasPreviousPage}
            >
              «
            </Link>
            <Link
              to={`/skills?page=${paginationData.currentPage}`}
              className="join-item btn bg-base-100 hover:bg-base-100"
            >
              Page {paginationData.currentPage}
            </Link>
            <Link
              to={`/skills?page=${paginationData.currentPage + 1}`}
              className="join-item btn btn-primary"
              disabled={!paginationData.hasNextPage}
            >
              »
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillsList;
