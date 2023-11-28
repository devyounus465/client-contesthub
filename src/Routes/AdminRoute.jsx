import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../Hooks/useAdmin";
import useAuth from "../Hooks/useAuth";

// eslint-disable-next-line react/prop-types
const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [isAdmin, isLoading] = useAdmin();
  const location = useLocation();

  if (loading || isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="loading loading-ring loading-lg"></span>;
      </div>
    );
  }

  if (user && isAdmin) {
    return children;
  }
  //   return <Navigate to={"/"} state={{ from: location }} replace></Navigate>;
  return <Navigate to={"/"} state={{ from: location }} replace></Navigate>;
};

export default AdminRoute;
