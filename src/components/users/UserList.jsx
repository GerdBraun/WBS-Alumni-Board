import UserCard from "./UserCard";
import { useApp } from "../../context/AppContext";
import { fetchDataByModelAndId } from "../../utility/fetchData";
import { useEffect, useState } from "react";

const UserList = () => {
  const [usersData, setUsersData] = useState([null]);
  const { appUser, token, loading, setLoading } = useApp();

  const loadUsersData = async () => {
    const props = {
      model: "users",
      setLoading: setLoading,
      token: token,
    };
    const data = await fetchDataByModelAndId(props);

    setUsersData(data?.results || []);
    // console.log("user list page data: ",data.results,{token});
    //console.log(usersData);
  };
  useEffect(() => {
    if (token) loadUsersData();
  }, [token]);

  return (
    <ul
      className={`container max-w-screen-lg mx-auto p-4 ${
        loading ? "hidden" : ""
      }`}
    >
      {appUser && (
        <>
          <h1 className="text-2xl font-bold mb-4">Users Listing</h1>
        </>
      )}
      {!appUser && (
        <>
          <h1 className="text-2xl font-bold mb-4">
            Please log in to see users
          </h1>
        </>
      )}
      {usersData?.map((aUser) => (
        <li key={aUser?.id} className="mb-4">
          <UserCard aUser={aUser} />
        </li>
      ))}
    </ul>
  );
};

export default UserList;
