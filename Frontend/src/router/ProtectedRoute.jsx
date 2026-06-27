import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Spinner } from "@/components/ui/spinner";

const ProtectedRouter = ({ children, allowedRoles }) => {
  const {
    user,
    isAuthenticated,
    isLoading,
  } = useSelector((state) => state.auth);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner className="h-10 w-10" />
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  if (
    allowedRoles &&
    !allowedRoles.includes(user.role)
  ) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default ProtectedRouter;