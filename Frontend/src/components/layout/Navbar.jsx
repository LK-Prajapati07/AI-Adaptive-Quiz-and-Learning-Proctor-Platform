import { useSelector } from "react-redux";

import { Bell, Search } from "lucide-react";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <header
      className="
      h-16
      bg-white
      border-b
      px-6
      flex
      items-center
      justify-between
      "
    >
      {/* Left */}

      <div>
        <h1
          className="
          text-xl
          font-bold
          "
        >
          Dashboard
        </h1>

        <p
          className="
          text-sm
          text-gray-500
          "
        >
          Welcome back, {user?.name}
        </p>
      </div>

      {/* Right */}

      <div
        className="
        flex
        items-center
        gap-5
        "
      >
        {/* Search */}

        <div
          className="
          hidden
          md:flex
          items-center
          gap-2
          bg-gray-100
          px-4
          py-2
          rounded-xl
          "
        >
          <Search size={18} />

          <input
            placeholder="Search..."
            className="
            bg-transparent
            outline-none
            text-sm
            "
          />
        </div>

        {/* Notification */}

        <button
          className="
          relative
          p-2
          rounded-full
          hover:bg-gray-100
          "
        >
          <Bell size={20} />

          <span
            className="
            absolute
            top-2
            right-2
            h-2
            w-2
            bg-red-500
            rounded-full
            "
          />
        </button>

        {/* Profile */}

        <div
          className="
          flex
          items-center
          gap-3
          "
        >
          <div
            className="
            text-right
            hidden
            sm:block
            "
          >
            <h2
              className="
              text-sm
              font-semibold
              "
            >
              {user?.name}
            </h2>

            <p
              className="
              text-xs
              text-blue-600
              "
            >
              {user?.role}
            </p>
          </div>

          <div
            className="
            h-10
            w-10
            rounded-full
            bg-blue-600
            text-white
            flex
            items-center
            justify-center
            font-bold
            "
          >
            {user?.name?.charAt(0)?.toUpperCase()}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
