import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import useCreator from "../Hooks/useCreator";

// eslint-disable-next-line react/prop-types
const CreatorRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [isCreator, isLoading] = useCreator();
  const location = useLocation();
  if (loading || isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="loading loading-ring loading-lg"></span>;
      </div>
    );
  }
  if (user && isCreator) {
    return children;
  }

  <Navigate to={"/"} state={{ from: location }} replace></Navigate>;
};

export default CreatorRoute;
