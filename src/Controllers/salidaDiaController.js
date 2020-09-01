const SalidaDia = require('../Models/tbl_salidaDia');


exports.salidaDia_create = function (req, res) {
    // ------------------ Validate Request ----------------- //
    if (!req.body.datar.nombre || !req.body.datar.email || !req.body.datar.documentoIdentidad || !req.body.datar.telefono || !req.body.datar.direccionResidencia || !req.body.datar.eps  ){
        return res.status(400).send("¡Por favor rellene todos los campos solicitados!");
    }

    

// Create a ingreso
let salidaDia = new SalidaDia(
    ({ nombre, email, documentoIdentidad, celular,telefono, direccionResidencia, eps, temperatura} = req.body.datar)
);


// ------------- save ingreso in the database -----------
salidaDia
    .save()
    .then(data => {
        res.send("¡Su registro se ha guardado exitosamente!");
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
exports.all_salidas = (req, res) => {
    SalidaDia.find()
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
exports.salidaDia_details = (req, res) => {
    SalidaDia.findById(req.params.id)
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
exports.salidaDia_update = (req, res) => {
    // validate request
    if (!req.body.documentoIdentidad || !req.body.email) {
      return res.status(400).send({
        message: "Please enter employee phone and email"
      });
    }
    SalidaDia.findOneAndUpdate(
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
exports.salidaDia_delete = (req, res) => {
    SalidaDia.findOneAndDelete(req.params.id)
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



