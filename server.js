const express = require("express");
const cors = require('cors')
const pino = require('express-pino-logger')();
const axios = require('axios')
require('dotenv').config()

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors())
app.use(express.static('dist'));
app.use(express.urlencoded({ extended: false }));
app.use(pino);

app.get('/captcha/get_score', (req, res) => {
    let token = req.query.token
    console.log(process.env)
    axios.post("https://www.google.com/recaptcha/api/siteverify?secret=" + process.env.REACT_APP_CAPTCHA_SECRET_KEY + "&response=" + token)
        .then(response => {
            res.send(response.data)
        })
        .catch(error => {
            console.error(error)
        })
});

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
})