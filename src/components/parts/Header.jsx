import { Link, NavLink } from "react-router-dom";
import { useApp } from "../../context/AppContext";

const Header = () => {
  const { appUser, logout } = useApp();
  return (
    <div className="relative z-10">
      <div className="navbar bg-base-100  fixed ">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              {appUser && (
                <li>
                  <NavLink to="/welcome">Welcome</NavLink>
                </li>
              )}
              <li>
                <a>Projects</a>
                <ul className="p-2">
                  <li>
                    <NavLink to="/projects">list</NavLink>
                  </li>
                  <li>
                    <NavLink to="/projects/add">add</NavLink>
                  </li>
                </ul>
              </li>
              <li>
                <a>Jobs</a>
                <ul className="p-2">
                  <li>
                    <NavLink to="/jobs">list</NavLink>
                  </li>
                  <li>
                    <NavLink to="/jobs/add">add</NavLink>
                  </li>
                </ul>
              </li>
              <li>
                <a>Companies</a>
                <ul className="p-2">
                  <li>
                    <NavLink to="/companies">list</NavLink>
                  </li>
                  <li>
                    <NavLink to="/companies/add">add</NavLink>
                  </li>
                </ul>
              </li>
              <li>
                <a>User</a>
                <ul className="p-2">
                  {/* <li>
                    <NavLink to="/signup" className="text-nowrap">
                      sign up
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/login" className="text-nowrap">
                      log in
                    </NavLink>
                  </li> */}
                  <li>
                    <NavLink to="/users" className="text-nowrap">
                      list
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/users/add" className="text-nowrap">
                      add
                    </NavLink>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <Link to="/" className="btn btn-ghost text-xl">
            FULLSTACK.team
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            {appUser && (
              <li>
                <NavLink to="/welcome">Welcome</NavLink>
              </li>
            )}
            <li>
              <details>
                <summary>Projects</summary>
                <ul className="p-2">
                  <li>
                    <NavLink to="/projects">list</NavLink>
                  </li>
                  <li>
                    <NavLink to="/projects/add">add</NavLink>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <details>
                <summary>Jobs</summary>
                <ul className="p-2">
                  <li>
                    <NavLink to="/jobs">list</NavLink>
                  </li>
                  <li>
                    <NavLink to="/jobs/add">add</NavLink>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <details>
                <summary>Companies</summary>
                <ul className="p-2">
                  <li>
                    <NavLink to="/companies">list</NavLink>
                  </li>
                  <li>
                    <NavLink to="/companies/add">add</NavLink>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <details>
                <summary>User</summary>
                <ul className="p-2">
                  <li>
                    <NavLink to="/users" className="text-nowrap">
                      list
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/users/add" className="text-nowrap">
                      add
                    </NavLink>
                  </li>
                </ul>
              </details>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          {!appUser ? (
            <NavLink to="/signup" className="btn">
              Sign Up
            </NavLink>
          ) : (
            console.log("user is logged in")
          )}

          {!appUser ? (
            <NavLink to="/login" className="btn">
              Login
            </NavLink>
          ) : (
            <button onClick={logout} className="btn">log out</button>
          )}
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                
                {appUser && <img alt="placeholder profile image" src={appUser.avatar} />}
                {!appUser && <img alt="placeholder profile image" src="profile.png" />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
