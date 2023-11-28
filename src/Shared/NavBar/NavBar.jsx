import { Link, NavLink } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";

const NavBar = () => {
  const { user, userLogOut } = useAuth();
  const navItem = (
    <>
      <NavLink
        to={"/"}
        className={({ isActive }) => (isActive ? "text-orange-400" : " ")}
      >
        Home
      </NavLink>
      <NavLink
        to={"/contests"}
        className={({ isActive }) =>
          isActive ? "text-orange-400 mx-3" : "mx-3"
        }
      >
        All Contests
      </NavLink>
      <NavLink
        to={"/login"}
        className={({ isActive }) =>
          isActive ? "text-orange-400 mx-3" : "mx-3"
        }
      >
        Login
      </NavLink>
      <NavLink
        to={"/signup"}
        className={({ isActive }) =>
          isActive ? "text-orange-400 mx-3" : "mx-3"
        }
      >
        Signup
      </NavLink>
    </>
  );

  const handleLogOut = () => {
    userLogOut().then();
  };

  return (
    <div className="bg-base-100 shadow-sm pt-2">
      <div className="navbar  container">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
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
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2  shadow bg-base-100 rounded-box w-52"
            >
              {navItem}
            </ul>
          </div>

          <img
            className="w-[170px]"
            src="https://i.ibb.co/WkGxrPP/contest-hub.png"
            alt=""
          />
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navItem}</ul>
        </div>
        <div className="navbar-end">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img alt="User" src={user?.photoURL} />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[9] p-4 space-y-3 shadow bg-orange-500 text-white  rounded-box w-52"
            >
              <li>{user ? user.displayName : "Gost"}</li>
              <Link to={"/dashboard"}>Dashboard</Link>
              <Link onClick={handleLogOut}>LogOut</Link>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
