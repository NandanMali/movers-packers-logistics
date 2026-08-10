import { useEffect, useState } from "react";
import "./driver.css";
import axios from "axios";
import { FaIdCard, FaPhone } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { apiUrlPartnerDriver } from "../../../../apiUrl.js";
import CommonHeader from "../../../TransportPartnerPanel/components/CommonHeader/CommonHeader.jsx";
import StatsCard from "../../../../components/Dashboard/StatsCard/StatsCard.jsx";
import PageToolbar from "../../../TransportPartnerPanel/components/PageToolbar/PageToolbar.jsx";
import ViewDriverModal from "./ViewDriverModal.jsx";
import StatusBadge from "../../../../components/SatutsBadge/Statusbadge.jsx";

const AdminDrivers = () => {
  const [drivers, setDrivers] = useState([]);
  const [loading,setLoading] = useState(true);
  const [search,setSearch]= useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showModal,setShowModal]=useState(false);
  const [selectedDriver,setSelectedDriver] = useState(null);
  const [showView,setShowView] = useState(false);
  const [showEdit,setShowEdit] = useState(false);
  const [showDelete,setShowDelete] = useState(false);
  const [alertData, setAlert] = useState(null);
  const [sort, setSort] = useState("Newest");

  const navigate=useNavigate();
  
  const [showAdd,setShowAdd] = useState(false);
  const {id}=useParams();
  const fetchDrivers = async () => {
    try {
      const partnerId = id;
      const response = await axios.get(
        `${apiUrlPartnerDriver}partner/${partnerId}`,
      );

      setDrivers(response.data.drivers);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDrivers();
  }, []);

  // filter Logic

  const filteredDrivers = drivers.filter((driver) => {
    const searchText = search.toLowerCase();

    const matchSearch =
      driver.driverName.toLowerCase().includes(searchText) ||
      driver.phone.includes(searchText) ||
      driver.email.toLowerCase().includes(searchText) ||
      driver.licenseNumber.toLowerCase().includes(searchText);

    const matchStatus =
      statusFilter === "All" || driver.status === statusFilter;

    return matchSearch && matchStatus;
  });

  // Sorted Driver
  const sortedDrivers = [...filteredDrivers];

  switch (sort) {
    case "Newest":
      sortedDrivers.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
      );

      break;

    case "Oldest":
      sortedDrivers.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
      );

      break;

    case "A-Z":
      sortedDrivers.sort((a, b) => a.driverName.localeCompare(b.driverName));

      break;

    case "Z-A":
      sortedDrivers.sort((a, b) => b.driverName.localeCompare(a.driverName));

      break;

    default:
      break;
  }
  const handleback=()=>{
    navigate("/admin/partners")
  }

  return (
    <div className="driver-page">
      <button className="add-btn" onClick={()=>{handleback()}}>
            Back
          </button>
          <br/><br/>

      <h1>Drivers</h1>

      <div className="stats-grid">
        <StatsCard title="Total Drivers" value={drivers.length} />

        <StatsCard
          title="Available Driver"
          value={drivers.filter((driver) => driver.status === "Available").length}
        />
        <StatsCard
          title="On Trip"
          value={
            drivers.filter((driver) => driver.status === "On Trip").length
          }
        />

        <StatsCard
          title="Inactive"
          value={drivers.filter((driver) => driver.status === "Inactive").length}
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
        filterOptions={["All", "Available", "Assigned", "On Leave", "Inactive"]}
        sortOptions={["Newest", "Oldest", "A-Z", "Z-A"]}
        total={sortedDrivers.length}
      />

        {sortedDrivers.length === 0 && (
          <div className="empty-state">
            🚚
            <h3>No Drivers Found</h3>
            <p>Click on Add Drivers to create your first driver.</p>
          </div>
        )}

            <div className="driver-grid">
        {sortedDrivers.map((driver) => (
          <div className="drivers-card" key={driver._id}>
            <img src={`/assets/uploads/drivers/${driver.profilePic}`}
             alt="driver"
             style={{ height: "70px", width: "100px", marginLeft:"20px", marginTop:"15px"}} />

            <h3>{driver.driverName}</h3>

            <p>
              <FaPhone />

              {driver.phone}
            </p>

            <p>
              <MdEmail />

              {driver.email}
            </p>

            <p>
              <FaIdCard />

              {driver.licenseNumber}
            </p>

            <p>
              Experience
              {driver.experience}
            </p>

            <StatusBadge status={driver.status} />

            <div className="driver-actions">
              <button
                onClick={() => {
                  setSelectedDriver(driver);

                  setShowView(true);
                }}
              >
                View
              </button>

              </div>
          </div>
        ))}
      </div>

      <ViewDriverModal
        isOpen={showView}
        driver={selectedDriver}
        onClose={() => setShowView(false)}
      />      
    </div>
  );
};

export default AdminDrivers;
