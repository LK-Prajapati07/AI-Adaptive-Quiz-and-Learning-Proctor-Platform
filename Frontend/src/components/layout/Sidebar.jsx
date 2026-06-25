import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  LayoutDashboard,
  BookOpen,
  PlusCircle,
  ListChecks,
  ClipboardList,
  LogOut,
} from "lucide-react";

const Sidebar = () => {
  const { user } = useSelector((state) => state.auth);

  const menus = {
    Trainer: [
      {
        name: "Dashboard",
        path: "/dashboard",
        icon: LayoutDashboard,
      },

      {
        name: "Create Quiz",
        path: "/dashboard/create-quiz",
        icon: PlusCircle,
      },

      {
        name: "Manage Quiz",
        path: "/dashboard/manage-quiz",
        icon: ListChecks,
      },
    ],

    Student: [
      {
        name: "Dashboard",
        path: "/dashboard",
        icon: LayoutDashboard,
      },

      {
        name: "Available Quiz",
        path: "/dashboard/quizzes",
        icon: BookOpen,
      },

      {
        name: "My Attempts",
        path: "/dashboard/attempts",
        icon: ClipboardList,
      },
    ],
  };

  const links = menus[user?.role] || [];

  return (
    <aside
      className="
    w-64
    min-h-screen
    bg-white
    border-r
    flex
    flex-col
    "
    >
      {/* LOGO */}

      <div
        className="
      h-16
      flex
      items-center
      px-6
      border-b
      "
      >
        <h1
          className="
        text-xl
        font-bold
        text-blue-600
        "
        >
          AI Quiz
        </h1>
      </div>

      {/* USER */}

      <div className="p-5 border-b">
        <h2 className="font-semibold">{user?.name}</h2>

        <p className="text-sm text-gray-500">{user?.role}</p>
      </div>

      {/* LINKS */}

      <nav
        className="
      flex-1
      p-4
      space-y-2
      "
      >
        {links.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/dashboard"}
              className={({ isActive }) =>
                `
              flex
              items-center
              gap-3
              px-4
              py-3
              rounded-xl

              ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }
              `
              }
            >
              <Icon size={20} />

              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* LOGOUT */}

      <button
        className="
      m-4
      flex
      gap-3
      items-center
      px-4
      py-3
      rounded-xl
      text-red-600
      hover:bg-red-50
      "
      >
        <LogOut size={20} />
        Logout
      </button>
    </aside>
  );
};

export default Sidebar;
