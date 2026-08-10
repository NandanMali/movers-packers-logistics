import { FaTriangleExclamation } from "react-icons/fa6";
import ModalLayout from "../components/ModalLayout/ModalLayout";

function DeleteVehicleModal({

    isOpen,

    onClose,

    onDelete

}) {

    if (!isOpen) return null;

    return (
<>
        <ModalLayout

title="Delete Vehicle"

width="400px"

onClose={onClose}

>


<h2>
                    Delete Vehicle?

                </h2>

                <p>

                    This action cannot be undone.

                </p>

                <div className="delete-actions">

                    <button

                        className="cancel-btn"

                        onClick={onClose}

                    >

                        Cancel

                    </button>

                    <button

                        className="delete-btn"

                        onClick={onDelete}

                    >

                        Delete

                    </button>

                </div>

           </ModalLayout>
           </>

    );

}

export default DeleteVehicleModal;