import classNames from "classnames";
import { Link } from "react-router-dom";

export const Sidebar = () => {
  //get current path from url
  const currentPath = window.location.pathname;

  const sidebarItems = [
    {
      name: "Leaves",
      path: "/leaves",
    },
    {
      name: "Employees",
      path: "/employees",
    },
  ];
  return (
    <div className="w-60 shrink-0 h-screen border-r-[1px]  border-gray-200">
      <div className="flex flex-col gap-2 px-5 pt-10 ">
        {sidebarItems.map((item) => (
          <Link
            to={item.path}
            key={item.name}
            className={classNames(
              "flex py-2 rounded-xl px-7 hover:bg-green-100",
              {
                "bg-green-100": currentPath === item.path,
              }
            )}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
};
