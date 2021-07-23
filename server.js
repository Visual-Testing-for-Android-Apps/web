const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

const whitelist = ["http://localhost:3000", "https://afternoon-woodland-24079.herokuapp.com"];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));
app.use(express.static("dist"));
app.use(express.urlencoded({ extended: false }));

app.get("/captcha/validate_captcha", (req, res) => {
  const token = req.query.token;
  axios
    .post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.CAPTCHA_SECRET_KEY}&response=${token}`
    )
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
});

// This allows you to refresh the page when you aren't on the root route and not get a GET error.
// This must remain as the last route, otherwise it will catch all get requests.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist/index.html"));
});

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
