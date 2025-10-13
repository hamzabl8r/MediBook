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
    selectedDate: {
        type: Date,
        required: true
    },
    selectedTime: {
        type: String,
        required: true
    },
    reason: {
        type: String,
    },
    status: {
        type: String,
        default: "pending"
    },
    fee:Number
});
module.exports = mongoose.model("Appointment", appointmentSchema);