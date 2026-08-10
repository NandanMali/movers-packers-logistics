import {
    FaClock,
    FaPaperPlane,
    FaCheckCircle,
    FaTimesCircle
} from "react-icons/fa";

function QuoteStatistics({

    waiting = 0,

    quoted = 0,

    accepted = 0,

    rejected = 0

}) {

    const cards = [

        
        {
            title: "Quoted",
            count: quoted,
            icon: <FaPaperPlane />,
            className: "quoted-card"
        },
        
        {
            title: "Waiting",
            count: waiting,
            icon: <FaClock />,
            className: "waiting-card"
        },
        {
            title: "Accepted",
            count: accepted,
            icon: <FaCheckCircle />,
            className: "accepted-card"
        },

        {
            title: "Rejected",
            count: rejected,
            icon: <FaTimesCircle />,
            className: "rejected-card"
        }

    ];

    return (

        <div className="quote-statistics">

            {

                cards.map((item, index) => (

                    <div

                        key={index}

                        className={`stat-card ${item.className}`}

                    >

                        <div className="stat-icon">

                            {item.icon}

                        </div>

                        <div className="stat-info">

                            <h2>

                                {item.count}

                            </h2>

                            <p>

                                {item.title}

                            </p>

                        </div>

                    </div>

                ))

            }

        </div>

    );

}

export default QuoteStatistics;