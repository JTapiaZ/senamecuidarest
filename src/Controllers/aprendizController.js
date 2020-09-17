const Aprendiz = require('../Models/tbl_aprendiz');
const {emailSend} = require('./mailController');
const {emailEnfermeroSendNE} = require('./mailRegistroNEController');
var ip = require('ip');
var geoip = require('geoip-lite');

exports.aprendiz_create = function (req, res) {
    // ------------------ Validate Request ----------------- //
    if (!req.body.nombre || !req.body.sexo || !req.body.email || !req.body.documentoIdentidad || !req.body.telefono || !req.body.direccionResidencia || !req.body.eps || !req.body.transporte || !req.body.jornada ) {
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
    let aprendiz = new Aprendiz(
        (
            {
                nombre: body.nombre,
                sexo: body.sexo,
                email: body.email,
                documentoIdentidad: body.documentoIdentidad,
                celular: body.celular,
                telefono: body.telefono,
                direccionResidencia: body.direccionResidencia,
                eps: body.eps,
                ficha: body.ficha,
                programaDeFormacion: body.programaDeFormacion,
                transporte: body.transporte,
                jornada: body.jornada,
                sintomas

            }
        )
    );


// ------------- save public in the database -----------

    aprendiz.save()
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

exports.aprendiz_createNE = function (req, res) {
    if (!req.body.nombre || !req.body.sexo || !req.body.email || !req.body.documentoIdentidad || !req.body.telefono || !req.body.direccionResidencia || !req.body.eps || !req.body.transporte || !req.body.jornada ) {
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
    let aprendiz = new Aprendiz(
        (
            {
                nombre: body.nombre,
                sexo: body.sexo,
                email: body.email,
                documentoIdentidad: body.documentoIdentidad,
                celular: body.celular,
                telefono: body.telefono,
                direccionResidencia: body.direccionResidencia,
                eps: body.eps,
                ficha: body.ficha,
                programaDeFormacion: body.programaDeFormacion,
                transporte: body.transporte,
                jornada: body.jornada,
                sintomas

            }
        )
    );


// ------------- save public in the database -----------

    aprendiz
        .save()
        .then(data => {
            res.send("¡Su registro se ha guardado exitosamente!");
        })
        .then(dat => {
            emailSend(body);
            emailEnfermeroSendNE(req.body)

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
exports.all_aprendices = (req, res) => {

    const ClienteIP = ip.address()

    const Cosasusuario = geoip.lookup(ClienteIP);

    let geo = geoip.lookup(ClienteIP);
    console.log(`su ip es ${ClienteIP}`)
    console.log(geo)

    Aprendiz.find()
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
exports.aprendiz_details = (req, res) => {
    Aprendiz.findById(req.params.id)
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
exports.aprendiz_update = (req, res) => {
    // validate request
    if (!req.body.documentoIdentidad || !req.body.email) {
        return res.status(400).send({
            message: "Please enter employee phone and email"
        });
    }
    Aprendiz.findOneAndUpdate(
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
exports.aprendiz_delete = (req, res) => {
    Aprendiz.findOneAndDelete(req.params.id)
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
exports.aprendiz_ing = async (req, res) => {
    const {documentoIdentidad} = req.body;
    await Aprendiz.findOne({documentoIdentidad}).select({
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


// --------- find a funcionario by documento Identidad -------------
exports.aprendiz_sal = async (req, res) => {
    const {documentoIdentidad} = req.body;
    await Aprendiz.findOne({documentoIdentidad}).select({_id: 0, horaEntrada: 0})
        .then(data => {
            if (!data) {
                return res.status(404).send(`Persona no se encuentra de alta ${documentoIdentidad}`);
            }
            res.send(data)
        })
        .catch(err => {
            return res.status(500).send(`Error al traer la persona con el documento ${documentoIdentidad}`);
        });
};


// ------ Count registros ---------
exports.countDocuments = (req, res) => {
    Aprendiz.estimatedDocumentCount({}, function (err, result) {
        if (err) {
            console.log(err)
        } else {
            res.send({result})
        }
    })
}

exports.ingresoMeses = (req, res) => {
    Aprendiz.aggregate([
        {
            "$group": {
                "_id": {"$month": {"$toDate": "$createdAt"}},
                "total": {"$sum": 1}
            }
        }
    ], function (err, result) {
        if (err) {
            console.log(err);
        } else {
            res.send({result});
        }
    })
}


exports.aprendicesMasculino = (req, res) => {
    Aprendiz.countDocuments(
      { $or: 
        [
            {'sexo':"Masculino"},
        ] 
    }, function(err, result) {
        if (err) {
          res.send(err);
        } else {
          res.send({result});
        }
      }
    );
  };


  exports.aprendicesFemenino = (req, res) => {
    Aprendiz.countDocuments(
      { $or: 
        [
            {'sexo':"Femenino"},
        ] 
    }, function(err, result) {
        if (err) {
          res.send(err);
        } else {
          res.send({result});
        }
      }
    );
  };


  exports.aprendicesTransPublico = (req, res) => {
    Aprendiz.countDocuments(
      { $or: 
        [
            {'transporte':"Transporte Público"},
        ] 
    }, function(err, result) {
        if (err) {
          res.send(err);
        } else {
          res.send({result});
        }
      }
    );
  };

  exports.aprendicesTransParticular = (req, res) => {
    Aprendiz.countDocuments(
      { $or: 
        [
            {'transporte':"Carro particular"},
        ] 
    }, function(err, result) {
        if (err) {
          res.send(err);
        } else {
          res.send({result});
        }
      }
    );
  };


  exports.aprendicesBicicleta = (req, res) => {
    Aprendiz.countDocuments(
      { $or: 
        [
            {'transporte':"Bicicleta"},
        ] 
    }, function(err, result) {
        if (err) {
          res.send(err);
        } else {
          res.send({result});
        }
      }
    );
  };


  exports.aprendicesCaminando = (req, res) => {
    Aprendiz.countDocuments(
      { $or: 
        [
            {'transporte':"Caminando"},
        ] 
    }, function(err, result) {
        if (err) {
          res.send(err);
        } else {
          res.send({result});
        }
      }
    );
  };