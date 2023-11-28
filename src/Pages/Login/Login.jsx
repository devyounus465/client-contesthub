import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import GoogleLogin from "../../Shared/GoogleLogin/GoogleLogin";

const Login = () => {
  const { userLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // console.log(data);
    userLogin(data.email, data.password)
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
        Swal.fire({
          title: "User Login Successful.",
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
        });
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.log(error.message);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Your login credential invalid!",
        });
      });
  };

  return (
    <div className="container flex flex-wrap justify-between items-center h-screen my-12">
      <div>
        <img src="https://i.ibb.co/x6YwzyB/login.webp" alt="" />
      </div>
      <div className="card shrink-0 w-full max-w-lg shadow-2xl bg-base-100">
        <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="email"
              {...register("email")}
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="password"
              {...register("password", { required: true })}
              className="input input-bordered"
              required
            />
          </div>

          {errors.password && (
            <span className="text-red-500">This field is required</span>
          )}

          <input
            className="btn bg-orange-500 text-white"
            type="submit"
            value={"Login"}
          />
          <p>
            Are new ContestHub? please go{" "}
            <Link className="text-orange-500" to={"/signup"}>
              SignUp
            </Link>{" "}
          </p>
        </form>
        <div className="mb-6 px-8">
          <GoogleLogin></GoogleLogin>
        </div>
      </div>
    </div>
  );
};

export default Login;
