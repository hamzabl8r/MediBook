const AppointementRouter = require("express").Router();
const {
  sendAppointmentConfirmationEmail,
} = require("../Mailer/AppointmentMailer");
const Appointement = require("../models/Appointment");
const User = require("../models/users");

// add appointement
AppointementRouter.post("/add", async (req, res) => {
  try {
    const { doctorId, patientId, selectedDate, selectedTime, fee } = req.body;

    const newAppointement = new Appointement(req.body);

    const savedAppointment = await newAppointement.save();

    const patient = await User.findById(patientId);
    const doctor = await User.findById(doctorId);
    const date = req.body.selectedDate
    const time = req.body.selectedTime
    if (doctor && patient) {
      sendAppointmentConfirmationEmail(patient, doctor, savedAppointment, date, time);
    } else {
      console.warn("Could not find doctor or patient to send confirmation email.");
    }
    
    res.status(201).send({ 
        msg: "Appointment created successfully!", 
        appointment: savedAppointment 
    });

  } catch (error) {
    console.error("Error creating appointment:", error);
    res.status(500).send({ msg: "Server error while creating appointment." });
  }
});

// get all appointements
AppointementRouter.get("/", async (req, res) => {
  try {
    let result = await Appointement.find()
      .populate("doctorId", "name lastname phoneNumber address")
      .populate("patientId", "name");
    res.send({ appointements: result });
  } catch (error) {
    console.log(error);
  }
});
// get appointement by id
AppointementRouter.get("/:id", async (req, res) => {
  try {
    let result = await Appointement.findById(req.params.id)
      .populate("doctorId", "name lastname phoneNumber")
      .populate("patientId", "name");
    res.send({ appointement: result, msg: "Appointement by id" });
  } catch (error) {
    console.log(error);
  }
});
// get appointements by doctor id
AppointementRouter.get("/doctor/:doctorId", async (req, res) => {
  try {
    let result = await Appointement.find({
      doctorId: req.params.doctorId,
    }).populate("patientId", "name lastname");
    res.send({ appointements: result, msg: "Appointements by doctor id" });
  } catch (error) {
    console.log(error);
  }
});
// get appointements by patient id
AppointementRouter.get("/patient/:patientId", async (req, res) => {
  try {
    let result = await Appointement.find({ patientId: req.params.patientId });
    res.send({ appointements: result, msg: "Appointements by patient id" });
  } catch (error) {
    console.log(error);
  }
});
AppointementRouter.put("/:id", async (req, res) => {
  try {
    const { selectedDate, selectedTime, status } = req.body;
    const updateFields = {};
    let result = await Appointement.findById(req.params.id);
    if (!result) res.status(404).send({ msg: "Appointemnet Not Found " });
    if (selectedDate) updateFields.date = date;
    if (selectedTime) updateFields.time = time;
    if (status) updateFields.status = status;

    const updateAppointement = await Appointement.findByIdAndUpdate(
      req.params.id,
      { $set: updateFields }
    );
    res
      .status(200)
      .send({ appointements: updateAppointement, msg: "Appointemen Updated" });
  } catch (error) {
    res.status(500).send(error);
  }
});

AppointementRouter.delete("/:id", async (req, res) => {
  try {
    let result = await Appointement.findByIdAndDelete(req.params.id);
    res.send({ msg: "Appointement deleted", appointement: result });
  } catch (error) {
    console.log(error);
  }
});

module.exports = AppointementRouter;
