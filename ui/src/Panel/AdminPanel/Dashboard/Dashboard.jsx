import StatsCard from "../../../components/Dashboard/StatsCard/StatsCard";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip
} from "recharts";

const data = [
  { month: "Jan", revenue: 12000 },
  { month: "Feb", revenue: 18000 },
  { month: "Mar", revenue: 24000 },
  { month: "Apr", revenue: 32000 },
  { month: "May", revenue: 27000 },
  { month: "Jun", revenue: 45000 }
];

const Dashboard = () => {
  return (
    <div>

      <div className="page-title">
        <h1>Dashboard</h1>
        <p>Logistics Management Overview</p>
      </div>

      <div className="stats-grid">

        <StatsCard
          title="Total Users"
          value={localStorage.getItem("users")}
          growth="+12%"
        />

        <StatsCard
          title="Bookings"
          value="540"
          growth="+8%"
        />

        <StatsCard
          title="Vehicles"
          value="80"
          growth="+5%"
        />

        <StatsCard
          title="Revenue"
          value="₹2.5L"
          growth="+18%"
        />

      </div>

      <div className="dashboard-row">

        <div className="chart-box">
          <h3>Revenue Analytics</h3>

          <ResponsiveContainer
            width="100%"
            height={300}
          >
            <LineChart data={data}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#E31E24"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>

        </div>

        <div className="activity-box">
          <h3>Recent Activities</h3>

          <ul>
            <li>New Booking Received</li>
            <li>Partner Approved</li>
            <li>Vehicle Assigned</li>
            <li>Driver Updated</li>
            <li>Payment Received</li>
          </ul>

        </div>

      </div>

    </div>
  );
};

export default Dashboard;