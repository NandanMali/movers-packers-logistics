import "./partner.css";

const PartnerDashboard = () => {
  return (
    <div className="partner-page">

      <h1>Transport Partner Dashboard</h1>

      <div className="partner-stats">

        <div className="partner-card">
          <h2>18</h2>
          <p>Assigned Bookings</p>
        </div>

        <div className="partner-card">
          <h2>₹45,000</h2>
          <p>Monthly Earnings</p>
        </div>

        <div className="partner-card">
          <h2>5</h2>
          <p>Active Vehicles</p>
        </div>

      </div>

    </div>
  );
};

export default PartnerDashboard;