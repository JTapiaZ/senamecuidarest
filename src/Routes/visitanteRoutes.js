const express = require('express');
const router = express.Router();

// --------- Import the controllers ----------
const visitante_controller = require('../Controllers/visitanteController');
const { checkRole } = require("../utils/Auth");

router.route("/list").get(checkRole, visitante_controller.all_visitantes);

router.route("/details/:id").get(checkRole, visitante_controller.visitante_details);

router.route("/ingreso").post(visitante_controller.visitante_ing);

router.route("/salida").post(visitante_controller.visitante_sal);

router.route("/create").post(visitante_controller.visitante_create);

router.route("/createNE").post(visitante_controller.visitante_createNE);

router.route("/update/:id").put(checkRole, visitante_controller.visitante_update);

router.route("/delete/:id").delete(checkRole, visitante_controller.visitante_delete);


// ------ Count registros ---------
router.route('/countDocuments').get(visitante_controller.countDocuments)

// ------
router.route('/countMeses').get(visitante_controller.ingresoMeses)


module.exports = router;
