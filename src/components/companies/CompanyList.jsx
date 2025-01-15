import { useApp } from "../../context/AppContext";
import { fetchDataByModelAndId } from "../../utility/fetchData";
import { useEffect, useState } from "react";
import CompanyCard from "./CompanyCard";
import { Link, useSearchParams } from "react-router-dom";
import SearchForm from "../parts/SearchForm";

const CompanyList = () => {
  const [companies, setCompanies] = useState([]);
  const { appUser, token, loading, setLoading } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();
  const [paginationData, setPaginationData] = useState(null);

  const loadCompaniesData = async () => {
    const props = {
      model: "companys",
      setLoading: setLoading,
      token: token,
      page: searchParams.get("page"),
    };
    const data = await fetchDataByModelAndId(props);

    setCompanies(data?.results || []);

    setPaginationData({
      ...paginationData,
      currentPage: data.currentPage,
      totalPages: data.totalPages,
      hasNextPage: data.hasNextPage,
      hasPreviousPage: data.hasPreviousPage,
    });
  };
  useEffect(() => {
    if (token) loadCompaniesData();
  }, [token, searchParams]);

  return (
    <div className="max-w-screen-lg mx-auto p-4 my-8">
      <ul className={`container ${loading ? "hidden" : ""}`}>
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
        <SearchForm searchPlaceholder="Search companies..." searchModel="companies" />
        {companies &&
          companies?.map((company) => (
            <CompanyCard key={company?.id} company={company} />
          ))}
      </ul>
      {paginationData && (
        <div className="flex justify-around mt-8">
          <div className="join">
            <Link
              to={`/companies?page=${paginationData.currentPage - 1}`}
              className="join-item btn btn-primary"
              disabled={!paginationData.hasPreviousPage}
            >
              «
            </Link>
            <Link
              to={`/companies?page=${paginationData.currentPage}`}
              className="join-item btn bg-base-100 hover:bg-base-100"
            >
              Page {paginationData.currentPage}
            </Link>
            <Link
              to={`/companies?page=${paginationData.currentPage + 1}`}
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

export default CompanyList;
