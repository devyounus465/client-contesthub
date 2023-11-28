import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { FaGoogle } from "react-icons/fa";
import GoogleLogin from "../../Shared/GoogleLogin/GoogleLogin";
const SignUp = () => {
  const { createUser, userUpdateProfile } = useAuth();
  const axiospublic = useAxiosPublic();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // console.log(data);
    createUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);
        userUpdateProfile(data.name, data.photo).then(() => {
          const userInfo = {
            name: data.name,
            email: data.email,
          };

          axiospublic.post("/users", userInfo).then((res) => {
            if (res.data.insertedId) {
              console.log("user seved to database");
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "User created successfully.",
                showConfirmButton: false,
                timer: 1500,
              });
              navigate("/");
            }
          });
        });
      })
      .catch((error) => {
        console.log(error);
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
              <span className="label-text">Your Name</span>
            </label>
            <input
              type="text"
              placeholder="Your Name"
              {...register("name")}
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Image url</span>
            </label>
            <input
              type="text"
              placeholder="Photo url"
              {...register("photo")}
              className="input input-bordered"
              required
            />
          </div>
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
            value={"Sign Up"}
          />
          <p>
            Already have an account? please go{" "}
            <Link className="text-orange-500" to={"/login"}>
              Login
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

export default SignUp;
