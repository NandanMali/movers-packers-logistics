import "./CommonHeader.css";

function CommonHeader({

    title,

    buttonText,

    onClick,

    icon

}){

    return(

        <div className="common-header">

            <div>

                <h2>

                    {title}

                </h2>

            </div>

            <button

                className="common-add-btn"

                onClick={onClick}

            >

                {icon}

                {buttonText}

            </button>

        </div>

    );

}

export default CommonHeader;