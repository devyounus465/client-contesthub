// eslint-disable-next-line react/prop-types
const SectionTitle = ({ heading, subheading }) => {
  return (
    <div className="text-center  my-6">
      <h3 className="text-sm font-normal text-orange-500  tracking-wider uppercase">
        {subheading}
      </h3>
      <h2 className="text-4xl font-bold uppercase mt-2">{heading}</h2>
    </div>
  );
};

export default SectionTitle;
