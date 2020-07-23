const express = require('express');
const router = express.Router();

// --------- Import the controllers ----------
const estadoFuncionario_controller = require('../Controllers/estadoFuncionarioController');

router.route("/list").get(estadoFuncionario_controller.all_estados);

router.route("/details/:id").get(estadoFuncionario_controller.estado_details);

router.route("/create").post(estadoFuncionario_controller.estado_create);

router.route("/update/:id").put(estadoFuncionario_controller.estado_update);

router.route("/delete").post(estadoFuncionario_controller.estado_delete);


// ------ Count registros ---------
router.route('/countDocuments').get(estadoFuncionario_controller.countDocuments)


module.exports = router;