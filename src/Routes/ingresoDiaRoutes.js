const express = require('express');
const router = express.Router();

// --------- Import the controllers ----------
const ingresoDia_controller = require('../Controllers/ingresoDiaController');

router.route("/list").get(ingresoDia_controller.all_ingresos);

router.route("/details/:id").get(ingresoDia_controller.ingresoDia_details);

router.route("/create").post(ingresoDia_controller.ingresoDia_create);

router.route("/update/:id").put(ingresoDia_controller.ingresoDia_update);

router.route("/delete/:id").delete(ingresoDia_controller.ingresoDia_delete);

module.exports = router;