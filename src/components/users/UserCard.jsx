import { Link } from "react-router-dom";
const UserCard = ({ aUser }) => {
  return (
    <div>
      <div
        tabIndex={0}
        className="collapse collapse-arrow border-base-300 bg-base-200 border"
      >
        <div className="collapse-title text-xl font-medium flex items-center gap-4">
          <img
            src={aUser?.avatar || "/profile.png"} // Use default avatar if null
            alt={aUser?.firstName}
            className="h-10 w-10 object-cover rounded-full"
          />
          <div> {aUser?.firstName + " " + aUser?.lastName}</div>
          
        </div><div>
            <Link
              to="/contact"
              className="link link-hover text-blue-700  underline ml-16 font-thin text-base "
            >
              Request to contact
            </Link>
          </div>
        <div className="collapse-content">
          <p className="text-sm ml-12">
            works at:{" "}
            <span className="text-sm font-medium">{aUser?.Company?.name}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
