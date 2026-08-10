import mongoose from "mongoose";

const partnerProfileSchema = mongoose.Schema({

    _id: Number,

    userId: {
        type: Number,
        required: true,
        unique: true
    },

    companyName: {
        type: String,
        required: true,
        trim: true
    },

    businessAddress: {
        type: String,
        required: true,
        trim: true
    },

    gstNumber: {
        type: String,
        default: ""
    },

    experience: {
        type: String,
        default: ""
    },

    description: {
        type: String,
        default: ""
    },

    services: {
        type: [String],
        default: []
    },

    serviceCities: {
        type: [String],
        default: []
    },

    documents: {
        type: [String],
        default: []
    },

    isVerified: {
        type: Boolean,
        default: false
    },

    isActive: {
        type: Boolean,
        default: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    }

});
const PartnerProfileSchemaModel =
    mongoose.models.partner_profiles ||
    mongoose.model(
        "partner_profiles",
        partnerProfileSchema
    );

export default PartnerProfileSchemaModel;