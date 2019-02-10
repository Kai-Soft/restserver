const express = require('express')
const _ = require('underscore')

const User = require('../models/usuario')
const { verificaToken, verificaAdmin_Role } = require('../middlewares/autenticacion')

const app = express();

app.get('/', function(req, res) {
    res.json({
        message: 'Iniciando los servicios REST, para comenzar a consumirlos, utilizar los servicios GET, POST, UPDATE, DELETE con la ruta /usuarios'
    });
})

app.get('/usuarios', verificaToken, (req, res) => {

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    User.find({ estado: true }, 'name email role estado google')
        .skip(desde)
        .limit(limite)
        .exec((err, users) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            User.count({ estado: true }, (err, cuantos) => {
                res.json({
                    ok: true,
                    users,
                    conteo: cuantos
                });
            });
        })

});

app.post('/usuarios', [verificaToken, verificaAdmin_Role], (req, res) => {

    let body = req.body;

    let user = new User({
        name: body.nombre,
        email: body.email,
        password: body.password,
        role: body.role
    });

    user.save((err, userDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            user: userDB
        });

    });

});

app.put('/usuarios/:id', [verificaToken, verificaAdmin_Role], (req, res) => {

    let id = req.params.id;
    let body = _.pick(req.body, ['name', 'email', 'img', 'role', 'estado']);

    User.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, userDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            user: userDB
        });
    })
});

app.delete('/usuarios/:id', [verificaToken, verificaAdmin_Role], (req, res) => {

    let id = req.params.id;

    /* User.findByIdAndRemove(id, (err, userDeleted) => {

    }); */

    let deleted = {
        estado: false
    };

    User.findByIdAndUpdate(id, deleted, { new: true }, (err, userDeleted) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (!userDeleted) {
            return res.status(400).json({
                ok: false,
                err: 'Usuario no encontrado'
            });
        }

        res.json({
            ok: true,
            userDeleted
        })

    })

});

module.exports = app;