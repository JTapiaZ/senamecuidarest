const RepLimpieza = require('../Models/tbl_RepLimpieza');
var ip = require('ip');
var geoip = require('geoip-lite');

exports.limpieza_create = function (req, res) {
    // ------------------ Validate Request ----------------- //
    // if (!req.body.encargado || !req.body.torre || !req.body.piso || !req.body.ambiente || !req.body.personasEncargadas || !req.body.preguntas ) {
    //     return res.status(400).send("¡Por favor rellene todos los campos solicitados!");
    // }

    const {body} = req
    const valores = body.preguntas


    let preguntas = {
        aantes: valores[0],
        adespues: valores[1],
        mantes: valores[2],
        mdespues: valores[3],
    }

// Create a public
    let repLimpieza = new RepLimpieza(
        (
            {
                encargado: body.PEncargada,
                torre: body.torre,
                piso: body.piso,
                ambiente: body.ambiente,
                personasEncargadas: body.personas,
                preguntas

            }
        )
    );


// ------------- save public in the database -----------

    repLimpieza.save()
        .then(data => {
            res.send("¡Su registro se ha guardado exitosamente!");
        })
        .catch(err => {
            if (err.name === 'MongoError' && err.code === 11000) {
                // Duplicate username
                console.log(err);
                return res.status(409).send(err.keyValue);
            }
            console.log(err);
        })


}

// ------------- retrieve and return all public ------------------
exports.all_limpieza = (req, res) => {

    const ClienteIP = ip.address()

    const Cosasusuario = geoip.lookup(ClienteIP);

    let geo = geoip.lookup(ClienteIP);
    console.log(`su ip es ${ClienteIP}`)
    console.log(geo)

    RepLimpieza.find()
        .then(data => {
            var message = "";
            if (data === undefined || data.length == 0) message = "Limpiezas no encontradas!";
            else message = "Limpiezas recibidas";
            res.send({
                message: message,
                data: data
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrio un error al traer los registros"
            });

        });
};


// --------- find a public by id -------------
exports.limpieza_details = (req, res) => {
    RepLimpieza.findById(req.params.id)
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "Limpieza no encontrada con el id" + req.params.id
                });
            }
            res.send({
                message: "Limpieza encontrada",
                data: data
            });
        })
        .catch(err => {
            if (err.kind === "ObjectId") {
                return res.status(404).send({
                    message: "Limpieza no encontrada con el id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error al traer la Limpieza con el id " + req.params.id
            });
        });
};

// --------- Find public and update ----------
exports.limpieza_update = (req, res) => {
    // validate request
    if (!req.body.encargado || !req.body.personasEncargadas) {
        return res.status(400).send({
            message: "Por favor ingrese el nombre del encargado de la limpieza y las personas encargadas en realizarla"
        });
    }
    RepLimpieza.findOneAndUpdate(
        req.params.id,
        {
            $set: req.body
        },
        {new: true}
    )
        .then(data => {
            if (!data) {
                return res.status(400).send({
                    message: "Limpieza no encontrada con el id " + req.params.id
                });
            }
            res.send({
                data: data
            });
        })
        .catch(err => {
            if (err.kind === "ObjectId") {
                return res.status(404).send({
                    message: "Limpieza no encontrada con el id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error actualizando la Limpieza con el id " + req.params.id
            });
        });
}

// delete a public with the specified id.
exports.limpieza_delete = (req, res) => {
    RepLimpieza.findOneAndDelete(req.params.id)
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "Limpieza no encontrada con el id " + req.params.id
                });
            }
            res.send({
                message: "Limpieza eliminada exitosamente"
            });
        })
        .catch(err => {
            if (err.kind === "ObjectId" || err.name === "NotFound") {
                return res.status(404).send({
                    message: "Limpieza no encontrada con el id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "No se puede eliminar la Limpieza con el id " + req.params.id
            });
        });
};


