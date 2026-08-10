import { useEffect, useState } from "react";
import "./driver.css";
import ViewDriverModal from "./ViewDriverModal.jsx";
import PageToolbar from "../components/PageToolbar/PageToolbar";
import DeleteModal from "../../../components/DeleteModal/DeleteModal";
import EditDriverModal from "../Driver/EditDriverModal";
import AddDriverModal from "../Driver/AddDriverModal";
import axios from "axios";
import { apiUrlPartnerDriver } from "../../../apiUrl";
import { FaIdCard, FaPhone, FaPlus } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import StatusBadge from "../../../components/SatutsBadge/Statusbadge.jsx";
import CommonHeader from "../components/CommonHeader/CommonHeader";
import DriverModal from "./DriverModal.jsx";
import StatsCard from "../../../components/Dashboard/StatsCard/StatsCard.jsx";

const PartnerDrivers = () => {
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
  
  const [showAdd,setShowAdd] = useState(false);
//   const [editingDriver, setEditingDriver] = useState(null);
//   const [deleteDriver, setDeleteDriver] = useState(null);
//   const [viewDriver, setViewDriver] = useState(null);
//   const [showModal, setShowModal] = useState(false);
  const fetchDrivers = async () => {
    try {
      const partnerId = localStorage.getItem("_id");
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

//   const handleSaveDriver = (driver) => {
//     let updatedDrivers;

//     if (editingDriver) {
//       updatedDrivers = drivers.map((item) =>
//         item.id === driver.id ? driver : item,
//       );
//     } else {
//       updatedDrivers = [...drivers, driver];
//     }

//     setDrivers(updatedDrivers);

//     localStorage.setItem("drivers", JSON.stringify(updatedDrivers));

//     setEditingDriver(null);

//     setShowModal(false);
//   };

//   const handleDeleteDriver = () => {
//     const updatedDrivers = drivers.filter(
//       (driver) => driver.id !== deleteDriver.id,
//     );

//     setDrivers(updatedDrivers);

//     localStorage.setItem("drivers", JSON.stringify(updatedDrivers));

//     setDeleteDriver(null);
//   };

//   const filteredDrivers = drivers.filter((driver) => {
//     const searchText = search.toLowerCase();

//     const matchSearch =
//       driver.fullName?.toLowerCase().includes(searchText) ||
//       driver.phone?.toLowerCase().includes(searchText) ||
//       driver.email?.toLowerCase().includes(searchText) ||
//       driver.licenseNumber?.toLowerCase().includes(searchText) ||
//       driver.assignedVehicle?.toLowerCase().includes(searchText);

//     const matchStatus =
//       statusFilter === "All" || driver.status === statusFilter;

//     return matchSearch && matchStatus;
//   });






  const deleteDriver = async () => {
    try {
      setLoading(true);

      await axios.delete(`${apiUrlPartnerDriver}delete/${selectedDriver._id}`);

      fetchDrivers();

      setShowDelete(false);

      setSelectedDriver(null);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="driver-page">

      <CommonHeader
        title="Drivers"
        buttonText="Add Driver"
        icon={<FaPlus />}
        onClick={() => setShowModal(true)}
      />

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

              <button
                onClick={() => {
                  setSelectedDriver(driver);

                  setShowEdit(true);
                }}
              >
                Edit
              </button>

              <button
                onClick={() => {
                  setSelectedDriver(driver);

                  setShowDelete(true);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <AddDriverModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSave={fetchDrivers}
      />

      <ViewDriverModal
        isOpen={showView}
        driver={selectedDriver}
        onClose={() => setShowView(false)}
      />

       
      <DeleteModal
        isOpen={showDelete}
        onClose={() => setShowDelete(false)}
        onConfirm={deleteDriver}
        title="Delete Driver"
        message={`Are you sure you want to delete ${selectedDriver?.driverName}?`}
        loading={loading}
      />
      

      <DriverModal 
      isOpen={showEdit}
      onClose={()=>{setShowEdit(false)}}
      driver={selectedDriver}
      onupdate={fetchDrivers}/>
    </div>
  );
};

export default PartnerDrivers;
