import { FaGoogle } from "react-icons/fa";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";

const GoogleLogin = () => {
  const { googleLogin } = useAuth();
  const axiospublic = useAxiosPublic();
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    googleLogin().then((res) => {
      console.log(res.user);
      const userInfo = {
        name: res.user?.displayName,
        email: res.user?.email,
      };
      axiospublic.post("/users", userInfo).then((res) => {
        console.log(res.data);
        navigate("/");
      });
    });
  };

  return (
    <div className="">
      <button
        onClick={handleGoogleLogin}
        className="btn bg-blue-500 text-white hover:text-blue-500"
      >
        <FaGoogle />
        Google
      </button>
    </div>
  );
};

export default GoogleLogin;
