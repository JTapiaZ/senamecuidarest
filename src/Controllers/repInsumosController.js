const RepInsumo = require('../Models/tbl_RepInsumos');
var ip = require('ip');
var geoip = require('geoip-lite');

exports.insumo_create = function (req, res) {
    // ------------------ Validate Request ----------------- //
    if (!req.body.tapabocas || !req.body.amonio || !req.body.antibacterial || !req.body.alcohol || !req.body.recorridos ) {
        return res.status(400).send("¡Por favor rellene todos los campos solicitados!");
    }

    const {body} = req

// Create a public
    let repInsumo = new RepInsumo(
        (
            {
                tapabocas: body.tapabocas,
                amonioCuaternario: body.amonio,
                antibacterial: body.antibacterial,
                alcohol: body.alcohol,
                recorridosCampo: body.recorridos,
            }
        )
    );


// ------------- save public in the database -----------

    repInsumo.save()
        .then(data => {
            res.send("¡Su registro se ha guardado exitosamente!");
        })
        .catch(err => {
            if (err.name === 'MongoError' && err.code === 11000) {
                // Duplicate username
                console.log(err);
                return res.status(409).send(err.keyValue);
            }
        })


}

// ------------- retrieve and return all public ------------------
exports.all_insumo = (req, res) => {

    const ClienteIP = ip.address()

    const Cosasusuario = geoip.lookup(ClienteIP);

    let geo = geoip.lookup(ClienteIP);
    console.log(`su ip es ${ClienteIP}`)
    console.log(geo)

    RepInsumo.find()
        .then(data => {
            var message = "";
            if (data === undefined || data.length == 0) message = "insumos no encontradas!";
            else message = "insumos recibidas";
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
exports.insumo_details = (req, res) => {
    RepInsumo.findById(req.params.id)
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "insumo no encontrada con el id" + req.params.id
                });
            }
            res.send({
                message: "insumo encontrada",
                data: data
            });
        })
        .catch(err => {
            if (err.kind === "ObjectId") {
                return res.status(404).send({
                    message: "insumo no encontrada con el id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error al traer la insumo con el id " + req.params.id
            });
        });
};

// --------- Find public and update ----------
exports.insumo_update = (req, res) => {
    RepInsumo.findOneAndUpdate(
        req.params.id,
        {
            $set: req.body
        },
        {new: true}
    )
        .then(data => {
            if (!data) {
                return res.status(400).send({
                    message: "insumo no encontrada con el id " + req.params.id
                });
            }
            res.send({
                data: data
            });
        })
        .catch(err => {
            if (err.kind === "ObjectId") {
                return res.status(404).send({
                    message: "insumo no encontrada con el id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error actualizando la insumo con el id " + req.params.id
            });
        });
}

// delete a public with the specified id.
exports.insumo_delete = (req, res) => {
    RepInsumo.findOneAndDelete(req.params.id)
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "insumo no encontrada con el id " + req.params.id
                });
            }
            res.send({
                message: "insumo eliminada exitosamente"
            });
        })
        .catch(err => {
            if (err.kind === "ObjectId" || err.name === "NotFound") {
                return res.status(404).send({
                    message: "insumo no encontrada con el id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "No se puede eliminar la insumo con el id " + req.params.id
            });
        });
};


