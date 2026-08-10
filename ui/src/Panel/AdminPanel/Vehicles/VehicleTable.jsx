const VehicleTable = ({ 
    vehicles,
    onView,
     onEdit,
    onDelete,
 }) => {

    return (

        <div className="vehicle-table">

            <table>

                <thead>

                    <tr>

                        <th>Image</th>

                        <th>Vehicle No</th>

                        <th>Name</th>

                        <th>Type</th>

                        <th>Capacity</th>

                        <th>Status</th>

                        <th>Action</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        vehicles.length > 0 ?

                        vehicles.map((vehicle) => (

                            <tr key={vehicle.id}>

                                <td>

                                    {

                                        vehicle.image ?

                                        <img
                                            src={vehicle.image}
                                            alt=""
                                            className="vehicle-img"
                                        />

                                        :

                                        <div className="vehicle-placeholder">

                                            🚚

                                        </div>

                                    }

                                </td>

                                <td>

                                    {vehicle.vehicleNumber}

                                </td>

                                <td>

                                    {vehicle.vehicleName}

                                </td>

                                <td>

                                    {vehicle.vehicleType}

                                </td>

                                <td>

                                    {vehicle.capacity}

                                </td>

                                <td>

                                    <span
                                        className={`status ${vehicle.status?.toLowerCase()}`}
                                    >

                                        {vehicle.status}

                                    </span>

                                </td>

                                <td>

                                    <button onClick={()=> onView(vehicle)}>

                                        View

                                    </button>

                                    <button
    onClick={() => onEdit(vehicle)}
>
    Edit
</button>

                                    <button onClick={()=> onDelete(vehicle)}>

                                        Delete

                                    </button>

                                </td>

                            </tr>

                        ))

                        :

                        <tr>

                            <td
                                colSpan="7"
                                className="empty-table"
                            >

                                No Vehicles Found

                            </td>

                        </tr>

                    }

                </tbody>

            </table>

        </div>

    );

};

export default VehicleTable;