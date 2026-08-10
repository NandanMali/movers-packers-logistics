import AssignedAction from "../Actions/AssignedAction";
import CancelledAction from "../Actions/CancelledAction";
import CompletedAction from "../Actions/CompletedAction";
import ConfirmedAction from "../Actions/ConfirmedAction";
import InProgressAction from "../Actions/InProgressAction";
import PendingAction from "../Actions/PendingAction";
import QuoteAcceptedAction from "../Actions/QuoteAcceptedAction";

function BookingAction({

    booking,

    onViewQuotes,

    onPayNow,

    onTrack,

    onRate,

    onInvoice

}) {

    switch (booking.status) {

        case "Pending":

            return (

                <PendingAction

                    booking={booking}

                    onViewQuotes={onViewQuotes}

                />

            );

        case "Accepted":

            return (

                <QuoteAcceptedAction

                    booking={booking}

                    onPayNow={onPayNow}

                />

            );

        case "Confirmed":

            return (

                <ConfirmedAction

                    booking={booking}

                />

            );

        case "Assigned":

            return (

                <AssignedAction

                    booking={booking}

                    onTrack={onTrack}

                />

            );

        case "In Progress":

            return (

                <InProgressAction

                    booking={booking}

                    onTrack={onTrack}

                />

            );

        case "Completed":

            return (

                <CompletedAction

                    booking={booking}

                    onRate={onRate}

                    onInvoice={onInvoice}

                />

            );

        case "Cancelled":

            return (

                <CancelledAction

                    booking={booking}

                />

            );

        default:

            return null;

    }

}

export default BookingAction;