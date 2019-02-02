require('./config/config');

const express = require('express')
const bodyParser = require('body-parser')

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/usuarios', function(req, res) {
    res.json('get Usuarios')
});

app.post('/usuarios', function(req, res) {

    let body = req.body;

    res.json({
        persona: body
    })

});

app.put('/usuarios/:id', function(req, res) {

    let id = req.params.id
    res.json({
        id: id
    })
});

app.delete('/usuarios', function(req, res) {
    res.json('delete Usuarios')
});

app.listen(process.env.PORT, () => {
    console.log('escuchando en el puerto', process.env.PORT);
});