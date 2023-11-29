import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
  Legend,
} from "recharts";
const MyProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: myWining = [] } = useQuery({
    queryKey: ["myWinning", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/winner/${user.email}`);
      return res.data;
    },
  });

  const { data: payments = [] } = useQuery({
    queryKey: ["payments", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/${user.email}`);
      return res.data;
    },
  });

  // pie chart

  const data = [
    { name: "Participaited", value: payments.length },
    { name: "Winning", value: myWining.length },
  ];
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <div>
            <img
              className="w-44 shadow-md bordered border-gray-300"
              src={user?.photoURL}
              alt=""
            />
          </div>
          <div>
            <h3 className="text-lg mt-3 font-semibold">
              Name:{user?.displayName}
            </h3>
            <h3 className="text-lg  font-semibold">Email:{user?.email}</h3>
          </div>
        </div>
        <div>
          {/* <h3 className="text-3xl">my Winning length:{myWining.length}</h3>
          <h3 className="text-3xl">
            my Participaited length:{payments.length}
          </h3> */}

          <PieChart width={400} height={400}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Legend></Legend>
          </PieChart>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
