const mongoose = require("mongoose");
const schema = mongoose.Schema;

const appointmentSchema = new schema({
    doctorId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    patientId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    appointmentDate: {
        type: Date,
        required: true
    },
    reason: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "completed", "cancelled"],
        default: "pending"
    }
});
module.exports = mongoose.model("Appointment", appointmentSchema);