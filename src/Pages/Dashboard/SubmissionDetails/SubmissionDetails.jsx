import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const SubmissionDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { data: submissionDetails = [] } = useQuery({
    queryKey: ["submissionDetails"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/submission/${id}`);
      return res.data;
    },
  });
  console.log(submissionDetails);
  const {
    content,
    contest_name,
    participant_email,
    participant_name,
    sentence,
    tags,
  } = submissionDetails;

  return (
    <div>
      <div>
        <h3 className="text-2xl font-semibold">Participant Details</h3>
        <div className="divider"></div>
        <h4 className="text-xl font-semibold">
          Contest Name: <span className="text-orange-500">{contest_name}</span>
        </h4>
        <h4 className="text-lg font-semibold">
          Participant Name:{" "}
          <span className="text-orange-500">{participant_name}</span>
        </h4>
        <h4 className="text-lg font-semibold">
          Participant Name:{" "}
          <span className="text-orange-500">{participant_email}</span>
        </h4>
        <h4 className="text-lg font-semibold">
          Participant Name: <span className="text-orange-500">{tags}</span>
        </h4>
      </div>

      <div className="mt-16">
        <h2 className="text-3xl">Content</h2>
        <div className="divider"></div>
        <h4 className="text-xl mb-4">Five Sentence</h4>
        <p>{sentence}</p>
        <div className="divider"></div>
        <h4 className="text-xl mb-4">Large Content</h4>
        <p>{content}</p>
      </div>
    </div>
  );
};

export default SubmissionDetails;
