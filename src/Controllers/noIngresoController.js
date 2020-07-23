const NoIngresoDia = require('../Models/tbl_noIngreso')
const {emailEnfermeroSend} = require('./mailEnfermeroController');
const {emailnoIngresoSend} = require('./mailNoIngresoController');

exports.noIngreso_create = function (req, res) {
    // ------------------ Validate Request ----------------- //
    if (!req.body.nombre || !req.body.email || !req.body.documentoIdentidad || !req.body.telefono || !req.body.direccionResidencia || !req.body.eps ){
        return res.status(400).send("¡Por favor rellene todos los campos solicitados!");
    }


// Create a ingreso
let noIngresoDia = new NoIngresoDia(
    ({ nombre, email, documentoIdentidad, celular,telefono, direccionResidencia, eps} = req.body)
);

// console.log(estado);
// ------------- save ingreso in the database -----------
noIngresoDia
    .save()
    .then(data => {
        res.send("¡Su registro se ha guardado exitosamente!");
    })
    .then(dat => {
      emailEnfermeroSend(req.body),
      emailnoIngresoSend(req.body)
    
      Visitante.findOneAndUpdate({ email: req.body.email},(err, usuario) => {
          if (err) return res.status(500).send({ message: 'err' })
      })
    })
    .catch(err => {
        res.status(500).send({
            message: 
                err.message || "Ocurrio un error al crear el registro",
        });
        console.log(err);
    })
}

// ------------- retrieve and return all ingresos ------------------
exports.all_noIngresoDia = (req, res) => {
    NoIngresoDia.find()
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


// --------- find a ingreso by id -------------
exports.noIngresoDia_details = (req, res) => {
    NoIngresoDia.findById(req.params.id)
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

// --------- Find ingreso and update ----------
exports.noIngresoDia_update = (req, res) => {
    // validate request
    if (!req.body.documentoIdentidad || !req.body.email) {
      return res.status(400).send({
        message: "Please enter employee phone and email"
      });
    }
    NoIngresoDia.findOneAndUpdate(
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

// delete a ingreso with the specified id.
exports.noIngresodia_delete = async (req, res) => {
      const {documentoIdentidad} = req.body;
      await NoIngresoDia.findOneAndRemove({documentoIdentidad}).select({_id:0,horaEntrada:0})      
      .then(data => {
        if (!data) {
          return res.status(404).send({
            message: "Persona no encontrada con el documento " + req.body.documentoIdentidad
          });
        }
        res.send(data);
      })
      .catch(err => {
        if (err.kind === "ObjectId" || err.name === "NotFound") {
          return res.status(404).send({
            message: "Persona no encontrada con el documento " + req.body.documentoIdentidad
          });
        }
        return res.status(500).send({
          message: "No se puede eliminar el usuario con el documento " + req.body.documentoIdentidad
        });
      });
  };


// ------ Count registros ---------
exports.countDocuments = (req, res) => {
  NoIngresoDia.estimatedDocumentCount({}, function(err, result) {
    if(err){
      console.log(err)
    } else {
      res.send({result})
    }
  })
}
