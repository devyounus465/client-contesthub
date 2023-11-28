import axios from "axios";

const axiospublic = axios.create({
  baseURL: "http://localhost:5000",
});

const useAxiosPublic = () => {
  return axiospublic;
};

export default useAxiosPublic;
