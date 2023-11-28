import { FaUsers } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../Hooks/useAdmin";
import useCreator from "../Hooks/useCreator";

const Dashboard = () => {
  const [isAdmin] = useAdmin();
  const [isCreator] = useCreator();
  return (
    <div className="flex container">
      <div className="w-64 py-12 px-4 h-screen bg-orange-500">
        <ul className="menu space-y-4">
          {isAdmin ? (
            <>
              <li>
                <NavLink
                  to={"/dashboard/manageUser"}
                  className={"bg-white text-md"}
                >
                  <FaUsers className="text-orange-500 "></FaUsers> Manage User
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/dashboard/manageContest"}
                  className={"bg-white text-md}"}
                >
                  Manage Contest
                </NavLink>
              </li>
            </>
          ) : isCreator ? (
            <>
              <li>
                <NavLink
                  to={"/dashboard/addContest"}
                  className={"bg-white text-md}"}
                >
                  Add Contest
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/dashboard/myContest"}
                  className={"bg-white text-md}"}
                >
                  My Created Contest
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/dashboard/contestSubmit"}
                  className={"bg-white text-md}"}
                >
                  Contest Submitted Page
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink
                  to={"/dashboard/myProfile"}
                  className={"bg-white text-md}"}
                >
                  My Profile
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/dashboard/myParticipated"}
                  className={"bg-white text-md}"}
                >
                  My Participated Contest
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/dashboard/myWining"}
                  className={"bg-white text-md}"}
                >
                  My Winning Contest Page
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
      <div className=" flex-1 p-12">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
