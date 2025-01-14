import { Link } from "react-router-dom";

const SkillsCard = ({ skill }) => {  return (
    <div key={skill.id} className="collapse collapse-arrow bg-base-100 border shadow-xl mb-4">
      <input type="checkbox" />
      <div className="collapse-title text-xl font-semibold flex items-center gap-4">
        <p>{skill.name}</p>
      </div>
      <div className="collapse-content">
        <p className="font-medium">Users with this skill:</p>
        <div className="list-disc pl-1 mt-2">
            {skill.Users && skill.Users.map((user) => (
              <h3 key={user.id} className="">
                <Link to={`/users/${user.id}`} className="link link-primary link-hover">{user.firstName} {user.lastName}</Link>
              </h3>
            ))}
          </div>

      </div>
    </div>
  );
};

export default SkillsCard;
