import sendgrid from "@sendgrid/mail";

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(501).end();
  }

  if (req.method === "POST") {
    try {
      await sendgrid.send({
        to: "johannes.langosch@nexgo.de",
        from: "johannes.langosch@googlmail.com",
        subject: `Beantragung Berechtigung für ${req.body.surname} ${req.body.pnr}`,
        html: `<div>${req.body.firstname};${req.body.surname};${req.body.pnr};${req.body.email};${req.body.description};
       ${req.body.orga};${req.body.telefon};${req.body.surnameV};${req.body.pnrV}</div>`,
      });
    } catch (error) {
      return res.status(error.statusCode || 500).json({ error: error.message });
    }

    res.status(200).json({ error: "" });
    res.end();
  }
}
