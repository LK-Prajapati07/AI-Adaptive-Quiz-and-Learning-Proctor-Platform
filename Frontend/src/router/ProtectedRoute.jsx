import { Spinner } from "@/components/ui/spinner";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRouter = ({ children }) => {
  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth,
  );

  if (isLoading) {
    return (
      <div
        className="
min-h-screen 
flex 
items-center 
justify-center
bg-linear-to-br
from-blue-50
via-white
to-purple-50
"
      >
        <div
          className="
flex
flex-col
items-center
gap-5
rounded-2xl
bg-white/80
px-12
py-10
shadow-xl
backdrop-blur-md
border
"
        >
          <div
            className="
rounded-full
bg-blue-100
p-5
"
          >
            <Spinner
              className="
h-10 
w-10 
text-blue-600"
            />
          </div>

          <div
            className="
text-center
space-y-1
"
          >
            <h2
              className="
text-xl
font-semibold
text-gray-800
"
            >
              Loading your workspace
            </h2>

            <p
              className="
text-sm
text-gray-500
"
            >
              Please wait while we prepare your dashboard
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!user || !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRouter;
