import { Link } from "react-router-dom";

const ContestCard = ({ item }) => {
  // console.log(item);
  const { _id, contest_name, participation_count, image, description } = item;
  return (
    <div>
      <div className="card w-96 bg-base-100 shadow-xl">
        <figure>
          <img className="w-[350px]" src={image} alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {contest_name}
            <div className="badge badge-secondary">{participation_count}</div>
          </h2>
          <p>{description.slice(0, 70)}</p>
          <div className="card-actions justify-end">
            <Link to={`/details/${_id}`}>
              <button className="btn bg-orange-500 text-white hover:text-orange-500">
                Details
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContestCard;
