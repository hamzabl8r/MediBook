const AppointmentRouter = require("express").Router();
const Appointment = require("../models/Appointment");

// add appointment
AppointmentRouter.post("/add", async (req, res) => {
    try {
        const { doctorId, patientId, appointmentDate, reason } = req.body;
        const newAppointment = await new Appointment(req.body);
        newAppointment.save();
        res.send({ appointment: newAppointment, msg: "Appointment added" });
    } catch (error) {
        res.send({ msg: error.msg });
    }
});

// get all appointments
AppointmentRouter.get("/", async (req, res) => {
    try {
        let result = await Appointment.find();
        res.send({ appointments: result, msg: "All appointments" });
    }
    catch (error) {
        console.log(error);
    }   
});
// get appointment by id    
AppointmentRouter.get("/:id", async (req, res) => {
    try {
        let result = await Appointment.findById(req.params.id);
        res.send({ appointment: result, msg: "Appointment by id" });
    } catch (error) {
        console.log(error);
    }
});
// get appointments by doctor id
AppointmentRouter.get("/doctor/:doctorId", async (req, res) => {
    try {
        let result = await Appointment.find({ doctorId: req.params.doctorId });
        res.send({ appointments: result, msg: "Appointments by doctor id" });
    } catch (error) {
        console.log(error);
    }
});
// get appointments by patient id
AppointmentRouter.get("/patient/:patientId", async (req, res) => {
    try {
        let result = await Appointment.find({ patientId: req.params.patientId });
        res.send({ appointments: result, msg: "Appointments by patient id" });
    } catch (error) {
        console.log(error);
    }
});

AppointmentRouter.delete("/:id", async (req, res) => {
    try {
        let result = await Appointment.findByIdAndDelete(req.params.id);
        res.send({ msg: "Appointment deleted", appointment: result });
    } catch (error) {
        console.log(error);
    }
});

module.exports = AppointmentRouter;