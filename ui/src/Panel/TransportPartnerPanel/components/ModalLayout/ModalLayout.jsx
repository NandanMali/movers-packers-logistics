import "./ModalLayout.css";
import { FaXmark } from "react-icons/fa6";

function ModalLayout({

    title,

    children,

    onClose,

    width = "700px"

}) {

    return (

        <div className="modal-overlay">

            <div
                className="common-modal"
                style={{ width}}
                
            >

                <div className="common-modal-header" >

                    <h2>

                        {title}

                    </h2>

                    <button
                        onClick={onClose}
                    >

                        <FaXmark size={24}/>

                    </button>

                </div>

                <div className="common-modal-body">

                    {children}

                </div>

            </div>

        </div>

    );

}

export default ModalLayout;