const express = require('express');
const router = express.Router();

// --------- Import the controllers ----------
const aprendiz_controller = require('../Controllers/aprendizController');
const { userAuth, checkRole } = require('../Utils/Auth');


router.route("/list").get(checkRole, aprendiz_controller.all_aprendices);
router.route("/details/:id").get(checkRole,aprendiz_controller.aprendiz_details);
router.route("/ingreso").post(aprendiz_controller.aprendiz_ing);
router.route("/salida").post(aprendiz_controller.aprendiz_sal);
router.route("/create").post(aprendiz_controller.aprendiz_create);
router.route("/createNE").post(aprendiz_controller.aprendiz_createNE);
router.route("/update/:id").put(checkRole ,aprendiz_controller.aprendiz_update);
router.route("/delete/:id").delete(checkRole, aprendiz_controller.aprendiz_delete);


// ------ Count registros ---------
router.route('/countDocuments').get(aprendiz_controller.countDocuments);


// ------ Count -----------------
router.route('/countMeses').get(aprendiz_controller.ingresoMeses);


// ------ Aprendices * genero -------- 
router.route('/countMasc').get(aprendiz_controller.aprendicesMasculino);
router.route('/countFem').get(aprendiz_controller.aprendicesFemenino);

// ------ Aprendices Transporte -------
router.route('/countTransPb').get(aprendiz_controller.aprendicesTransPublico);
router.route('/countTransParticular').get(aprendiz_controller.aprendicesTransParticular);
router.route('/countBicicleta').get(aprendiz_controller.aprendicesBicicleta);
router.route('/countCaminando').get(aprendiz_controller.aprendicesCaminando);

module.exports = router;
