import { useApp } from "../../context/AppContext";
import { fetchDataByModelAndId } from "../../utility/fetchData";
import { useEffect, useState } from "react";
import CompanyCard from "./CompanyCard";

const CompanyList = () => {
  const [companies, setCompanies] = useState([]);
  const { appUser, token, loading, setLoading } = useApp();
  const loadCompaniesData = async () => {
    const props = {
      model: "companys",
      setLoading: setLoading,
      token: token,
    };
    const data = await fetchDataByModelAndId(props);

    setCompanies(data?.results || []);
    console.log(data.results);
  };
  useEffect(() => {
    loadCompaniesData();
  }, []);
  return (
    <ul
      className={`container max-w-screen-lg mx-auto p-4 ${
        loading ? "hidden" : ""
      }`}
    >
      {appUser && (
        <>
          <h1 className="text-2xl font-bold mb-4">Companies Listing</h1>
        </>
      )}
      {!appUser && (
        <>
          <h1 className="text-2xl font-bold mb-4">
            Please log in to see companies
          </h1>
        </>
      )}
      {companies &&
        companies?.map((company) => (
          <CompanyCard key={company?.id} company={company} />
        ))}
    </ul>
  );
};

export default CompanyList;
