const nodemailer = require("nodemailer");
require("dotenv").config({ path: "./.env" });

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * @param {object} patient 
 * @param {object} doctor 
 * @param {object} appointment 
 */
const sendAppointmentConfirmationEmail = async (patient,doctor,savedAppointment,date,time) => {
const appointmentDate = new Date(date).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });  try {
    

    const mailOptions = {
      from: "MediBook ",
      to: patient.email,
      subject: "Appointment Confirmation 📅",
      html: `
                <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                    <h2 style="color: #0056b3;">Hello ${patient.name},</h2>
                    <p>Your appointment has been successfully booked!
                    </p>
                    <h3>Appointment Details:</h3>
                    <ul>
                        <li><strong style="color: #0056b3;">Doctor: Dr. ${doctor.name}</strong></li>
                        <li><strong>Date:</strong> ${appointmentDate}</li>
                        <li><strong>Time:</strong> ${time}</li>
                    </ul>
                    <p>If you need to reschedule or cancel, please contact us at least 24 hours in advance.</p>
                    <br>
                    <p>Best regards,</p>
                    <p><strong>The Clinic Team</strong></p>
                </div>
            `,
    };

    await transporter.sendMail(mailOptions);
    console.log(
      `Appointment confirmation email sent successfully to ${patient.email}`
    );
  } catch (error) {
    console.error("Error sending appointment confirmation email:", error);
  }
};

module.exports = { sendAppointmentConfirmationEmail };
