const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function sendMail({ to, subject, text, html }) {
  try {
    await sgMail.send({
      to,
      from: {
        email: process.env.MAIL_FROM,
        name: "Event-Bookings",
      },
      subject,
      text,
      html,
    });
    console.log("Email sent via SendGrid API");
    return { success: true };
  } catch (err) {
    console.error(
      "Failed to send email:",
      err.response?.body || err.message
    );
    return { error: true };
  }
}

module.exports = { sendMail };
