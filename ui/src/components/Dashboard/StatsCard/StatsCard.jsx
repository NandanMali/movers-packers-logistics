const StatsCard = ({ title, value, growth }) => {
  return (
    <div className="stats-card">
      <div>
        <p>{title}</p>
        <h2>{value}</h2>
      </div>

      <span>{growth}</span>
    </div>
  );
};

export default StatsCard;