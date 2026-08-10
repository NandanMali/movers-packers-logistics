const RecentActivity = () => {
  const activities = [
    "New Booking Created",
    "Partner Approved",
    "Vehicle Assigned",
    "Payment Received",
    "Driver Updated"
  ];

  return (
    <div className="activity-card">

      <h3>Recent Activities</h3>

      {activities.map((item, index) => (
        <div
          key={index}
          className="activity-item"
        >
          {item}
        </div>
      ))}

    </div>
  );
};

export default RecentActivity;