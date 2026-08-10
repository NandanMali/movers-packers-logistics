const DriverTable = ({
    drivers,
    onView,
    onEdit,
    onDelete
}) => {
    return (

        <div className="driver-table">

            <table>

                <thead>

                    <tr>

                        <th>Photo</th>

                        <th>Name</th>

                        <th>Phone</th>

                        <th>Vehicle</th>

                        <th>Status</th>

                        <th>Action</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        drivers.length > 0 ?

                        drivers.map((driver) => (

                            <tr key={driver.id}>

                                <td>

                                    {

                                        driver.image ?

                                        <img
                                            src={driver.image}
                                            alt=""
                                            className="driver-img"
                                        />

                                        :

                                        <div className="driver-placeholder">

                                            👤

                                        </div>

                                    }

                                </td>

                                <td>

                                    {driver.fullName}

                                </td>

                                <td>

                                    {driver.phone}

                                </td>

                                <td>

                                    {driver.assignedVehicle || "-"}

                                </td>

                                <td>

                                    <span
                                        className={`driver-status ${driver.status.toLowerCase().replace(/\s+/g,"-")}`}
                                    >
                                        {driver.status}
                                    </span>

                                </td>

                               <td>

    <button
        onClick={() => onView(driver)}
    >
        View
    </button>

    <button
        onClick={() => onEdit(driver)}
    >
        Edit
    </button>

    <button
        onClick={() => onDelete(driver)}
    >
        Delete
    </button>

</td>

                            </tr>

                        ))

                        :

                        <tr>

                            <td
                                colSpan="6"
                                className="driver-empty"
                            >

                                No Drivers Found

                            </td>

                        </tr>

                    }

                </tbody>

            </table>

        </div>

    );

};

export default DriverTable;