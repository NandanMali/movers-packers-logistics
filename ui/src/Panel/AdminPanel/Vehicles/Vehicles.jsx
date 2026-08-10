import { useEffect, useState } from "react";
import VehicleTable from "./VehicleTable";
import AddVehicleModal from "./AddVehicleModal";
import EditVehicleModal from "./EditVehicleModal";
import "./vehicle.css";
import ConfirmModal from "../../../components/confirmationBox/ConfirmationBox";
import ViewVehicleModal from "./ViewVehicleModal";
import axios from "axios";
import { apiUrlPartnerVehicle } from "../../../apiUrl";

const Vehicles = () => {

    const [vehicles, setVehicles] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editingVehicle, setEditingVehicle] = useState(null);
    const [deleteVehicle, setDeleteVehicle] = useState(null);
    const [viewVehicle, setViewVehicle] = useState(null);
    const [search, setSearch] = useState("");
const [statusFilter, setStatusFilter] = useState("All");

    
const fetchVehicle=async()=>{
    await axios.get(apiUrlPartnerVehicle + "fetch").then((res)=>{
        setVehicles(res.data);
    }).catch(()=>{
        setVehicles([])
    })
}
useEffect(() => {
    fetchVehicle();
    }, []);
    const handleSaveVehicle =
(vehicle) => {

    const updatedVehicles = [

        ...vehicles,

        vehicle

    ];

    setVehicles(
        updatedVehicles
    );

    localStorage.setItem(

        "vehicles",

        JSON.stringify(
            updatedVehicles
        )

    );

};


const handleUpdateVehicle = (updatedVehicle) => {

    const updatedVehicles = vehicles.map((vehicle) =>
        vehicle.id === updatedVehicle.id
            ? updatedVehicle
            : vehicle
    );

    setVehicles(updatedVehicles);

    localStorage.setItem(
        "vehicles",
        (updatedVehicles)
    );

    setEditingVehicle(null);
};

const handleDeleteVehicle = () => {

    const updatedVehicles = vehicles.filter(
        (vehicle) => vehicle.id !== deleteVehicle.id
    );

    setVehicles(updatedVehicles);

    localStorage.setItem(
        "vehicles",
        JSON.stringify(updatedVehicles)
    );

    setDeleteVehicle(null);

};

const filteredVehicles = vehicles.filter((vehicle) => {

    const searchText = search.toLowerCase();

    const matchSearch =

        vehicle.vehicleNumber?.toLowerCase().includes(searchText) ||

        vehicle.vehicleName?.toLowerCase().includes(searchText) ||

        vehicle.brand?.toLowerCase().includes(searchText) ||

        vehicle.vehicleType?.toLowerCase().includes(searchText);

    const matchStatus =

        statusFilter === "All" ||

        vehicle.status === statusFilter;

    return matchSearch && matchStatus;

});

    return (

        <div className="vehicle-page">

            <div className="vehicle-header">

                <div>

                    <h2>Vehicles</h2>

                    <p>
                        Manage all transport vehicles
                    </p>

                </div>

                <button
    className="add-btn"
    onClick={() =>
        setShowModal(true)
    }
>

    + Add Vehicle

</button>

</div>
<AddVehicleModal

    isOpen={showModal}

    onClose={() =>
        setShowModal(false)
    }

    onSave={
        handleSaveVehicle
    }

/>


            <div className="vehicle-toolbar">

    <input
        type="text"
        placeholder="Search Vehicle..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
    />

    <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
    >
        <option>All</option>
        <option>Available</option>
        <option>Assigned</option>
        <option>On Trip</option>
        <option>Maintenance</option>
        <option>Inactive</option>
    </select>

</div>

            <VehicleTable
    vehicles={filteredVehicles}
    onView={setViewVehicle}
    onEdit={setEditingVehicle}
    onDelete={setDeleteVehicle}
/>

            <EditVehicleModal
    isOpen={editingVehicle !== null}
    vehicle={editingVehicle}
    onClose={() => setEditingVehicle(null)}
    onUpdate={handleUpdateVehicle}
/>

<ViewVehicleModal
    isOpen={viewVehicle !== null}
    vehicle={viewVehicle}
    onClose={() => setViewVehicle(null)}
/>

<ConfirmModal

    isOpen={deleteVehicle !== null}

    title="Delete Vehicle"

    message={`Are you sure you want to delete ${
        deleteVehicle?.vehicleNumber || ""
    } ?`}

    onConfirm={handleDeleteVehicle}

    onCancel={() => setDeleteVehicle(null)}

/>

        </div>

    );

};

export default Vehicles;