import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  LayoutDashboard,
  BookOpen,
  PlusCircle,
  ListChecks,
  ClipboardList,
  LogOut,
  UserCircle2,
  Sparkles,
} from "lucide-react";

import { motion } from "framer-motion";

import { useLogoutHook } from "@/customHook/auth.hook";

const Sidebar = () => {
  const { user } = useSelector((state) => state.auth);

  const { mutate, isPending } = useLogoutHook();

  const handleLogout = () => {
    mutate();
  };

  const menus = {
    Trainer: [
      {
        title: "Dashboard",
        path: "/dashboard",
        icon: LayoutDashboard,
      },
      {
        title: "Create Quiz",
        path: "/dashboard/create-quiz",
        icon: PlusCircle,
      },
      {
        title: "Manage Quiz",
        path: "/dashboard/manage-quiz",
        icon: ListChecks,
      },
    ],

    Student: [
      {
        title: "Dashboard",
        path: "/dashboard",
        icon: LayoutDashboard,
      },
      {
        title: "Available Quizzes",
        path: "/dashboard/quizzes",
        icon: BookOpen,
      },
      {
        title: "My Attempts",
        path: "/dashboard/attempts",
        icon: ClipboardList,
      },
    ],
  };

  const links = menus[user?.role] || [];

  return (
    <aside
      className="
      w-72
      min-h-screen
      bg-white
      border-r
      flex
      flex-col
      shadow-lg
      "
    >
      {/* Logo */}

      <div
        className="
        h-16
        border-b
        px-6
        flex
        items-center
        justify-between
        "
      >
        <div className="flex items-center gap-2">
          <Sparkles className="text-blue-600" size={24} />

          <h1 className="text-2xl font-bold text-blue-600">AI Quiz</h1>
        </div>
      </div>

      {/* User */}

      <div className="border-b p-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div
              className="
              h-16
              w-16
              rounded-full
              bg-blue-100
              flex
              items-center
              justify-center
              "
            >
              <UserCircle2 size={40} className="text-blue-600" />
            </div>

            <span
              className="
              absolute
              bottom-1
              right-1
              h-3
              w-3
              rounded-full
              bg-green-500
              border-2
              border-white
              "
            />
          </div>

          <div className="space-y-1">
            <h2 className="font-semibold text-gray-800">
              {user?.name || "Guest"}
            </h2>

            <span
              className="
              inline-flex
              rounded-full
              bg-blue-100
              px-3
              py-1
              text-xs
              font-medium
              text-blue-700
              "
            >
              {user?.role}
            </span>
          </div>
        </div>
      </div>

      {/* Navigation */}

      <nav
        className="
        flex-1
        p-5
        space-y-3
        "
      >
        {links.map((item) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={item.path}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
            >
              <NavLink
                to={item.path}
                end={item.path === "/dashboard"}
                className={({ isActive }) =>
                  `
                  flex
                  items-center
                  gap-4
                  rounded-xl
                  px-4
                  py-3
                  font-medium
                  transition-all
                  duration-300

                  ${
                    isActive
                      ? "bg-blue-600 text-white shadow-lg"
                      : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                  }
                  `
                }
              >
                <Icon size={20} />

                <span>{item.title}</span>
              </NavLink>
            </motion.div>
          );
        })}
      </nav>

      {/* Logout */}

      <div className="border-t p-5">
        <button
          onClick={handleLogout}
          disabled={isPending}
          className="
          w-full
          flex
          items-center
          justify-center
          gap-3
          rounded-xl
          border
          border-red-200
          bg-red-50
          py-3
          font-semibold
          text-red-600
          transition-all
          duration-300
          hover:bg-red-100
          disabled:cursor-not-allowed
          disabled:opacity-60
          "
        >
          <LogOut size={18} />

          {isPending ? "Logging out..." : "Logout"}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
