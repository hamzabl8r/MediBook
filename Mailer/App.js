// Mailer/RegisterMailer.js

const nodemailer = require('nodemailer');
require('dotenv').config({path: './.env'});

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});


const sendAppointmentConfirmationEmail = async (patient, doctor, savedAppointment ,date , time ) => {
    try {
        const appointmentDate = new Date(savedAppointment.selectedDate).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });

        const mailOptions = {
            from: "MediBook ",
            to: patient.email,
            subject: 'Appointment Confirmation 📅',
            html: `${patient.name}, your appointment with Dr. ${doctor.name} has been confirmed for ${date} at ${time}. See you then!
                
            `
        };

        await transporter.sendMail(mailOptions);
        console.log(`Appointment confirmation email sent successfully to ${patient.email}`);

    } catch (error) {
        console.error('Error sending appointment confirmation email:', error);
    }
};

module.exports = { sendAppointmentConfirmationEmail };

// <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                //     <h2 style="color: #0056b3;">Hello ${patient.name},</h2>
                //     <p>Your appointment has been successfully booked!
                //     <strong>Doctor:</strong> Dr. ${doctor.name}
                //     <strong>Date:</strong> ${date}
                //     <strong>Time:</strong> ${time}
                //     </p>
                //     <h3>Appointment Details:</h3>
                //     <ul>
                //         <li></li>
                //         <li></li>
                //         <li></li>
                //     </ul>
                //     <p>If you need to reschedule or cancel, please contact us at least 24 hours in advance.</p>
                //     <br>
                //     <p>Best regards,</p>
                //     <p><strong>The Clinic Team</strong></p>
                // </div>