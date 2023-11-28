import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import SectionTitle from "../../../Shared/SectionTitle/SectionTitle";
import { RiDeleteBin6Fill } from "react-icons/ri";
import Swal from "sweetalert2";

const ManageContest = () => {
  const axiosSecure = useAxiosSecure();

  const { data: contestRequist = [], refetch } = useQuery({
    queryKey: ["contestRequist"],
    queryFn: async () => {
      const res = await axiosSecure.get("/newContest");
      return res.data;
    },
  });

  // approved contest
  const handleApproveContest = async (contest) => {
    console.log(contest);

    const updateContestData = {
      contest_name: contest.name,
      image: contest.image,
      description: contest.description,
      contest_price: contest.contest_price,
      prize_money: contest.prize_money,
      instruction: contest.instruction,
      tags: contest.tags,
      deadline: contest.deadline,
      participation_count: contest.participaition,
    };

    const approvedRes = await axiosSecure.post("/contests", updateContestData);

    if (approvedRes.data.insertedId) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Contest Approved by Admin",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    const updateApproved = await axiosSecure.patch(
      `/newContest/${contest._id}`
    );
    refetch();
    return updateApproved.data;
  };

  // delete operation
  const handleDeleteContest = (contest) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/newContest/${contest._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <div>
      <SectionTitle
        subheading={"Manage Contest"}
        heading={"Contest Requiest"}
      ></SectionTitle>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Status</th>

              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {contestRequist.map((contest, index) => (
              <tr key={contest._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={contest.image}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{contest.contest_name}</div>
                    </div>
                  </div>
                </td>
                <td>
                  {contest.status === "Approved" ? (
                    <button
                      type="button"
                      className="px-3 py-2 text-white bg-orange-500 rounded focus:outline-none"
                      disabled
                    >
                      Approved
                    </button>
                  ) : (
                    <button
                      onClick={() => handleApproveContest(contest)}
                      className="btn btn-sm bg-black text-white"
                    >
                      Confirm
                    </button>
                  )}
                </td>

                <th>
                  <button
                    onClick={() => handleDeleteContest(contest)}
                    className="btn text-lg bg-red-500 text-white hover:text-red-500 "
                  >
                    <RiDeleteBin6Fill />
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageContest;
