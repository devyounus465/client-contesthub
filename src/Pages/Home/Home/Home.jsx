import { useEffect, useState } from "react";
import useContests from "../../../Hooks/useContests";
import SectionTitle from "../../../Shared/SectionTitle/SectionTitle";
import Slider from "../Slider/Slider";
import ContestCard from "../../AllContest/ContestCard";

const Home = () => {
  const [contests] = useContests();
  const [popularContest, setPopularContest] = useState([]);
  //  top 5 data filter

  useEffect(() => {
    const sortedData = [...contests].sort(
      (a, b) => b.participation_count - a.participation_count
    );

    const topFiveData = sortedData.slice(0, 5);
    setPopularContest(topFiveData);
  }, [contests]);
  //   console.log("popular contest", popularContest);

  return (
    <div>
      <Slider></Slider>
      <div className="container py-12">
        <SectionTitle
          heading={"Our top contest"}
          subheading={"choose your best one"}
        ></SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 ">
          {popularContest.map((item) => (
            <ContestCard key={item._id} item={item}></ContestCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
