import { Link } from "react-router-dom";

const QACard = ({ question }) => {
  return (
    <div key={question.id} className="collapse collapse-arrow bg-base-100 border shadow-xl  mb-4">
      <input type="checkbox" />
      <div className="collapse-title text-xl font-medium flex items-center gap-4">
        <p>{question.title}</p>
      </div>
      <div className="collapse-content">
        <p>{question.description}</p>
        <Link to={`/qa/${question.id}`} className="btn btn-primary mt-2">
          More Details
        </Link>
      </div>
    </div>
  );
};

export default QACard;
