import nodemailer from "nodemailer";
import sendEmail from "lib/email.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(501).end();
  }

  if (req.method === "POST") {
    const transporter = nodemailer.createTransport({
      port: process.env.EMAIL_SERVER_PORT,
      host: process.env.EMAIL_SERVER_HOST,
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
      // secure: true,
    });

    await new Promise((resolve, reject) => {
      // verify connection configuration
      transporter.verify(function (error, success) {
        if (error) {
          console.log(error);
          reject(error);
        } else {
          console.log("Server is ready to take our messages");
          resolve(success);
        }
      });
    });

    const mailData = {
      from: process.env.EMAIL_FROM,
      sender: "Gruppenpostfach - do not answer",
      to: "johannes.langosch@googlmail.com",
      subject: `Beantragung Berechtigung für ${req.body.surname} ${req.body.pnr}`,
      html: `<div>${req.body.firstname};${req.body.surname};${req.body.pnr};${req.body.email};${req.body.description};
      ${req.body.orga};${req.body.telefon};${req.body.surnameV};${req.body.pnrV}</div>`,
    };

    await new Promise((resolve, reject) => {
      // send mail
      transporter.sendMail(mailData, (err, info) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          console.log(info);
          resolve(info);
        }
      });
    });

    res.status(200);
    res.end();
  }
}
