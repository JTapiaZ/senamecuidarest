const express = require('express');
const router = express.Router();

// --------- Import the controllers ----------
const funcionario_controller = require('../Controllers/funcionarioController');
const { checkRole } = require('../Utils/Auth');

router.route("/list").get(checkRole, funcionario_controller.all_funcionarios);

router.route("/details/:id").get(checkRole, funcionario_controller.funcionario_details);

router.route("/ingreso").post(funcionario_controller.funcionario_ing);

router.route("/salida").post(funcionario_controller.funcionario_sal);

router.route("/create").post(funcionario_controller.funcionario_create);

router.route("/createNE").post(funcionario_controller.funcionario_createNE);

router.route("/update/:id").put(checkRole, funcionario_controller.funcionario_update);

router.route("/delete/:id").delete(checkRole, funcionario_controller.funcionario_delete);


// ------ Count registros ---------
router.route('/countDocuments').get(funcionario_controller.countDocuments)


// ------ 
router.route('/countMeses').get(funcionario_controller.ingresoMeses)

module.exports = router;
