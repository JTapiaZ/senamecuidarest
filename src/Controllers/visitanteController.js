const Visitante = require('../Models/tbl_visitante');
const {emailSend} = require('./mailController');


exports.visitante_create = function (req, res) {
    // ------------------ Validate Request ----------------- //
    if (!req.body.nombre || !req.body.email || !req.body.documentoIdentidad || !req.body.telefono || !req.body.direccionResidencia || !req.body.eps ){
        return res.status(400).send("¡Porfavor rellene todos los campos solicitados!");
    }


// Create a public
let visitante = new Visitante(
    ({ nombre, email, documentoIdentidad, celular,telefono, direccionResidencia, eps} = req.body)
);

// ------------- save public in the database -----------
visitante
    .save()
    .then(data => {
        res.send("¡Su registro se ha guardado exitosamente!");
    })
    .then(dat => {
      emailSend(req.body);
    
      Visitante.findOneAndUpdate({ email: req.body.email},(err, usuario) => {
          if (err) return res.status(500).send({ message: 'err' })
      })
      return res.send("Ok")
  })
    .catch(err => {
        res.status(500).send({
            success: false,
            message: 
                err.message || "Ocurrio un error al crear el registro",
        });
        console.log(err);
    })
}

// ------------- retrieve and return all public ------------------
exports.all_visitantes = (req, res) => {
    Visitante.find()
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
exports.visitante_details = (req, res) => {
    Visitante.findById(req.params.id)
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
exports.visitante_update = (req, res) => {
    // validate request
    if (!req.body.documentoIdentidad || !req.body.email) {
      return res.status(400).send({
        message: "Please enter employee phone and email"
      });
    }
  Visitante.findOneAndUpdate(
    req.params.id,
    {
        $set: req.body
    },
    {new: true}
)
    .then(data => {
        if (!data){
            return res.status(400).send({
                message: "Persona no encontrada con el id " + req.params.id
            });
        }
        res.send({
            data: data
        });
    })
    .catch( err => {
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
exports.visitante_delete = (req, res) => {
    Visitante.findOneAndDelete(req.params.id)
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
exports.visitante_ing = async (req, res) => {
  const {documentoIdentidad} = req.body;
  await Visitante.findOne({documentoIdentidad}).select({_id:0,horaEntrada:0})
    .then(data => {
      if (!data) {
        return res.status(404).send(`Persona no encontrada con el documento de identidad ${documentoIdentidad}`);
      }
      // res.send(`Bienvenido ${data.nombre} con EPS ${data.eps}`);      
      res.send(data)
    })
    .catch(err => {
      return res.status(500).send(`Error al traer la persona con el documento ${documentoIdentidad}`);
    });
};


// --------- find a funcionario by documento Identidad -------------
exports.visitante_sal = async (req, res) => {
  const {documentoIdentidad} = req.body;
  await Visitante.findOne({documentoIdentidad}).select({_id:0,horaEntrada:0})
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
  Visitante.estimatedDocumentCount({}, function(err, result) {
    if(err){
      console.log(err)
    } else {
      res.send({result})
    }
  })
}


exports.ingresoMeses = (req, res) => {
  Visitante.aggregate([
    { "$group": {
      "_id": { "$month": { "$toDate": "$createdAt" }},
      "total": { "$sum":1 }
    }}
  ], function(err, result) {
    if(err){
      console.log(err);
    } else {
      res.send({result});
    }
  })
}


