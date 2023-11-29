import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import SectionTitle from "../../../Shared/SectionTitle/SectionTitle";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const ContestSubmit = () => {
  const axiosSecure = useAxiosSecure();
  const { data: submitData = [], refetch } = useQuery({
    queryKey: ["submitedData"],
    queryFn: async () => {
      const res = await axiosSecure.get("/submission");

      return res.data;
    },
  });
  console.log(submitData);

  // handle winner

  const handleWinner = async (data) => {
    const resStatus = await axiosSecure.patch(`/submission/${data.contest_id}`);
    console.log("winner status", resStatus.data);

    //   winner details send
    if (resStatus.data.modifiedCount > 0) {
      const winnerDetails = await axiosSecure.post("/winner", data);
      console.log("winner details", winnerDetails.data);
      if (winnerDetails.data.insertedId) {
        refetch();

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Wow! Winner selected",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };

  return (
    <div>
      <SectionTitle
        heading={"Selection of Winner"}
        subheading={"contest winner"}
      ></SectionTitle>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Contest Name</th>
              <th>Email</th>
              <th>Participaint Name</th>
              <th>Details</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {submitData.map((data, index) => (
              <tr key={data._id}>
                <th>{index + 1}</th>
                <td>{data.contest_name}</td>
                <td>{data.participant_email}</td>
                <td>{data.participant_name}</td>
                <td>
                  <Link to={`/dashboard/submissionDetails/${data._id}`}>
                    <button className="btn btn-sm bg-black text-white">
                      Details
                    </button>
                  </Link>
                </td>
                <td>
                  {data.status === "winner" ? (
                    <button className="btn btn-sm bg-orange-500 text-white">
                      Winner
                    </button>
                  ) : (
                    <button
                      onClick={() => handleWinner(data)}
                      className="btn btn-sm bg-black text-white"
                    >
                      Winner
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContestSubmit;
