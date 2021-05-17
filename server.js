const express = require("express");
const cors = require('cors')
const pino = require('express-pino-logger')();
const axios = require('axios')
require('dotenv').config()

const app = express();
const PORT = process.env.PORT || 3000;

var whitelist = ['http://localhost:3000', 'http://afternoon-woodland-24079.herokuapp.com']
var corsOptions = {
    origin: function (origin, callback) {
        if (!origin || whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}

app.use(cors(corsOptions))
app.use(express.static('dist'));
app.use(express.urlencoded({ extended: false }));
app.use(pino);

app.get('/captcha/validate_captcha', (req, res) => {
    let token = req.query.token
    axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.REACT_APP_CAPTCHA_SECRET_KEY}&response=${token}`)
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