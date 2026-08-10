import "./admin.css";

const Support = () => {
  return (
    <div className="admin-page">

      <h1>Support Tickets</h1>

      <table>

        <thead>
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Issue</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>

          <tr>
            <td>1</td>
            <td>Rahul</td>
            <td>Booking Issue</td>
            <td>Open</td>
          </tr>

        </tbody>

      </table>

    </div>
  );
};

export default Support;