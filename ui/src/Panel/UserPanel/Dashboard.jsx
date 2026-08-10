import "./user.css";

const UserDashboard = () => {
  return (
    <div className="user-page">

      <h1>Welcome Back</h1>

      <div className="user-stats">

        <div className="user-card">
          <h2>12</h2>
          <p>Total Bookings</p>
        </div>

        <div className="user-card">
          <h2>3</h2>
          <p>Active Shipments</p>
        </div>

        <div className="user-card">
          <h2>9</h2>
          <p>Completed Deliveries</p>
        </div>

      </div>

    </div>
  );
};

export default UserDashboard;
