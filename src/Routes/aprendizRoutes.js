const express = require('express');
const router = express.Router();

// --------- Import the controllers ----------
const aprendiz_controller = require('../Controllers/aprendizController');

router.route("/list").get(aprendiz_controller.all_aprendices);

router.route("/details/:id").get(aprendiz_controller.aprendiz_details);

router.route("/ingreso").post(aprendiz_controller.aprendiz_ing);

router.route("/salida").post(aprendiz_controller.aprendiz_sal);

router.route("/create").post(aprendiz_controller.aprendiz_create);

router.route("/update/:id").put(aprendiz_controller.aprendiz_update);

router.route("/delete/:id").delete(aprendiz_controller.aprendiz_delete);


// ------ Count registros ---------
router.route('/countDocuments').get(aprendiz_controller.countDocuments)


// ------ 
router.route('/countMeses').get(aprendiz_controller.ingresoMeses)

module.exports = router;