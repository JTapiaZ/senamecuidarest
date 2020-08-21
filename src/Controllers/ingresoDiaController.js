const IngresoDia = require('../Models/tbl_ingresodia')


exports.ingresoDia_create = function (req, res) {
    // ------------------ Validate Request ----------------- //
    if (!req.body.nombre || !req.body.email || !req.body.documentoIdentidad || !req.body.telefono || !req.body.direccionResidencia || !req.body.eps || !req.body.temperatura ){
        return res.status(400).send("¡Por favor rellene todos los campos solicitados!");
    }


// Create a ingreso
let ingresoDia = new IngresoDia(
    ({ nombre, email, documentoIdentidad, celular,telefono, direccionResidencia, eps, temperatura} = req.body)
);

// let estado = new Estado(
//     ({ nombre, email, documentoIdentidad, celular,telefono, direccionResidencia, eps} = req.body)
// );

// console.log(ingresoDia);
// ------------- save ingreso in the database -----------
ingresoDia
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
exports.all_ingresos = (req, res) => {
    IngresoDia.find()
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
exports.ingresoDia_details = (req, res) => {
    IngresoDia.findById(req.params.id)
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
exports.ingresoDia_update = (req, res) => {
    // validate request
    if (!req.body.documentoIdentidad || !req.body.email) {
      return res.status(400).send({
        message: "Please enter employee phone and email"
      });
    }
    IngresoDia.findOneAndUpdate(
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
exports.ingresoDia_delete = (req, res) => {
    IngresoDia.findOneAndDelete(req.params.id)
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



