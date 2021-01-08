require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const nodemailer = require("nodemailer");

const { USERNAME, PASS } = process.env;
const PORT = 4200;

const app = express();

const corsOptions = {
	origin: [process.env.FRONT_URI, process.env.REXP],
	credentials: true,
};
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/message", async (req, res) => {
	const { name, email, message } = req.body;
	try {
		const transporter = nodemailer.createTransport({
			host: "smtp.jimmylam.tech",
			port: 465,
			secure: false, // true for 465, false for other ports
			auth: {
				user: USERNAME, // generated ethereal user
				pass: PASS, // generated ethereal password
			},
		});
		const info = {
			from: `"Contact Message" <${USERNAME}>`, // sender address
			to: `JimmyLam045@gmail.com`, // list of receivers
			cc: `${email}`,
			subject: `Contact form message from ${name}`, // Subject line
			text: message,
		};

		const sendInfo = await transporter.sendMail(info);
		console.log(sendInfo);
		res.status(200);
	} catch (error) {
		console.log(error);
		res.status(500);
	}
});

app.listen(PORT, () => {
	console.log(`Listening at http://localhost:${PORT}`);
});
