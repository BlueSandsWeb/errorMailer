require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const fs = require("fs");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// EMAIL CODE

console.log("user :>> ", process.env.EMAILUSR);
console.log("pass :>> ", process.env.EMAILPASS);

async function sendMail() {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  const dt = new Date();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.office365.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAILUSR, // generated ethereal user
      pass: process.env.EMAILPASS, // generated ethereal password
    },
  });

  try {
    const data = fs.readFileSync("./testing.txt", "utf8");
    console.log(data);

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Jon Bernal 👻" <jonathan.bernal@nowigence.com>', // sender address
      to: "Jonathan.palacio@nowigence.com, jonathan.bernal@nowigence.com", // list of receivers
      subject: "***SERVER FAILURE***", // Subject line
      text: "Does this work?", // plain text body
      html: `<b>The system went down on ${dt.toLocaleString()}, here is a copy of the logs</b>`, // html body
      attachments: [
        {
          // utf-8 string as an attachment
          filename: "testing.txt",
          content: data,
        },
      ],
    });
  } catch (err) {
    console.error(err);
  }

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}
// END EMAIL CODE

app.use("/running", (req, res) => {
  console.log("were a running");
  return res.status(200).json({ message: "Still running all good" });
});

app.use("/kill", (req, res) => {
  console.log("Terminating app");
  process.exit(0);
});

app.use("/test", (req, res) => {
  console.log("Sending email");

  sendMail().catch(console.error);

  res.status(200).json({ message: "sending email" });
});

const port = 5000;

app.listen(port, () => {
  console.log(`\n Server Running on http://localhost:${port}`);
});
