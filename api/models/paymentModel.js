import mongoose from "mongoose";

const paymentSchema = mongoose.Schema({

    _id: Number,

    bookingId: {
        type: Number,
        required: true
    },

    quoteId: {
        type: Number,
        required: true
    },

    customerId: {
        type: Number,
        required: true
    },

    partnerId: {
        type: Number,
        required: true
    },

    amount: {
        type: Number,
        required: true
    },

    paymentMethod: {
        type: String,
        required: true,

        default:"Card",
    },

    transactionId: {
        type: String,
        required: true
    },

    paymentStatus: {

        type: String,

        enum: [

            "Pending",

            "Paid",

            "Failed",

            "Refunded"

        ],

        default: "Pending"

    },

    paidAt: {

        type: Date,

        default: Date.now

    }

});

const PaymentSchemaModel =
mongoose.model("payments", paymentSchema);

export default PaymentSchemaModel;