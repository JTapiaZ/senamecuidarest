const express = require('express');
const router = express.Router();

// --------- Import the controllers ----------
const salidaDia_controller = require('../Controllers/salidaDiaController');

router.route("/list").get(salidaDia_controller.all_salidas);

router.route("/details/:id").get(salidaDia_controller.salidaDia_details);

router.route("/create").post(salidaDia_controller.salidaDia_create);

router.route("/update/:id").put(salidaDia_controller.salidaDia_update);

router.route("/delete/:id").delete(salidaDia_controller.salidaDia_delete);

module.exports = router;