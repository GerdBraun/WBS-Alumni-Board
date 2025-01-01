import { Link } from "react-router-dom";

const UserCard = ({ aUser }) => {
  return (
    <div tabIndex={0} className="collapse  bg-base-200 border">
      {" "}
      <input type="checkbox" />
      <div className="collapse-title text-xl font-medium flex items-center gap-4">
        <img
          src={aUser?.avatar || "/profile.png"} // Use default avatar if null
          alt={aUser?.firstName}
          className="h-10 w-10 object-cover rounded-full"
        />
        <div> {aUser?.firstName + " " + aUser?.lastName}</div>
      </div>
      <div className="collapse-content">
        <p className="text-sm ml-12">
          works at:
          <span className="text-sm font-medium">
            {" "+aUser?.Company?.name || "undefined"}
          </span>
        </p>
        <Link to={`/users/${aUser?.id}`} className="btn btn-primary mt-3 ml-11">
          More Details
        </Link>
        <span>
          <Link
            to="/contact"
            className="link link-hover text-blue-700  underline ml-10 font-thin text-base"
          >
            Request to contact
          </Link>
        </span>
      </div>
    </div>
  );
};

export default UserCard;
