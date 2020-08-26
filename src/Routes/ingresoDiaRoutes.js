const express = require('express');
const router = express.Router();

// --------- Import the controllers ----------
const ingresoDia_controller = require('../Controllers/ingresoDiaController');
const { userAuth, checkRole } = require('../Utils/Auth');


router.route("/list").get(checkRole, ingresoDia_controller.all_ingresos);

router.route("/details/:id").get(checkRole, ingresoDia_controller.ingresoDia_details);

router.route("/create").post(ingresoDia_controller.ingresoDia_create);

router.route("/update/:id").put(ingresoDia_controller.ingresoDia_update);

router.route("/delete/:id").delete(ingresoDia_controller.ingresoDia_delete);

module.exports = router;