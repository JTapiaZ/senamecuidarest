const IngresoSuspendido = require('../Models/tbl_ingresoSuspendido');
const {emailSend} = require('./mailController');
const {emailEnfermeroSendNE} = require('./mailRegistroNEController');


exports.ingresoSuspendido_create = function (req, res) {
    // ------------------ Validate Request ----------------- //
    if (!req.body.nombre || !req.body.email || !req.body.documentoIdentidad || !req.body.telefono || !req.body.direccionResidencia || !req.body.eps) {
        return res.status(400).send("¡Por favor rellene todos los campos solicitados!");
    }

    const {body} = req
    const valores = body.sintomas


    let sintomas = {
        fiebre: valores[0],
        Tos: valores[1],
        DolorTragar: valores[2],
        MalestarGeneral: valores[3],
        DificultadRespirar: valores[4],
        Gripa: valores[5],
        Diarrea: valores[6],
        ContactoSospechoso: valores[7],
        DolorArticular: valores[8]
    }

// Create a public
    let ingresoSuspendido = new IngresoSuspendido(
        (
            {
                nombre: body.nombre,
                email: body.email,
                documentoIdentidad: body.documentoIdentidad,
                celular: body.celular,
                telefono: body.telefono,
                direccionResidencia: body.direccionResidencia,
                eps: body.eps,
                ficha: body.ficha,
                programaDeFormacion: body.programaDeFormacion,
                sintomas

            }
        )
    );


// ------------- save public in the database -----------

    ingresoSuspendido
        .save()
        .then(data => {
            res.send("¡Su registro se ha guardado exitosamente!");
        })
        .then(dat => {
            emailSend(body)

            Visitante.findOneAndUpdate({email: body.email}, (err, usuario) => {
                if (err) return res.status(500).send({message: 'err'})
            })
            return res.send("Ok")
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
exports.all_ingresoSuspendido = (req, res) => {
    IngresoSuspendido.find()
        .then(data => {
            var message = "";
            if (data === undefined || data.length == 0) message = "Personas no encontradas!";
            else message = "Publico recibido";
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
exports.ingreoSuspendido_details = (req, res) => {
    IngresoSuspendido.findById(req.params.id)
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "Persona no encontrada con el id" + req.params.id
                });
            }
            res.send({
                message: "Persona encontrada",
                data: data
            });
        })
        .catch(err => {
            if (err.kind === "ObjectId") {
                return res.status(404).send({
                    message: "Persona no encontrada con el id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error al traer la persona con el id " + req.params.id
            });
        });
};

// --------- Find public and update ----------
exports.ingresoSuspendido_update = (req, res) => {
    // validate request
    if (!req.body.documentoIdentidad || !req.body.email) {
        return res.status(400).send({
            message: "Please enter employee phone and email"
        });
    }
    IngresoSuspendido.findOneAndUpdate(
        req.params.id,
        {
            $set: req.body
        },
        {new: true}
    )
        .then(data => {
            if (!data) {
                return res.status(400).send({
                    message: "Persona no encontrada con el id " + req.params.id
                });
            }
            res.send({
                data: data
            });
        })
        .catch(err => {
            if (err.kind === "ObjectId") {
                return res.status(404).send({
                    message: "Persona no encontrada con el id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error actualizando la persona con el id " + req.params.id
            });
        });
}

// delete a public with the specified id.
exports.ingresoSuspendido_delete = (req, res) => {
    IngresoSuspendido.findOneAndDelete(req.params.id)
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "Persona no encontrada con el id " + req.params.id
                });
            }
            res.send({
                message: "Persona eliminada exitosamente"
            });
        })
        .catch(err => {
            if (err.kind === "ObjectId" || err.name === "NotFound") {
                return res.status(404).send({
                    message: "Persona no encontrada con el id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "No se puede eliminar el usuario con el id " + req.params.id
            });
        });
};


// --------- find a funcionario by documento Identidad -------------
exports.suspendido_ing = async (req, res) => {
    const {documentoIdentidad} = req.body;
    await IngresoSuspendido.findOne({documentoIdentidad}).select({
        _id: 0,
        horaEntrada: 0,
        createdAt: 0,
        updatedAt: 0,
        ficha: 0,
        programaDeFormacion: 0
    })
        .then(data => {
            if (!data) {
                return res.status(404).send(`Persona no encontrada con el documento de identidad ${documentoIdentidad}`);
            }
            res.send(data)
        })
        .catch(err => {
            return res.status(500).send(`Error al traer la persona con el documento ${documentoIdentidad}`);
        });
};

