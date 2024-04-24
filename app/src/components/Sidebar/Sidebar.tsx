import classNames from "classnames";
import { Link, useLocation } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import { useContext, useEffect, useState } from "react";
import storeContext from "../../contexts/Store";
import { FaDashcube, FaUmbrellaBeach, FaUsers } from "react-icons/fa6";
import { MdDashboardCustomize } from "react-icons/md";

export const Sidebar = () => {
  //get current path from url
  let location = useLocation();

  const sidebarItems = [
    {
      name: "Congés",
      path: "/leaves",
      icon: <FaUmbrellaBeach />,
      allowedRoles: ["admin", "manager", "employee"],
    },
    {
      name: "Employées",
      path: "/employees",
      icon: <FaUsers />,
      allowedRoles: ["admin", "manager", "employee"],
    },

    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <MdDashboardCustomize />,
      allowedRoles: ["admin", "manager"],
    },
  ];

  const { user } = useContext(storeContext);

  return (
    <div className="xl:w-72 shrink-0 xl:h-screen border-r-[1px] pt-10 pb-5 border-gray-200 flex xl:flex-col justify-between overflow-hidden">
      <div className="flex xl:flex-col  gap-2 px-5  ">
        {sidebarItems.map((item) => {
          if (!item.allowedRoles.includes(user?.role)) return null;

          return (
            <Link
              to={item.path}
              key={item.name}
              className={classNames(
                "flex py-2 rounded-xl px-7 hover:bg-green-100",
                {
                  "bg-green-100": location.pathname === item.path,
                }
              )}
            >
              <div className="flex gap-3 items-center">
                <div className="text-zinc-700">{item.icon}</div>
                <div className="hidden xl:block"> {item.name}</div>
              </div>
            </Link>
          );
        })}
      </div>
      <div className="px-5">
        <LogoutButton />
      </div>
    </div>
  );
};
