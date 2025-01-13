import { Link } from "react-router-dom";

const SkillsCard = ({ skill }) => {  return (
    <div key={skill.id} className="collapse rounded-lg mb-4">
      <input type="checkbox" />
      <div className="collapse-title text-lg font-medium flex items-center gap-4">
        <p>{skill.name}</p>
      </div>
      <div className="collapse-content">
        <strong>Users with this skill:</strong>
        <ul className="list-disc pl-5 mt-2">
            {skill.Users && skill.Users.map((user) => (
              <li key={user.id} className="text-gray-700">
                <Link to={`/users/${user.id}`} className="link link-primary link-hover">{user.firstName} {user.lastName}</Link>
              </li>
            ))}
          </ul>

      </div>
    </div>
  );
};

export default SkillsCard;
