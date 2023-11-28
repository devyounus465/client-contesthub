import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";

const useAuth = () => {
  const authHooks = useContext(AuthContext);
  return authHooks;
};

export default useAuth;
