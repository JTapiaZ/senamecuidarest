const express = require('express');
const router = express.Router();

// --------- Import the controllers ----------
const visitante_controller = require('../Controllers/visitanteController');
const { checkRole } = require('../Utils/Auth');

router.route("/list").get(checkRole, visitante_controller.all_visitantes);

router.route("/details/:id").get(checkRole, visitante_controller.visitante_details);

router.route("/ingreso").post(visitante_controller.visitante_ing);
router.route("/ingresoPrueba").post(visitante_controller.visitante_ingPrueba);


router.route("/salida").post(visitante_controller.visitante_sal);

router.route("/create").post(visitante_controller.visitante_create);

router.route("/createNE").post(visitante_controller.visitante_createNE);

router.route("/update/:id").put(checkRole, visitante_controller.visitante_update);

router.route("/delete/:id").delete(checkRole, visitante_controller.visitante_delete);


// ------ Count registros ---------
router.route('/countDocuments').get(visitante_controller.countDocuments)

// ------
router.route('/countMeses').get(visitante_controller.ingresoMeses)


// ------ Visitantes * genero -------- 
router.route('/countMasc').get(visitante_controller.visitantesMasculino);
router.route('/countFem').get(visitante_controller.visitantesFemenino);

// ------ Visitantes Transporte -------
router.route('/countTransPb').get(visitante_controller.visitantesTransPublico);
router.route('/countTransParticular').get(visitante_controller.visitantesTransParticular);
router.route('/countBicicleta').get(visitante_controller.visitantesBicicleta);
router.route('/countCaminando').get(visitante_controller.visitantesCaminando);


module.exports = router;
