const express = require('express');
const router = express.Router();

// --------- Import the controllers ----------
const estado_controller = require('../Controllers/estadoController');

router.route("/list").get(estado_controller.all_estados);

router.route("/details/:id").get(estado_controller.estado_details);

router.route("/create").post(estado_controller.estado_create);

router.route("/update/:id").put(estado_controller.estado_update);

router.route("/delete").post(estado_controller.estado_delete);


// ------ Count registros ---------
router.route('/countDocuments').get(estado_controller.countDocuments)


module.exports = router;