import { useEffect, useState } from "react";
import DriverTable from "./DriverTable";
import DriverModal from "./DriverModal";
import "./driver.css";
import ConfirmModal from "../../../components/confirmationBox/ConfirmationBox";
import ViewDriverModal from "./ViewDriverModal";

const Drivers = () => {

    const [drivers, setDrivers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editingDriver, setEditingDriver] = useState(null);
const [viewDriver, setViewDriver] = useState(null);
const [deleteDriver, setDeleteDriver] = useState(null);
const [search, setSearch] = useState("");
const [statusFilter, setStatusFilter] = useState("All");

    useEffect(() => {

        const data =
            JSON.parse(localStorage.getItem("drivers")) || [];

        setDrivers(data);

    }, []);

//    const handleSaveDriver = (driver) => {

//     const updatedDrivers = [
//         ...drivers,
//         driver
//     ];

//     setDrivers(updatedDrivers);

//     localStorage.setItem(
//         "drivers",
//         JSON.stringify(updatedDrivers)
//     );

//     const vehicles =
//         JSON.parse(localStorage.getItem("vehicles")) || [];

//     const updatedVehicles =
//         vehicles.map(vehicle => {

//             if (
//                 vehicle.vehicleNumber ===
//                 driver.assignedVehicle
//             ) {

//                 return {

//                     ...vehicle,

//                     status: "Assigned"

//                 };

//             }

//             return vehicle;

//         });

//     localStorage.setItem(
//         "vehicles",
//         JSON.stringify(updatedVehicles)
//     );

//     setShowModal(false);

// };

const handleSaveDriver = (driver) => {

    let updatedDrivers;

    if (editingDriver) {

        updatedDrivers = drivers.map(item =>
            item.id === driver.id
                ? driver
                : item
        );

    } else {

        updatedDrivers = [
            ...drivers,
            driver
        ];

    }

    setDrivers(updatedDrivers);

    localStorage.setItem(
        "drivers",
        JSON.stringify(updatedDrivers)
    );

    setEditingDriver(null);

    setShowModal(false);

};


const handleDeleteDriver = () => {

    const updatedDrivers = drivers.filter(
        driver => driver.id !== deleteDriver.id
    );

    setDrivers(updatedDrivers);

    localStorage.setItem(
        "drivers",
        JSON.stringify(updatedDrivers)
    );

    setDeleteDriver(null);

};


const filteredDrivers = drivers.filter((driver) => {

    const searchText = search.toLowerCase();

    const matchSearch =

        driver.fullName?.toLowerCase().includes(searchText) ||

        driver.phone?.toLowerCase().includes(searchText) ||

        driver.email?.toLowerCase().includes(searchText) ||

        driver.licenseNumber?.toLowerCase().includes(searchText) ||

        driver.assignedVehicle?.toLowerCase().includes(searchText);

    const matchStatus =

        statusFilter === "All" ||

        driver.status === statusFilter;

    return matchSearch && matchStatus;

});

    return (

        <div className="driver-page">

            <div className="driver-header">

                <div>

                    <h2>Drivers</h2>

                    <p>
                        Manage all transport drivers
                    </p>

                </div>

                <button
                    className="add-driver-btn"
                    onClick={() => setShowModal(true)}
                >
                    + Add Driver
                </button>

            </div>

            <div className="driver-stats">

    <div className="driver-card">

        <h3>Total Drivers</h3>

        <h2>

            {drivers.length}

        </h2>

    </div>

    <div className="driver-card">

        <h3>Available</h3>

        <h2>

            {

                drivers.filter(

                    driver => driver.status === "Available"

                ).length

            }

        </h2>

    </div>

    <div className="driver-card">

        <h3>On Trip</h3>

        <h2>

            {

                drivers.filter(

                    driver => driver.status === "On Trip"

                ).length

            }

        </h2>

    </div>

    <div className="driver-card">

        <h3>Inactive</h3>

        <h2>

            {

                drivers.filter(

                    driver => driver.status === "Inactive"

                ).length

            }

        </h2>

    </div>

</div>


            <div className="driver-toolbar">

    <input
        type="text"
        placeholder="Search Driver..."
        value={search}
        onChange={(e) =>
            setSearch(e.target.value)
        }
    />

    <select
        value={statusFilter}
        onChange={(e) =>
            setStatusFilter(e.target.value)
        }
    >

        <option>All</option>

        <option>Available</option>

        <option>On Trip</option>

        <option>On Leave</option>

        <option>Inactive</option>

    </select>

</div>

            <DriverTable
    drivers={filteredDrivers}
    onView={setViewDriver}
    onEdit={setEditingDriver}
    onDelete={setDeleteDriver}
/>

            <DriverModal
    isOpen={showModal || editingDriver !== null}
    editingDriver={editingDriver}
    onClose={() => {

        setShowModal(false);

        setEditingDriver(null);

    }}
    onSave={handleSaveDriver}
/>

<ViewDriverModal
    isOpen={viewDriver !== null}
    driver={viewDriver}
    onClose={() => setViewDriver(null)}
/>

<ConfirmModal
    isOpen={deleteDriver !== null}
    title="Delete Driver"
    message={`Delete ${deleteDriver?.fullName}?`}
    onConfirm={handleDeleteDriver}
    onCancel={() => setDeleteDriver(null)}
/>

        </div>

    );

};

export default Drivers;