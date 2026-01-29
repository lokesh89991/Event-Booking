const nodemailer = require('nodemailer');

// Build transporter only when SMTP config exists. If not present, we provide
// a no-op sendMail that resolves so the server can run without SMTP creds.
let transporter = null;
if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
  });
} else {
  console.warn('SMTP not fully configured — emails will be logged but not sent.');
}

async function sendMail({ to, subject, html, text }) {
  const from = process.env.FROM_EMAIL || 'no-reply@example.com';
  if (!transporter) {
    console.log('Email (simulation) ->', { from, to, subject, text, html });
    return Promise.resolve({ simulated: true });
  }
  try {
    const info = await transporter.sendMail({ from, to, subject, html, text });
    return info;
  } catch (err) {
    // Log but don't throw — booking flow should not fail solely because email failed.
    console.error('Failed to send email:', err);
    return { error: true };
  }
}

module.exports = { sendMail };
