import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { RiDeleteBin6Line } from "react-icons/ri";
import Swal from "sweetalert2";

const ManageUser = () => {
  const axiosSecure = useAxiosSecure();

  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });
  console.log("all users", users);

  // make admin user
  const handleAdminUser = (user) => {
    axiosSecure.patch(`/users/admin/${user._id}`).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${user.name} is an Admin Now!`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  // make creator / editor
  const handleCreatorUser = (user) => {
    axiosSecure.patch(`/users/creator/${user._id}`).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${user.name} is an Editor Now!`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  // user delete operation

  const handleDeleteUser = (user) => {
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
        axiosSecure.delete(`/users/${user._id}`).then((res) => {
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
      <div className="flex justify-between">
        <h2 className="text-4xl font-semibold">All users List</h2>
        <h2 className="text-4xl font-semibold">
          Total users: <span className="text-orange-500">{users.length}</span>{" "}
        </h2>
      </div>

      {/* users table */}
      <div className="overflow-x-auto mt-8">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>
                <label>#</label>
              </th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <div className="space-x-2">
                    {user.role === "creator" || user.role === "user" ? (
                      ""
                    ) : (
                      <button
                        onClick={() => handleAdminUser(user)}
                        className="btn btn-sm bg-orange-500 text-white  text-base"
                      >
                        Admin
                      </button>
                    )}

                    {/* creator /editor */}

                    {user.role === "admin" || user.role === "user" ? (
                      ""
                    ) : (
                      <button
                        onClick={() => handleCreatorUser(user)}
                        className="btn btn-sm bg-blue-500 text-white  text-base"
                      >
                        Creator
                      </button>
                    )}

                    {user.role === "admin" || user.role === "creator" ? (
                      ""
                    ) : (
                      <button className="btn btn-sm bg-black text-white  text-base">
                        User
                      </button>
                    )}
                  </div>
                </td>
                <th>
                  <button
                    onClick={() => handleDeleteUser(user)}
                    className="btn bg-red-500 text-white text-xl"
                  >
                    <RiDeleteBin6Line />
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

export default ManageUser;
