const nodemailer = require("nodemailer");

// Create SendGrid transporter
const transporter = nodemailer.createTransport({
  host: "smtp.sendgrid.net",
  port: 587,
  secure: false, // must be false for port 587
  auth: {
    user: "apikey", // THIS IS LITERAL STRING "apikey"
    pass: process.env.SENDGRID_API_KEY,
  },
});

// Optional: verify connection at startup
transporter.verify((error) => {
  if (error) {
    console.error("SendGrid SMTP connection failed:", error.message);
  } else {
    console.log("SendGrid SMTP ready to send emails");
  }
});

async function sendMail({ to, subject, html, text }) {
  try {
    const info = await transporter.sendMail({
      from: `Event-Bookings <${process.env.MAIL_FROM}>`,
      to,                 // dynamic recipient
      replyTo: process.env.MAIL_FROM,
      subject,
      text,
      html,
    });

    console.log("Email sent:", info.messageId);
    return info;
  } catch (err) {
    // IMPORTANT: log error but DO NOT crash booking flow
    console.error("Failed to send email:", err.message);
    return { error: true };
  }
}

module.exports = { sendMail };
