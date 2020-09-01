const express = require('express');
const router = express.Router();

// --------- Import the controllers ----------
const estadoFuncionario_controller = require('../Controllers/estadoFuncionarioController');
const { userAuth, checkRole } = require('../Utils/Auth');


router.route("/list").get(checkRole, estadoFuncionario_controller.all_estados);

router.route("/details/:id").get(checkRole, estadoFuncionario_controller.estado_details);

router.route("/create").post(estadoFuncionario_controller.estado_create);

router.route("/update/:id").put(estadoFuncionario_controller.estado_update);

router.route("/delete").post(estadoFuncionario_controller.estado_delete);


// ------ Count registros ---------
router.route('/countDocuments').get(estadoFuncionario_controller.countDocuments)

// ------ ING ---------
router.route('/ing').post(estadoFuncionario_controller.ing)

module.exports = router;