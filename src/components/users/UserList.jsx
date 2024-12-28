import UserCard from "./UserCard";
import { useApp } from "../../context/AppContext";
import { fetchDataByModelAndId } from "../../utility/fetchData";
import { useEffect, useState } from "react";

const UserList = () => {
  const [usersData, setUsersData] = useState([null]);
  const { token, loading, setLoading } = useApp();

  const loadUsersData = async () => {
    const props = {
      model: "users",
      setLoading: setLoading,
      token: token,
    };
    const data = await fetchDataByModelAndId(props);

    setUsersData(data?.results || []);
    console.log(data.results);
    console.log(usersData);
  };
  useEffect(() => {
    loadUsersData();
  }, []);

  return (
    <ul className={`container mx-auto p-4 ${loading ? "hidden" : ""}`}>
      <h1 className="text-2xl font-bold mb-4">Users Listing</h1>
        
        { usersData?.map((aUser) => (
           <li key={crypto.randomUUID()} className="mb-4">
             <UserCard aUser={aUser} />
           </li>
        ))}   
    </ul>
  );
};

export default UserList;
