import "./admin.css";

const Payments = () => {
  return (
    <div className="admin-page">
      <h1>Payments</h1>

      <div className="users-stats">

        <div className="mini-card">
          <h3>₹2,50,000</h3>
          <p>Total Revenue</p>
        </div>

        <div className="mini-card">
          <h3>₹25,000</h3>
          <p>Pending Payments</p>
        </div>

        <div className="mini-card">
          <h3>₹50,000</h3>
          <p>Partner Payouts</p>
        </div>

      </div>
    </div>
  );
};

export default Payments;