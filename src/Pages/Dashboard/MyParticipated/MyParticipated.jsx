import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const MyParticipated = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: payments = [] } = useQuery({
    queryKey: ["payments", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/${user.email}`);
      return res.data;
    },
  });
  // console.log("payment data", payments.contestId);

  return (
    <div>
      <h2 className="text-4xl ">
        My participaited contest:
        <span className="text-orange-500">{payments.length}</span>
      </h2>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Contest image</th>
              <th>Contest Name</th>
              <th>Price</th>
              <th>Email</th>
              <th>DeadLine</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, index) => (
              <tr key={payment._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={payment.contest?.image}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <td>{payment.contest?.contest_name}</td>
                <td>
                  <p className="text-orange-500">${payment.price}</p>
                </td>
                <td>{payment.email}</td>
                <td>{payment.contest?.deadline}</td>
                <th>
                  <Link to={`/dashboard/submisson/${payment.contest?._id}`}>
                    <button className="btn bg-orange-500  text-white btn-sm">
                      Submit
                    </button>
                  </Link>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyParticipated;
