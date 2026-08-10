import "./statusTimeline.css";

function StatusTimeline({

    currentStep = 1

}) {

    const steps = [

        "Booking Created",

        "Quotes Received",

        "Quote Accepted",

        "Payment Completed",

        "Driver Assigned",

        "Vehicle Assigned",

        "Trip Started",

        "Completed"

    ];

    return (

        <div className="status-timeline">

            <h3>

                Booking Progress

            </h3>

            {

                steps.map((step, index) => (

                    <div

                        key={index}

                        className="timeline-item"

                    >

                        <div

                            className={

                                index <= currentStep

                                    ?

                                    "timeline-circle active"

                                    :

                                    "timeline-circle"

                            }

                        >

                            {

                                index < currentStep

                                    ?

                                    "✓"

                                    :

                                    index + 1

                            }

                        </div>

                        <div className="timeline-content">

                            <p>

                                {step}

                            </p>

                        </div>

                    </div>

                ))

            }

        </div>

    );

}

export default StatusTimeline;