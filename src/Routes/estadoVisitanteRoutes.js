const express = require('express');
const router = express.Router();

// --------- Import the controllers ----------
const estadoVisitante_controller = require('../Controllers/estadoVisitanteController');

router.route("/list").get(estadoVisitante_controller.all_estados);

router.route("/details/:id").get(estadoVisitante_controller.estado_details);

router.route("/create").post(estadoVisitante_controller.estado_create);

router.route("/update/:id").put(estadoVisitante_controller.estado_update);

router.route("/delete").post(estadoVisitante_controller.estado_delete);


// ------ Count registros ---------
router.route('/countDocuments').get(estadoVisitante_controller.countDocuments)


module.exports = router;