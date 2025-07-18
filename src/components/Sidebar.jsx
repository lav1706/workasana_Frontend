import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { AiOutlineTeam } from "react-icons/ai";
import { IoLogInOutline, IoLogOutOutline } from "react-icons/io5";
import { TbReportSearch } from "react-icons/tb";
import { useAuth } from "../Context/AuthContext"; // adjust path as needed

const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const sideLink = [
    {
      id: 1,
      name: "Dashboard",
      link: "/",
      icon: <MdOutlineSpaceDashboard />,
    },
    {
      id: 2,
      name: "Project",
      link: "/project",
      icon: <RxDashboard />,
    },
    {
      id: 3,
      name: "Team",
      link: "/team",
      icon: <AiOutlineTeam />,
    },
    {
      id: 4,
      name: "Report",
      link: "/report",
      icon: <TbReportSearch />,
    },
  ];

  const handleLogout = () => {
    logout(); // clears token & resets auth
    navigate("/login"); // navigate to login after logout
  };

  return (
    <div className="relative w-[250px] bg-gray-200 py-2 min-h-screen">
      <h1 className="font-bold md:text-4xl text-gray-800 p-4">Workasana</h1>

      {sideLink.map((item) => (
        <div
          key={item.id}
          className="p-2 text-xl hover:bg-gray-400 hover:scale-[1.05] w-[90%] m-auto rounded-b-lg"
        >
          <Link to={item.link} className="justify-between flex">
            <span>{item.name}</span>
            <span className="flex justify-center items-center ">
              {item.icon}
            </span>
          </Link>
        </div>
      ))}

      <div className="p-4 text-xl hover:bg-gray-400 hover:scale-[1.05] w-[90%] m-auto rounded-b-lg bottom-2 absolute">
        {user ? (
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 w-full"
          >
            <span>Logout</span>
            <IoLogOutOutline />
          </button>
        ) : (
          <Link to="/login" className="flex gap-2">
            <span>Login</span>
            <IoLogInOutline />
          </Link>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
