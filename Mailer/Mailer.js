require('dotenv').config();
const nodemailer = require("nodemailer");

// Use the simpler 'service' option
const mailer = nodemailer.createTransport({
  service: "gmail", // This handles host, port, and secure settings automatically
  auth: {
    user: process.env.EMAIL_USER, // The email address you're sending from
    pass: process.env.EMAIL_PASS, // The 16-character App Password
  },
});

// An async function to send the email
async function sendTestEmail() {
  try {
    const info = await mailer.sendMail({
      
      
      to: "hamzabeji001@gmail.com", // The recipient's email address
      subject: "Hello from Nodemailer ✔",
      text: "This is a test email sent from a Node.js script.", // plain-text body
      html: "<b>This is a test email sent from a Node.js script.</b>", // HTML body
    });

    console.log("Message sent successfully!");
    console.log("Message ID:", info.messageId);
    // You can see a preview URL if you use a service like Ethereal
    // console.log("Preview URL:", nodemailer.getTestMessageUrl(info));

  } catch (error) {
    console.error("Error sending email:", error);
    console.log("---");
    console.log("Please double-check the following:");
    console.log("1. Is the EMAIL_USER in your .env file the correct, full Gmail address?");
    console.log("2. Is the EMAIL_PASS in your .env file the correct 16-character App Password with NO spaces?");
    console.log("---");
  }
}

// Call the function to run it
sendTestEmail();