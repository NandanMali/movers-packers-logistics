import { useEffect, useState } from "react";
import axios from "axios";

import "./myOrders.css";
import OrderCard from "./OrderCard";

import { apiUrlUserBooking } from "../../../apiUrl";
import StatsCard from "../../../components/Dashboard/StatsCard/StatsCard";
import PageToolbar from "../components/PageToolbar/PageToolbar";

function MyOrders() {
    const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sort, setSort] = useState("Newest");

  const partnerId = localStorage.getItem("_id");

  //---------------------------------------

  const getOrders = async () => {
    try {
      const response = await axios.get(
        apiUrlUserBooking + "my-orders/" + partnerId,
      );

      setOrders(response.data.bookings);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  //---------------------------------------

  useEffect(() => {
    getOrders();
  }, []);

  const filteredorders = orders.filter((order) => {
    const searchText = search.toLowerCase();
    const matchSearch = order.bookingId
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchStatus = statusFilter === "All" || order.status === statusFilter;

    return matchSearch && matchStatus;
  });

  const sortedorders = [...filteredorders];

  switch (sort) {
    case "Newest":
      sortedorders.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
      );

      break;

    case "Oldest":
      sortedorders.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
      );

      break;
  }

  //---------------------------------------

  return (
    <div className="assigned-jobs-page">
      <div className="assigned-jobs-header">
        <h2>My Orders</h2>
      </div>

      <div className="stats-grid">
        <StatsCard title="Total Orders" value={orders.length} />

        <StatsCard
          title="Assigned Orders"
          value={orders.filter((order) => order.status === "Assigned").length}
        />
        <StatsCard
          title="In Progress Orders"
          value={
            orders.filter((order) => order.status === "In Progress" || order.status === "Reached Pickup" || order.status === "Pickup Completed" || order.status === "Reached Destination").length
          }
        />

        <StatsCard
          title="Completed order"
          value={orders.filter((order) => order.status === "Completed").length}
        />
      </div>
      <br />

      <PageToolbar
        search={search}
        setSearch={setSearch}
        filter={statusFilter}
        setFilter={setStatusFilter}
        sort={sort}
        setSort={setSort}
        filterOptions={[
          "All",
          "Assigned",
          "On Trip",
          "Inactive",
        ]}
        sortOptions={["Newest", "Oldest", "A-Z", "Z-A"]}
        total={sortedorders.length}
      />

      {loading ? (
        <div className="loading">Loading orders...</div>
      ) : filteredorders.length === 0 ? (
        <div className="empty-state">
          🚚
          <h3>No Orders Found</h3>
        </div>
      ) : (
        <div className="assigned-jobs-grid">
          {orders.map((order) => (
            <OrderCard key={order._id} booking={order} refresh={getOrders} />
          ))}
        </div>
      )}
    </div>
  );
}

export default MyOrders;
