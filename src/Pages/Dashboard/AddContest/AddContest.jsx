import { useForm } from "react-hook-form";
import SectionTitle from "../../../Shared/SectionTitle/SectionTitle";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

// image hosting
const image_Hosting_Key = import.meta.env.VITE_IMAGE_API_KEY;

// console.log(image_Hosting_Key);
const imageHostingApi = `https://api.imgbb.com/1/upload?key=${image_Hosting_Key}`;

const AddContest = () => {
  const axiospublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    // console.log(data);

    const imageFile = { image: data.image[0] };
    const res = await axiospublic.post(imageHostingApi, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    console.log(res.data);
    if (res.data.success) {
      const newContestData = {
        contest_name: data.name,
        image: res.data.data.display_url,
        description: data.description,
        contest_price: parseFloat(data.contest_price),
        prize_money: parseFloat(data.prize_money),
        instruction: data.instruction,
        tags: data.tags,
        deadline: data.deadline,
        participation_count: data.participaition,
      };

      const contestRes = await axiosSecure.post("/newContest", newContestData);
      if (contestRes.data.insertedId) {
        reset();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };
  return (
    <div>
      <SectionTitle
        subheading={"Your Contest"}
        heading={"Add Your Own Contest"}
      ></SectionTitle>

      <div>
        <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
          {/* row 1 */}
          <div className="grid grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Contest Name</span>
              </label>
              <input
                type="text"
                placeholder="Name of Contest"
                {...register("name")}
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
          <div className="grid grid-cols-3 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Contest Prize Money</span>
              </label>
              <input
                type="number"
                placeholder="Contest Prize Money"
                {...register("prize_money")}
                className="input input-bordered"
                required
              />
            </div>
            {/* Fee */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Register Fee</span>
              </label>
              <input
                type="number"
                placeholder="Register Fee"
                {...register("contest_price")}
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">participation count</span>
              </label>
              <input
                type="number"
                placeholder="participation_count"
                {...register("participaition")}
                className="input input-bordered"
                required
              />
            </div>
          </div>
          {/* row 3 */}
          <div className="grid grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Contest Deadline</span>
              </label>
              <input
                type="date"
                placeholder="Contest PDeadline"
                {...register("deadline")}
                className="input input-bordered"
                required
              />
            </div>
            {/* image */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Image File</span>
              </label>
              <input
                {...register("image", { required: true })}
                type="file"
                className="file-input w-full "
              />
            </div>
          </div>
          {/* instruction */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Contest Instruction</span>
            </label>
            <textarea
              {...register("instruction")}
              className="textarea textarea-bordered h-24"
              placeholder="Contest Instruction"
            ></textarea>
          </div>
          {/* description */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Contest Description</span>
            </label>
            <textarea
              {...register("description")}
              className="textarea textarea-bordered h-24"
              placeholder="Contest description"
            ></textarea>
          </div>

          <input
            className="btn bg-orange-500 text-white"
            type="submit"
            value={"Add Contest"}
          />
        </form>
      </div>
    </div>
  );
};

export default AddContest;
