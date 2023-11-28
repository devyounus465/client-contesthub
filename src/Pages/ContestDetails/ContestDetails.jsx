import { useParams } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useEffect, useState } from "react";

const ContestDetails = () => {
  const [contest, setContest] = useState("");

  // countdown
  const [days, setDays] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [sec, setSec] = useState(0);

  const {
    contest_name,
    contest_price,
    deadline,
    description,
    image,
    instruction,
    participation_count,
    prize_money,
    tags,
  } = contest;
  const axiospublic = useAxiosPublic();
  const { id } = useParams();

  useEffect(() => {
    axiospublic.get(`/contests/${id}`).then((res) => setContest(res.data));
  }, [axiospublic, id]);

  // counddown deadline

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getTime = () => {
    const time = Date.parse(deadline) - Date.now();
    // console.log("current time", time);
    setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
    setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
    setMinutes(Math.floor((time / (1000 * 60)) % 60));
    setSec(Math.floor((time / 1000) % 60));
  };

  useEffect(() => {
    const intervel = setInterval(() => getTime(), 1000);
    return () => clearInterval(intervel);
  }, [getTime]);

  return (
    <div className="container py-12">
      <div className="grid grid-cols-1 md:grid-cols-2  p-6 ">
        {/* left content */}
        <div className="space-y-4 pr-8">
          <h2 className="text-6xl text-orange-500 font-bold">{contest_name}</h2>
          <h3 className="text-xl font-normal">{instruction}</h3>
          <h3 className="text-3xl font-semibold">Resistration Deadline</h3>
          {/* countdiwn timer */}
          <div className="flex gap-6">
            <div>
              <h2 className="text-3xl font-bold">
                {days < 10 ? "0" + days : days}
              </h2>
              <span>Days</span>
            </div>
            <div>
              <h2 className="text-3xl font-bold">
                {hours < 10 ? "0" + hours : hours}
              </h2>
              <span>Hours</span>
            </div>
            <div>
              <h2 className="text-3xl font-bold">
                {minutes < 10 ? "0" + minutes : minutes}
              </h2>
              <span>Minutes</span>
            </div>
            <div>
              <h2 className="text-3xl font-bold">
                {sec < 10 ? "0" + sec : sec}
              </h2>
              <span>Seconds</span>
            </div>
          </div>
          <div className="flex gap-6 items-center pt-8">
            <button className="btn bg-orange-500 text-white">
              Registration Now
            </button>
            <h3 className="text-orange-500 text-lg font-bold">
              Prize Money: ${prize_money}
            </h3>
          </div>
        </div>
        {/* right content */}
        <div>
          <img className="w-fit shadow" src={image} alt="" />
        </div>
      </div>
      {/* bottom part */}
      <div className="my-12 p-6 md:p-12 bg-gray-100 grid grid-cols-1 md:grid-cols-3">
        <div className="col-span-2 p-4">
          <h3 className="text-3xl font-semibold">Description</h3>
          <hr className="w-36 bordered border-2 mt-3 border-orange-500" />
          <p className="mt-6">{description}</p>
        </div>
        <div className="p-6 bg-white ">
          <h3 className="text-2xl text-orange-500 font-bold ">
            {" "}
            Resistration Fee: ${contest_price}
          </h3>
          <hr className="my-3" />
          <h4 className="text-xl">
            {" "}
            Participation People: {participation_count}
          </h4>
          <hr className="my-3" />
          <h4 className="text-lg"> Tags: {tags}</h4>
        </div>
      </div>
    </div>
  );
};

export default ContestDetails;
