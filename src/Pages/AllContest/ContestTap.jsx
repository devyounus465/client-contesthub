import ContestCard from "./ContestCard";

const ContestTap = ({ items }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
      {items?.map((item) => (
        <ContestCard key={item._id} item={item}></ContestCard>
      ))}
    </div>
  );
};

export default ContestTap;
