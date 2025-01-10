import { Link } from "react-router-dom"

const CompanyCard = ({company}) => {
    console.log(company);

  return (
    <li className="collapse bg-gray-100 rounded-lg mb-4">
    <input type="checkbox" />
    <div className="collapse-title text-lg font-medium flex items-center gap-4">
      {/* Company Logo */}
      <img
        src={company?.logo || "/logo.png"} // Use default logo if null
        alt={company?.name || "Company Logo"}
        className="h-10 w-10 object-cover rounded-full"
      />
      {/* Job Title and Location */}
      <span>
        {company.name}
      </span>
    </div>
    <div className="collapse-content">
      <Link to={`/companies/${company.id}`} className="btn btn-primary mt-2">
        More Details
      </Link>
    </div>
  </li>
  )
}

export default CompanyCard