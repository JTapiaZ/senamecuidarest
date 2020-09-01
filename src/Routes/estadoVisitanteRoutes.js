const express = require('express');
const router = express.Router();

// --------- Import the controllers ----------
const estadoVisitante_controller = require('../Controllers/estadoVisitanteController');
const { userAuth, checkRole } = require('../Utils/Auth');


router.route("/list").get(checkRole, estadoVisitante_controller.all_estados);

router.route("/details/:id").get(checkRole, estadoVisitante_controller.estado_details);

router.route("/create").post(estadoVisitante_controller.estado_create);

router.route("/update/:id").put(estadoVisitante_controller.estado_update);

router.route("/delete").post(estadoVisitante_controller.estado_delete);


// ------ Count registros ---------
router.route('/countDocuments').get(estadoVisitante_controller.countDocuments)

// ------ ING ---------
router.route('/ing').post(estadoVisitante_controller.ing)

module.exports = router;