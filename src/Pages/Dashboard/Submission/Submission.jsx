import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";

const Submission = () => {
  const { user } = useAuth();
  const { id } = useParams();
  // console.log(id);
  const axiosSecure = useAxiosSecure();

  const { register, handleSubmit, reset } = useForm();

  const { data: submission = [] } = useQuery({
    queryKey: ["submission"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/contests/${id}`);
      return res.data;
    },
  });

  //   console.log(submission);
  const { _id, contest_name, deadline, instruction, prize_money, tags } =
    submission;

  // handle task

  const onSubmit = async (data) => {
    console.log(data);
    const res = await axiosSecure.post("/submission", data);
    console.log(res.data);

    if (res.data.insertedId) {
      reset();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div>
      <div>
        <h2 className="text-4xl font-semibold">
          Shortly selected Contest details
        </h2>
        <div className="divider"></div>
        <div className="space-y-3">
          <h3 className="text-3xl font-semibold">
            Contest Name:{" "}
            <span className="text-orange-500">{contest_name}</span>{" "}
          </h3>
          <p>Instruction:{instruction}</p>
          <h4 className="text-2xl font-semibold">
            Prize Money:<span className="text-orange-500">$${prize_money}</span>
          </h4>
          <h4 className="text-2xl font-semibold">
            Tags:<span className="text-orange-500">{tags}</span>
          </h4>
          <h3 className="text-3xl font-semibold">
            Deadline: <span className="text-orange-500">{deadline}</span>{" "}
          </h3>
        </div>
      </div>
      <div className="mt-12">
        <h2 className="text-3xl font-semibold">Submit Your Task</h2>
        <div className="divider   w-56 h-2 "></div>
        <div>
          <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
            {/* row 1 */}
            <div className="grid grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">participant Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Name of Contest"
                  {...register("participant_name")}
                  className="input input-bordered"
                  required
                />
              </div>
              {/* tags */}
              <div className="form-control w-full ">
                <label className="label">Contest Tags</label>

                <select
                  defaultValue="default"
                  {...register("tags", { required: true })}
                  className="select select-bordered"
                >
                  <option disabled value={"default"}>
                    Select a Tags
                  </option>
                  <option value="business">Business Contest</option>
                  <option value="medical">Medical Contest</option>
                  <option value="webdesign">Web Design Contest</option>
                  <option value="article">Article Writing</option>
                  <option value="gaming">Gaming</option>
                </select>
              </div>
            </div>
            {/* row 2 */}
            <div className="grid grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">participant Email</span>
                </label>
                <input
                  type="email"
                  defaultValue={user?.email}
                  {...register("participant_email")}
                  className="input input-bordered"
                  readOnly
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Contest Id</span>
                </label>
                <input
                  type="text"
                  defaultValue={id}
                  {...register("contest_id")}
                  className="input input-bordered"
                  readOnly
                />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Contest Name</span>
                </label>
                <input
                  type="text"
                  defaultValue={contest_name}
                  {...register("contest_name")}
                  className="input input-bordered"
                  readOnly
                />
              </div>
            </div>
            {/* row 3 */}

            <div className="form-control">
              <label className="label">
                <span className="label-text">
                  Write Five best sentence about your contest
                </span>
              </label>
              <textarea
                {...register("sentence")}
                className="textarea textarea-bordered h-24"
                placeholder="Contest Instruction"
              ></textarea>
            </div>
            {/* description */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">
                  Write free Hand content about your topic within 1200 word
                </span>
              </label>
              <textarea
                {...register("content")}
                className="textarea textarea-bordered h-24"
                placeholder="Contest description"
              ></textarea>
            </div>

            <input
              className="btn bg-orange-500 text-white"
              type="submit"
              value={"Submit Task"}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Submission;
