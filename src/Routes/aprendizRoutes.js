const express = require('express');
const router = express.Router();

// --------- Import the controllers ----------
const aprendiz_controller = require('../Controllers/aprendizController');
const { userAuth, checkRole } = require("../utils/Auth");


router.route("/list").get(checkRole, aprendiz_controller.all_aprendices);

router.route("/details/:id").get(checkRole,aprendiz_controller.aprendiz_details);

router.route("/ingreso").post(aprendiz_controller.aprendiz_ing);

router.route("/salida").post(aprendiz_controller.aprendiz_sal);

router.route("/create").post(aprendiz_controller.aprendiz_create);

router.route("/createNE").post(aprendiz_controller.aprendiz_createNE);

router.route("/update/:id").put(checkRole ,aprendiz_controller.aprendiz_update);

router.route("/delete/:id").delete(checkRole, aprendiz_controller.aprendiz_delete);


// ------ Count registros ---------
router.route('/countDocuments').get(aprendiz_controller.countDocuments)


// ------ 
router.route('/countMeses').get(aprendiz_controller.ingresoMeses)

module.exports = router;
