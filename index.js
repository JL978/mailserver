require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const { GMAIL_USERNAME, GMAIL_PASS } = process.env;
const PORT = 4200;

const app = express();

app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", req.headers.origin);
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	next();
});
const corsOptions = {
	origin: [process.env.FRONT_URI, process.env.REXP],
	credentials: true,
};
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/message", (req, res) => {
	console.log(req.body);
	// let transporter = nodemailer.createTransport({
	//     host: "smtp.ethereal.email",
	//     port: 587,
	//     secure: false, // true for 465, false for other ports
	//     auth: {
	//       user: testAccount.user, // generated ethereal user
	//       pass: testAccount.pass, // generated ethereal password
	//     },
	//   });
});

app.listen(PORT, () => {
	console.log(`Listening at http://localhost:${PORT}`);
});
