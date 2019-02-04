require('./config/config');

const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// Requerir y usar el recurso routes/usuario.js
app.use(require('./routes/usuario'));

mongoose.connect(process.env.URLBD, { useNewUrlParser: true }, (err, resp) => {

    if (err) throw err;

    console.log('Base de datos ONLINE port 27017');

});

app.listen(process.env.PORT, () => {
    console.log('escuchando en el puerto', process.env.PORT);
});