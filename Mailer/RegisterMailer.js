
const nodemailer = require('nodemailer');
require('dotenv').config({path: './.env'});


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS, 
    },
});

/**
 * @param {object} user 
 */
const sendWelcomeEmail = async (user) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: 'Welcome to Our Clinic! 🎉',
            html: `
                <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                    <h2 style="color: #0056b3;">Hello ${user.name},</h2>
                    <p>Welcome! We are thrilled to have you as a new member of our community.</p>
                    <p>You can now use your account to find top-rated doctors and book your appointments seamlessly.</p>
                    <p>If you have any questions, feel free to contact our support team.</p>
                    <br>
                    <p>Best regards,</p>
                    <p><strong>The Clinic Team</strong></p>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);
        console.log(`Welcome email sent successfully to ${user.email}`);

    } catch (error) {
        console.error('Error sending welcome email:', error);
    }
};


const sendAppointmentConfirmationEmail = async (patient, doctor, appointment) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: patient.email,
            subject: 'Appointment Confirmation 📅',
            html: `
                <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                    <h2 style="color: #0056b3;">Hello ${patient.name},</h2>
                    <p>Your appointment has been successfully booked!</p>
                    <p><strong>Doctor:</strong> Dr. ${doctor.name}</p>
                    <p><strong>Date & Time:</strong> ${new Date(appointment.date).toLocaleString()}</p>
                    <p>If you need to reschedule or cancel, please contact us at least 24 hours in advance.</p>
                    <br>
                    <p>Best regards,</p>
                    <p><strong>The Clinic Team</strong></p>
                </div>
            `
        };
        await transporter.sendMail(mailOptions);
        console.log(`Appointment confirmation email sent to ${patient.email}`);
    } catch (error) {
        console.error('Error sending appointment confirmation email:', error);
    }
};


module.exports = { 
    sendWelcomeEmail,
    sendAppointmentConfirmationEmail 
};