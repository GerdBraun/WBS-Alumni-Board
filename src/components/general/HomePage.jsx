import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      <div
        className="hero bg-base-200 min-h-screen w-full"
        style={{
          backgroundImage: "url(website-programming-code-picjumbo-com.jpg)",
        }}
      >
        <div className="hero-overlay bg-opacity-80"></div>
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Welcome to the<br/>FULLSTACK.team</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
            <Link to="/login" className="btn btn-primary">
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
