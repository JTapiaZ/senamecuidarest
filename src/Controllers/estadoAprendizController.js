const Estado = require('../Models/tbl_estadoAprendiz')
const IngresoDia = require('../Models/tbl_ingresodia')


exports.estado_create = function (req, res) {
    // ------------------ Validate Request ----------------- //
    if (!req.body.nombre || !req.body.email || !req.body.documentoIdentidad || !req.body.telefono || !req.body.direccionResidencia || !req.body.eps ){
        return res.status(400).send("¡Por favor rellene todos los campos solicitados!");
    }


// Create a ingreso
let estado = new Estado(
    ({ nombre, email, documentoIdentidad, celular,telefono, direccionResidencia, eps} = req.body)
);
let ingresoDia = new IngresoDia(
    ({ nombre, email, documentoIdentidad, celular,telefono, direccionResidencia, eps} = req.body)
);

// console.log(estado);
// ------------- save ingreso in the database -----------
estado
    .save()
    .then(data => {
        // res.send("¡Su registro se ha guardado exitosamente!");
        ingresoDia.save()
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
        res.status(500).send({
            message: 
                err.message || "Ocurrio un error al crear el registro",
        });
        console.log(err);
    })
}

// ------------- retrieve and return all ingresos ------------------
exports.all_estados = (req, res) => {
    Estado.find()
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
exports.estado_details = (req, res) => {
    Estado.findById(req.params.id)
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
exports.estado_update = (req, res) => {
    // validate request
    if (!req.body.documentoIdentidad || !req.body.email) {
      return res.status(400).send({
        message: "Please enter employee phone and email"
      });
    }
    Estado.findOneAndUpdate(
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
exports.estado_delete = async (req, res) => {
      const {documentoIdentidad} = req.body;
      await Estado.findOneAndRemove({documentoIdentidad}).select({_id:0,horaEntrada:0})      
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
  Estado.estimatedDocumentCount({}, function(err, result) {
    if(err){
      console.log(err)
    } else {
      res.send({result})
    }
  })
}

exports.ing = async (req, res) => {
  const {documentoIdentidad} = req.body;
  await Estado.findOne({documentoIdentidad}).select({
      _id: 0,
      horaEntrada: 0,
      createdAt: 0,
      updatedAt: 0,
      ficha: 0,
      programaDeFormacion: 0,
      __v: 0
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

exports.estadoAMasculino = (req, res) => {
  Estado.countDocuments(
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


exports.estadoAFemenino = (req, res) => {
  Estado.countDocuments(
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


exports.estadoATransPublico = (req, res) => {
  Estado.countDocuments(
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

exports.estadoATransParticular = (req, res) => {
  Estado.countDocuments(
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


exports.estadoABicicleta = (req, res) => {
  Estado.countDocuments(
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


exports.estadoACaminando = (req, res) => {
  Estado.countDocuments(
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