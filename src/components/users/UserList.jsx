import { useApp } from "../../context/AppContext";
import { fetchDataByModelAndId } from "../../utility/fetchData";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import UserCard from "./UserCard";

const UserList = () => {
  const [usersData, setUsersData] = useState([null]);
  const { appUser, token, loading, setLoading } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();
  const [paginationData, setPaginationData] = useState(null);

  const loadUsersData = async () => {
    const props = {
      model: "users",
      setLoading: setLoading,
      token: token,
      page: searchParams.get("page"),
    };
    const data = await fetchDataByModelAndId(props);

    setUsersData(data?.results || []);
    // console.log("user list page data: ",data.results,{token});
    //console.log(usersData);

    setPaginationData({
      ...paginationData,
      currentPage: data.currentPage,
      totalPages: data.totalPages,
      hasNextPage: data.hasNextPage,
      hasPreviousPage: data.hasPreviousPage,
    });
  };
  useEffect(() => {
    if (token) loadUsersData();
  }, [token, searchParams]);

  return (
    <div className="max-w-screen-lg mx-auto p-4 my-8">
      <ul
        className={`container ${
          loading ? "hidden" : ""
        }`}
      >
        {appUser && <h1 className="text-2xl font-bold mb-4">Users Listing</h1>}
        {!appUser && (
          <h1 className="text-2xl font-bold mb-4">
            Please log in to see users
          </h1>
        )}
        {usersData?.map((aUser) => (
          <li key={aUser?.id} className="mb-4">
            <UserCard aUser={aUser} />
          </li>
        ))}
      </ul>
      {paginationData && (
        <div className="flex justify-around mt-8">
          <div className="join">
            <Link
              to={`/users?page=${paginationData.currentPage - 1}`}
              className="join-item btn btn-primary"
              disabled={!paginationData.hasPreviousPage}
            >
              «
            </Link>
            <button className="join-item btn bg-base-100">
              Page {paginationData.currentPage}
            </button>
            <Link
              to={`/users?page=${paginationData.currentPage + 1}`}
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

export default UserList;
