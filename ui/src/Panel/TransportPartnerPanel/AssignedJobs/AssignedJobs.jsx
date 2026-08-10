import { useEffect, useState } from "react";
import axios from "axios";

import "./assignedJobs.css";

import { apiUrlUserBooking } from "../../../apiUrl";
import AssignedJobCard from "./AssignedJobCard";
import PageToolbar from "../components/PageToolbar/PageToolbar";
import StatsCard from "../../../components/Dashboard/StatsCard/StatsCard";

function AssignedJobs() {
  const [jobs, setJobs] = useState([]);
   const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sort, setSort] = useState("Newest");
  
  //---------------------------------------
  
  const getJobs = async () => {
    const partnerId = localStorage.getItem("_id");
    try {
      const response = await axios.get(
        apiUrlUserBooking + "assignedjobs/" + partnerId,
      );

      setJobs(response.data.bookings);
    } catch (error) {
    } finally{
      setLoading(false);
    }
  };

  //---------------------------------------

  useEffect(() => {
    getJobs();
  }, []);


    const filteredjobs = jobs.filter((job) => {
    const searchText = search.toLowerCase();
    const matchSearch = job.bookingId
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchStatus = statusFilter === "All" || job.status === statusFilter;

    return matchSearch && matchStatus;
  });

  const sortedjobs = [...filteredjobs];

  switch (sort) {
    case "Newest":
      sortedjobs.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
      );

      break;

    case "Oldest":
      sortedjobs.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
      );

      break;
  }

  //---------------------------------------

  return (
    <div className="assigned-jobs-page">
      <div className="assigned-jobs-header">
        <h2>Assign Jobs</h2>
      </div>

      <PageToolbar
        search={search}
        setSearch={setSearch}
        filter={statusFilter}
        setFilter={setStatusFilter}
        sort={sort}
        setSort={setSort}
        filterOptions={[
          "All",
          "Available",
          "Assigned",
          "On Trip",
          "Maintenance",
          "Inactive",
        ]}
        sortOptions={["Newest", "Oldest", "A-Z", "Z-A"]}
        total={sortedjobs.length}
      />

      {loading ? (
        <div className="loading">Loading jobs...</div>
      ) : filteredjobs.length === 0 ? (
        <div className="empty-state">
          🚚
          <h3>No jobs Found for Assign</h3>
        </div>
      ) : (

      <div className="assigned-jobs-grid">
        {jobs.map((job) => (
          <AssignedJobCard key={job._id} booking={job} refresh={getJobs} />
        ))}
      </div>)}
    </div>
  );
}

export default AssignedJobs;
