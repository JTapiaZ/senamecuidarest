const ReporteSaludDia = require('../Models/tbl_reporteSaludDia');
const ReporteSalud = require('../Models/tbl_reporteSalud');
const IngresoSuspendido = require('../Models/tbl_ingresoSuspendido');
const Visitante = require('../Models/tbl_visitante')
const {emailSend} = require('./mailSintomasController');
const {emailEnfermeroSendNE} = require('./mailRegistroNEController');


exports.reporteSaludDia_create = function (req, res) {
    // ------------------ Validate Request ----------------- //
    // if (!req.body.nombre || !req.body.email || !req.body.documentoIdentidad || !req.body.telefono || !req.body.direccionResidencia || !req.body.eps) {
    //     return res.status(400).send("¡Por favor rellene todos los campos solicitados!");
    // }

    const {newData} = req.body
    const valores = newData.sintomas

    // console.log();
    let sintomas = {
        fiebre: valores[0],
        tos: valores[1],
        dolorTragar: valores[2],
        malestarGeneral: valores[3],
        dificultadRespirar: valores[4],
        gripa: valores[5],
        diarrea: valores[6],
        contactoSospechoso: valores[7],
        dolorArticular: valores[8]
    }
    
// Create a public
    let reporteSaludDia = new ReporteSaludDia(
        (
            {
                nombre: newData.nombre,
                sexo: newData.sexo,
                cargo: newData.cargo,
                email: newData.email,
                documentoIdentidad: newData.documentoIdentidad,
                celular: newData.celular,
                telefono: newData.telefono,
                direccionResidencia: newData.direccionResidencia,
                eps: newData.eps,
                ficha: newData.ficha,
                programaDeFormacion: newData.programaDeFormacion,
                transporte: newData.transporte,
                jornada: newData.jornada,
                sintomas,

            }
        )
    );
    let reporteSalud = new ReporteSalud(
        (
            {
                nombre: newData.nombre,
                sexo: newData.sexo,
                cargo: newData.cargo,
                email: newData.email,
                documentoIdentidad: newData.documentoIdentidad,
                celular: newData.celular,
                telefono: newData.telefono,
                direccionResidencia: newData.direccionResidencia,
                eps: newData.eps,
                ficha: newData.ficha,
                programaDeFormacion: newData.programaDeFormacion,
                transporte: newData.transporte,
                jornada: newData.jornada,
                sintomas,

            }
        )
    );


// ------------- save public in the database -----------
    
        
    reporteSaludDia
        .save()
        .then(data => {
            // res.send("¡Su registro se ha guardado exitosamente!");
            reporteSalud.save()
            .then(data => {
                res.send({data})
            })
            .catch(err => {
                res.status(500).send({
                message: 
                    err.message || "Ocurrio un error al crear el registro",
                });
            console.log(err);
            })
        })
        .catch(err => {
            if (err.name === 'MongoError' && err.code === 11000) {
                // Duplicate username
                console.log(err);
                return res.status(409).send(err.keyValue);
            }
            console.log(err+ 'Dia')
        })
}

exports.reporteSaludDia_createNE = function (req, res) {
    // ------------------ Validate Request ----------------- //
    // if (!req.body.nombre || !req.body.email || !req.body.documentoIdentidad || !req.body.telefono || !req.body.direccionResidencia || !req.body.eps) {
    //     return res.status(400).send("¡Por favor rellene todos los campos solicitados!");
    // }

        const {newData} = req.body
        const valores = newData.sintomas
    
        // console.log();
        let sintomas = {
            fiebre: valores[0],
            tos: valores[1],
            dolorTragar: valores[2],
            malestarGeneral: valores[3],
            dificultadRespirar: valores[4],
            gripa: valores[5],
            diarrea: valores[6],
            contactoSospechoso: valores[7],
            dolorArticular: valores[8]
        }
        
    // Create a public
    let reporteSaludDia = new ReporteSaludDia(
        (
            {
                nombre: newData.nombre,
                sexo: newData.sexo,
                cargo: newData.cargo,
                email: newData.email,
                documentoIdentidad: newData.documentoIdentidad,
                celular: newData.celular,
                telefono: newData.telefono,
                direccionResidencia: newData.direccionResidencia,
                eps: newData.eps,
                ficha: newData.ficha,
                programaDeFormacion: newData.programaDeFormacion,
                transporte: newData.transporte,
                jornada: newData.jornada,
                sintomas,

            }
        )
    );
    let reporteSalud = new ReporteSalud(
        (
            {
                nombre: newData.nombre,
                sexo: newData.sexo,
                cargo: newData.cargo,
                email: newData.email,
                documentoIdentidad: newData.documentoIdentidad,
                celular: newData.celular,
                telefono: newData.telefono,
                direccionResidencia: newData.direccionResidencia,
                eps: newData.eps,
                ficha: newData.ficha,
                programaDeFormacion: newData.programaDeFormacion,
                transporte: newData.transporte,
                jornada: newData.jornada,
                sintomas,

            }
        )
    );
        let ingresoSuspendido = new IngresoSuspendido(
            (
                {
                    nombre: newData.nombre,
                    sexo: newData.sexo,
                    cargo: newData.cargo,
                    email: newData.email,
                    documentoIdentidad: newData.documentoIdentidad,
                    celular: newData.celular,
                    telefono: newData.telefono,
                    direccionResidencia: newData.direccionResidencia,
                    eps: newData.eps,
                    ficha: newData.ficha,
                    programaDeFormacion: newData.programaDeFormacion,
                    transporte: newData.transporte,
                    jornada: newData.jornada,
                    sintomas,
    
                }
            )
        );
    
    
    // ------------- save public in the database -----------
        
            
        reporteSaludDia
            .save()
            .then(data => {
                // res.send("¡Su registro se ha guardado exitosamente!");
                reporteSalud.save()
                .then(data => {
                    console.log({data});
                    ingresoSuspendido.save()
                    .then(data => {
                        res.send({data});
                    })
                    .catch(err => {
                        res.status(500).send({
                        message: 
                            err.message || "Ocurrio un error al crear el registro",
                        });
                    console.log(err);
                    })
                })
                .catch(err => {
                    res.status(500).send({
                    message: 
                        err.message || "Ocurrio un error al crear el registro",
                    });
                console.log(err);
                })
            })
            .then(dat => {
                emailSend(newData);
                emailEnfermeroSendNE(newData)
    
                Visitante.findOneAndUpdate({email: newData.email}, (err, usuario) => {
                    if (err) return res.status(500).send({message: 'err'})
                })
                console.log("OK");
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
exports.all_reporteSaludDia = (req, res) => {
    ReporteSaludDia.find()
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
exports.reporteSaludDia_details = (req, res) => {
    ReporteSaludDia.findById(req.params.id)
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
exports.reporteSaludDia_update = (req, res) => {
    // validate request
    if (!req.body.documentoIdentidad || !req.body.email) {
        return res.status(400).send({
            message: "Please enter employee phone and email"
        });
    }
    ReporteSaludDia.findOneAndUpdate(
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
exports.reporteSaludDia_delete = (req, res) => {
    ReporteSaludDia.findOneAndDelete(req.params.id)
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


// // --------- find a funcionario by documento Identidad -------------
exports.ing = async (req, res) => {
    const {documentoIdentidad} = req.body;
    await ReporteSaludDia.findOne({documentoIdentidad}).select({
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
