import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import { fetchDataByModelAndId } from "../../utility/fetchData";

const UserDetail = () => {
  const { token, loading, setLoading } = useApp();
  const [aUser, setAUser] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    loader(id);
  }, [id]);

  const loader = async () => {
    const props = {
      model: "users",
      id: id,
      token: token,
      setLoading: setLoading,
    };
    const data = await fetchDataByModelAndId(props);
    //console.log("hi there user: ",{ data });
    setAUser(data);
  };
  return (
    <div
      className={`max-w-screen-lg mx-auto p-4 my-8 ${loading ? "hidden" : ""}`}
    >
      {aUser && (
        <div className="card bg-base-100 w-full shadow-xl">
          <div className="card-body">
            <h2 className="card-title">
              {aUser.firstName + " " + aUser.lastName}
            </h2>
            <h3 className="font-bold">Email address:</h3>
            <p>{aUser?.email}</p>
            <h3 className="font-bold">Role:</h3>
            <p>{aUser?.role}</p>
            <h3 className="font-bold">Works at:</h3>
            <p>{aUser?.Company?.name || "undefined"}</p>
            <h3 className="font-bold">Skills:</h3>{" "}
            {/* only show from here if has  posted projects and or jobs */}
            <h3 className="font-bold">Has posted:</h3>
            <h3 className="font-bold">Projects:</h3>
            <h3 className="font-bold">Jobs:</h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDetail;
