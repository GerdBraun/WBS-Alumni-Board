import { Link, NavLink } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import { OpenCloseMenu } from "../../utility/handelNavbar";
import ThemeSwitcher from "./ThemeSwitcher";

const Header = () => {
  const { appUser, logout } = useApp();

  //The js code to close all <details> elements except the one that was clicked
  OpenCloseMenu();

  return (
    <div className="relative z-10">
      <div className="navbar bg-base-100  fixed  shadow-xl">
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
                <NavLink
                  to="/"
                  className={(isActive) =>
                    "nav-link" + (!isActive ? " unselected" : "")
                  }
                >
                  Home{" "}
                </NavLink>
              </li>
              {appUser && (
                <li>
                  <NavLink
                    to="/welcome"
                    className={(isActive) =>
                      "nav-link" + (!isActive ? " unselected" : "")
                    }
                  >
                    Welcome
                  </NavLink>
                </li>
              )}
              <li>
                <NavLink
                  to="/skills"
                  className={(isActive) =>
                    "nav-link" + (!isActive ? " unselected" : "")
                  }
                >
                  Skills
                </NavLink>
              </li>
              <li>
                <a>Projects</a>
                <ul className="p-2">
                  <li>
                    <NavLink
                      to="/projects"
                      className={(isActive) =>
                        "nav-link" + (!isActive ? " unselected" : "")
                      }
                    >
                      list
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/projects/add"
                      className={(isActive) =>
                        "nav-link" + (!isActive ? " unselected" : "")
                      }
                    >
                      add
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li>
                <a>Jobs</a>
                <ul className="p-2">
                  <li>
                    <NavLink
                      to="/jobs"
                      className={(isActive) =>
                        "nav-link" + (!isActive ? " unselected" : "")
                      }
                    >
                      list
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/jobs/add"
                      className={(isActive) =>
                        "nav-link" + (!isActive ? " unselected" : "")
                      }
                    >
                      add
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li>
                <a>Q&A</a>
                <ul className="p-2">
                  <li>
                    <NavLink
                      to="/qa"
                      className={(isActive) =>
                        "nav-link" + (!isActive ? " unselected" : "")
                      }
                    >
                      list
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/qa/add"
                      className={(isActive) =>
                        "nav-link" + (!isActive ? " unselected" : "")
                      }
                    >
                      add
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li>
                <a>Companies</a>
                <ul className="p-2">
                  <li>
                    <NavLink
                      to="/companies"
                      className={(isActive) =>
                        "nav-link" + (!isActive ? " unselected" : "")
                      }
                    >
                      list
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/companies/add"
                      className={(isActive) =>
                        "nav-link" + (!isActive ? " unselected" : "")
                      }
                    >
                      add
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li>
                <NavLink
                  to="/users"
                  className={(isActive) =>
                    "nav-link" + (!isActive ? " unselected" : "")
                  }
                >
                  Users
                </NavLink>
              </li>
              {/* <li>
                <a>User</a>
                <ul className="p-2">
                  <li>
                    <NavLink
                      to="/users"
                      className={(isActive) =>
                        "nav-link" + (!isActive ? " unselected" : "")
                      }
                    >
                      list
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/users/add"
                      className={(isActive) =>
                        "nav-link" + (!isActive ? " unselected" : "")
                      }
                    >
                      add
                    </NavLink>
                  </li>
                </ul>
              </li> */}
            </ul>
          </div>
          <Link to="/" className="btn btn-ghost text-xl font-bold text-primary">
            FULLSTACK.team
          </Link>
        </div>
        <div
          tabIndex={0}
          role="button"
          className=" navbar-center hidden lg:flex"
        >
          <ul className="menu menu-horizontal px-1">
            <li>
              <NavLink
                to="/"
                className={(isActive) =>
                  "nav-link" + (!isActive ? " unselected" : "")
                }
              >
                Home
              </NavLink>
            </li>
            {appUser && (
              <li>
                <NavLink
                  to="/welcome"
                  className={(isActive) =>
                    "nav-link" + (!isActive ? " unselected" : "")
                  }
                >
                  Welcome
                </NavLink>
              </li>
            )}
            <li>
              <NavLink
                to="/skills"
                className={(isActive) =>
                  "nav-link" + (!isActive ? " unselected" : "")
                }
              >
                Skills
              </NavLink>
            </li>
            <li>
              <details>
                <summary>Projects</summary>
                <ul className="p-2">
                  <li>
                    <NavLink
                      to="/projects"
                      className={(isActive) =>
                        "nav-link" + (!isActive ? " unselected" : "")
                      }
                    >
                      list
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/projects/add"
                      className={(isActive) =>
                        "nav-link" + (!isActive ? " unselected" : "")
                      }
                    >
                      add
                    </NavLink>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <details>
                <summary>Jobs</summary>
                <ul className="p-2">
                  <li>
                    <NavLink
                      to="/jobs"
                      className={(isActive) =>
                        "nav-link" + (!isActive ? " unselected" : "")
                      }
                    >
                      list
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/jobs/add"
                      className={(isActive) =>
                        "nav-link" + (!isActive ? " unselected" : "")
                      }
                    >
                      add
                    </NavLink>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <details>
                <summary>Q&A</summary>
                <ul className="p-2">
                  <li>
                    <NavLink
                      to="/qa"
                      className={(isActive) =>
                        "nav-link" + (!isActive ? " unselected" : "")
                      }
                    >
                      list
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/qa/add"
                      className={(isActive) =>
                        "nav-link" + (!isActive ? " unselected" : "")
                      }
                    >
                      add
                    </NavLink>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <details>
                <summary>Companies</summary>
                <ul className="p-2">
                  <li>
                    <NavLink
                      to="/companies"
                      className={(isActive) =>
                        "nav-link" + (!isActive ? " unselected" : "")
                      }
                    >
                      list
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/companies/add"
                      className={(isActive) =>
                        "nav-link" + (!isActive ? " unselected" : "")
                      }
                    >
                      add
                    </NavLink>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <NavLink
                to="/users"
                className={(isActive) =>
                  "nav-link" + (!isActive ? " unselected" : "")
                }
              >
                Users
              </NavLink>
            </li>
            {/* 
            <li>
              <details>
                <summary>User</summary>
                <ul className="p-2">
                  <li>
                    <NavLink
                      to="/users"
                      className={(isActive) =>
                        "nav-link" + (!isActive ? " unselected" : "")
                      }
                    >
                      list
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/users/add"
                      className={(isActive) =>
                        "nav-link" + (!isActive ? " unselected" : "")
                      }
                    >
                      add
                    </NavLink>
                  </li>
                </ul>
              </details>
            </li> */}
          </ul>
        </div>

        <div className="navbar-end">
          {/* TODO: remove this for production */}
          <div className="mr-2 hidden lg:flex">
            <ThemeSwitcher />
          </div>{" "}
          {!appUser ? (
            <NavLink
              to="/signup"
              className="ml-2 btn btn-sm btn-outline btn-primary "
            >
              Sign Up
            </NavLink>
          ) : (
            console.log("user is logged in")
          )}
          {!appUser ? (
            <NavLink
              to="/login"
              className="btn btn-sm btn-outline btn-primary m-1"
            >
              Login
            </NavLink>
          ) : (
            <button
              onClick={logout}
              className="btn btn-sm btn-outline btn-primary"
            >
              log out
            </button>
          )}
          <div className="dropdown dropdown-end  ml-2">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                {appUser && (
                  <img
                    alt="placeholder profile image"
                    src={appUser?.avatar || "profile.png"}
                  />
                )}
                {!appUser && (
                  <img alt="placeholder profile image" src="profile.png" />
                )}
              </div>
            </div>
            {appUser && (
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-1 w-20 p-2 shadow"
              >
                <li>
                  <NavLink
                    to={`/users/profile/${appUser?.id}`}
                    className={(isActive) =>
                      "nav-link" + (!isActive ? " unselected" : "")
                    }
                  >
                    Profile
                  </NavLink>
                </li>
                <NavLink to="/settings" className="nav-link">
                  Settings
                </NavLink>
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
