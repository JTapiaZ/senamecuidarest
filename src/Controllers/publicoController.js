const Publico = require('../Models/tbl_publico');
const Mail = require('../Controllers/mailController');

exports.publico_create = function (req, res) {
    // ------------------ Validate Request ----------------- //
    if (!req.body.documentoIdentidad || !req.body.nombre || !req.body.apellido || !req.body.dependencia || !req.body.email || !req.body.celular || !req.body.telefono || !req.body.direccionResidencia || !req.body.eps || !req.body.torre){
        return res.status(400).send({
            success: false,
            message: "Porfavor rellene todos los campos solicitados"
        });
    }


// Create a public
let publico = new Publico(
    ({ documentoIdentidad, nombre, apellido, dependencia, email, celular, telefono, direccionResidencia, eps, torre} = req.body)
);

// ------------- save public in the database -----------
publico
    .save()
    .then(data => {
        res.send({
            success: true,
            message: "Su registro se ha guardado exitosamente",
            data: data
        });
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
exports.all_publico = (req, res) => {
    Publico.find()
        .then(data => {
            var message = "";
            if (data === undefined || data.length == 0) message = "Personas no encontradas!";
            else message = "Publico recibido";
            res.send({
                success: true,
                message: message,
                data: data
            });
            })
            .catch(err => {
            res.status(500).send({
                success: false,
                message: err.message || "Ocurrio un error al traer los registros"
            });
        
    });
};


// --------- find a public by id -------------
exports.publico_details = (req, res) => {
    Publico.findById(req.params.id)
      .then(data => {
        if (!data) {
          return res.status(404).send({
            success: false,
            message: "Persona no encontrada con el id" + req.params.id
          });
        }
        res.send({
          success: true,
          message: "Persona encontrada",
          data: data
        });
      })
      .catch(err => {
        if (err.kind === "ObjectId") {
          return res.status(404).send({
            success: false,
            message: "Persona no encontrada con el id " + req.params.id
          });
        }
        return res.status(500).send({
          success: false,
          message: "Error al traer la persona con el id " + req.params.id
        });
      });
  };

// --------- Find public and update ----------
exports.employee_update = (req, res) => {
    // validate request
    if (!req.body.phone || !req.body.email) {
      return res.status(400).send({
        success: false,
        message: "Please enter employee phone and email"
      });
    }
Publico.findOneAndUpdate(
    req.params.id,
    {
        $set: req.body
    },
    {new: true}
)
    .then(data => {
        if (!data){
            return res.status(400).send({
                success: false,
                message: "Persona no encontrada con el id " + req.params.id
            });
        }
        res.send({
            success: true,
            data: data
        });
    })
    .catch( err => {
        if (err.kind === "ObjectId") {
            return res.status(404).send({
              success: false,
              message: "Persona no encontrada con el id " + req.params.id
            });
          }
          return res.status(500).send({
            success: false,
            message: "Error actualizando la persona con el id " + req.params.id
          });
    });
}

// delete a public with the specified id.
exports.public_delete = (req, res) => {
    Publico.findOneAndDelete(req.params.id)
      .then(data => {
        if (!data) {
          return res.status(404).send({
            success: false,
            message: "Persona no encontrada con el id " + req.params.id
          });
        }
        res.send({
          success: true,
          message: "Persona eliminada exitosamente"
        });
      })
      .catch(err => {
        if (err.kind === "ObjectId" || err.name === "NotFound") {
          return res.status(404).send({
            success: false,
            message: "Persona no encontrada con el id " + req.params.id
          });
        }
        return res.status(500).send({
          success: false,
          message: "No se puede eliminar el usuario con el id " + req.params.id
        });
      });
  };