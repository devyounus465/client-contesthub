import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useCreator = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: isCreator, isPending: isLoading } = useQuery({
    queryKey: [user?.email, "isCreator"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/creator/${user.email}`);
      console.log("creatr data", res.data);
      return res.data?.creator; //creator hisabe return korte hobe
    },
  });

  return [isCreator, isLoading];
};

export default useCreator;
