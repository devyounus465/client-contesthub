import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import SectionTitle from "../../../Shared/SectionTitle/SectionTitle";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const MyContest = () => {
  const axiosSecure = useAxiosSecure();

  const { data: myContest = [], refetch } = useQuery({
    queryKey: ["myContest"],
    queryFn: async () => {
      const res = await axiosSecure.get("/newContest");
      return res.data;
    },
  });

  // handle contest delete

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
        subheading={"contest list"}
        heading={"All of my Own Contest"}
      ></SectionTitle>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Status</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {myContest.map((contest, index) => (
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
                    <button className="btn btn-sm bg-black text-white">
                      Pending
                    </button>
                  )}
                </td>
                <td>
                  {contest.status === "Approved" ? (
                    <button
                      type="button"
                      className="px-3 py-2 text-white bg-orange-500 rounded focus:outline-none"
                      disabled
                    >
                      <FaEdit />
                    </button>
                  ) : (
                    <Link to={`/dashboard/update/${contest._id}`}>
                      <button className="btn text-lg bg-blue-500 text-white hover:text-blue-500">
                        <FaEdit />
                      </button>
                    </Link>
                  )}
                </td>
                <th>
                  {contest.status === "Approved" ? (
                    <button
                      type="button"
                      className="px-3 py-2 text-white bg-orange-500 rounded focus:outline-none"
                      disabled
                    >
                      <RiDeleteBin6Fill />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleDeleteContest(contest)}
                      className="btn text-lg bg-red-500 text-white hover:text-red-500 "
                    >
                      <RiDeleteBin6Fill />
                    </button>
                  )}
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyContest;
