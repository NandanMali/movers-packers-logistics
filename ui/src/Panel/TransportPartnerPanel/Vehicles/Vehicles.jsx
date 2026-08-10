import { useEffect, useState } from "react";
import axios from "axios";
import "./vehicle.css";

import AddVehicleModal from "./AddVehicleModal";

import { FaPlus } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";

import { apiUrlPartnerVehicle, vehicleuploadurl } from "../../../apiUrl";
import ViewVehicleModal from "./ViewVehicleModal";
import EditVehicleModal from "./EditVehicleModal";
import DeleteVehicleModal from "./DeleteVehicleModal";
import Alert from "../../../components/Alert/alert";
import CommonHeader from "../components/CommonHeader/CommonHeader";
import StatusBadge from "../../../components/SatutsBadge/Statusbadge";
import PageToolbar from "../components/PageToolbar/PageToolbar";
import DeleteModal from "../../../components/DeleteModal/DeleteModal";
import StatsCard from "../../../components/Dashboard/StatsCard/StatsCard";

function PartnerVehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [showView, setShowView] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [alertData, setAlert] = useState(null);
  const [sort, setSort] = useState("Newest");

  
  const getVehicles = async () => {
    const _id = localStorage.getItem("_id");
    try {
      const response = await axios.get(
        apiUrlPartnerVehicle + "fetch",

        { params: { partnerId: _id } },
      );

      setVehicles(response.data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getVehicles();
  }, []);

  const filteredVehicles = vehicles.filter((vehicle) => {
    const searchText = search.toLowerCase();
    const matchSearch =
      vehicle.vehicleName.toLowerCase().includes(search.toLowerCase()) ||
      vehicle.vehicleNumber.toLowerCase().includes(search.toLowerCase()) ||
      vehicle.brand.toLowerCase().includes(search.toLowerCase());

    const matchStatus =
      statusFilter === "All" || vehicle.status === statusFilter;

    return matchSearch && matchStatus;
  });

  const sortedVehicles = [...filteredVehicles];

  switch (sort) {
    case "Newest":
      sortedVehicles.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
      );

      break;

    case "Oldest":
      sortedVehicles.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
      );

      break;

    case "A-Z":
      sortedVehicles.sort((a, b) => a.vehicleName.localeCompare(b.vehicleName));

      break;

    case "Z-A":
      sortedVehicles.sort((a, b) => b.vehicleName.localeCompare(a.vehicleName));

      break;

    default:
      break;
  }

  const handleDelete = async () => {
    try {

      const response = await axios.delete(apiUrlPartnerVehicle + "delete", {
        data: { id: selectedVehicle._id },
      });

      setAlert({
        message: "Vehicle Deleted Successfully",
        type: "successAlert",
      });

      getVehicles();

      setShowDelete(false);
    } catch (error) {
    }
  };

  return (
    <>
      <div className="vehicle-page">
        {alertData && (
          <Alert message={alertData.message} type={alertData.type} />
        )}
        
        <CommonHeader
          title="My Vehicles"
          buttonText="Add Vehicle"
          icon={<FaPlus />}
          onClick={() => setShowModal(true)}
        />

        <div className="stats-grid">

        <StatsCard 
        title="Total Vehicles"
        value={vehicles.length}
        />

        <StatsCard 
        title="Avaliable Vehicles"
        value={vehicles.filter((vehicle)=> vehicle.status === "Available").length}
        />

        <StatsCard 
        title="Assigned Vehicles"
        value={vehicles.filter((vehicle)=> vehicle.status === "Assigned").length}
        />

         <StatsCard 
        title="Inactive Vehicle"
        value={vehicles.filter((vehicle)=> vehicle.status === "Inactive").length}
        />

        </div>
        <br/>

        <PageToolbar
          search={search}
          setSearch={setSearch}
          filter={statusFilter}
          setFilter={setStatusFilter}
          sort={sort}
          setSort={setSort}
          filterOptions={[ "All", "Available", "Assigned", "On Trip", "Maintenance", "Inactive",]}
          sortOptions={["Newest", "Oldest", "A-Z", "Z-A"]}
          total={sortedVehicles.length}
        />

        {loading ? (
          <div className="loading">Loading Vehicles...</div>
        ) : filteredVehicles.length === 0 ? (
          <div className="empty-state">
            🚚
            <h3>No Vehicles Found</h3>
            <p>Click on Add Vehicle to create your first vehicle.</p>
          </div>
        ) : (
          <div className="vehicle-grid">
            {sortedVehicles.map((vehicle) => (
              <div key={vehicle._id} className="vehicle-card">
                <img
                  src={vehicleuploadurl + vehicle.images}
                  alt="Vehicle"
                  style={{ height: "70px", width: "100px" }}
                />

                <h3>{vehicle.vehicleName}</h3>

                <p>{vehicle.vehicleNumber}</p>

                <p>{vehicle.vehicleType}</p>

                <p>{vehicle.capacity}</p>
                <StatusBadge status={vehicle.status} />

                <div className="vehicle-actions">
                  <button
                    onClick={() => {
                      setSelectedVehicle(vehicle);

                      setShowView(true);
                    }}
                  >
                    View
                  </button>

                  <button
                    onClick={() => {
                      setSelectedVehicle(vehicle);

                      setShowEdit(true);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      setSelectedVehicle(vehicle);

                      setShowDelete(true);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <AddVehicleModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSave={getVehicles}
      />

      <ViewVehicleModal
        isOpen={showView}
        vehicle={selectedVehicle}
        onClose={() => setShowView(false)}
      />

      <EditVehicleModal
        isOpen={showEdit}
        vehicle={selectedVehicle}
        onClose={() => setShowEdit(false)}
        onUpdate={getVehicles}
      />

      <DeleteModal
        isOpen={showDelete}
        onClose={() => setShowDelete(false)}
        onConfirm={handleDelete}
        title="Delete Vehicle"
        message={`Delete ${selectedVehicle?.vehicleName}?`}
        loading={loading}
      />
    </>
  );
}

export default PartnerVehicles;
