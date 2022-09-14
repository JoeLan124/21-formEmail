import nodemailer from "nodemailer";
import sendEmail from "lib/email.js";

// export default async function handler(req, res) {
//   const transporter = nodemailer.createTransport(process.env.EMAIL_SERVER);

//   transporter.sendMail(
//     {
//       from: process.env.EMAIL_FROM,
//       to: to,
//       subject: subject,
//       html: body,
//     },
//     function (err, info) {
//       if (err) {
//         console.log(err);
//       } else {
//         ok;
//         sendEmail(
//           "johannes.langosch@nexgo.de",
//           "New booking",
//           `${req.body.firstname} ${req.body.surname} `
//         );
//       }
//     }
//   );

//   res.end();
// }

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
      secure: true,
    });
    const mailData = {
      from: process.env.EMAIL_FROM,
      sender: "Gruppenpostfach - do not answer",
      to: "johannes.langosch@googlmail.com",
      subject: `Beantragung Berechtigung für ${req.body.surname} ${req.body.pnr}`,
      html: `<div>${req.body.firstname};${req.body.surname};${req.body.pnr};${req.body.email};${req.body.description};
      ${req.body.orga};${req.body.telefon};${req.body.surnameV};${req.body.pnrV}</div>`,
    };
    transporter.sendMail(mailData, function (err, info) {
      if (err) console.log(err);
      else console.log(info);
    });
    res.status(200);
    res.end();
  }
}
