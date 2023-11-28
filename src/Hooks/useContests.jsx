import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const useContests = () => {
  const axiospublic = useAxiosPublic();

  const {
    data: contests = [],
    isPending: loading,
    refetch,
  } = useQuery({
    queryKey: ["contests"],
    queryFn: async () => {
      const res = await axiospublic.get("/contests");
      return res.data;
    },
  });

  return [contests, loading, refetch];
};

export default useContests;
