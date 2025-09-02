const nodemailer = require("nodemailer");
require('dotenv').config()

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

async function main(obj) {
  const info = await transporter.sendMail({
    from: process.env.EMAIL, 
    to: obj.to, 
    subject: obj.subject,
    html: obj.html, 
  });

  console.log("Message sent: %s", info.messageId);
}

// main().catch(console.error);

module.exports = main