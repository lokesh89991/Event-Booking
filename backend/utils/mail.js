const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.sendgrid.net",
  port: 587,
  secure: false,
  auth: {
    user: "apikey",
    pass: process.env.SENDGRID_API_KEY,
  },
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 10000,
});

async function sendMail({ to, subject, text, html }) {
  try {
    return await transporter.sendMail({
      from: `Event-Bookings <${process.env.MAIL_FROM}>`,
      to,
      replyTo: process.env.MAIL_FROM,
      subject,
      text,
      html,
    });
  } catch (err) {
    console.error("Failed to send email:", err.message);
    return { error: true };
  }
}

module.exports = { sendMail };
