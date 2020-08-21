const express = require('express');
const router = express.Router();

// --------- Import the controllers ----------
const publico_controller = require('../Controllers/publicoController');

router.route("/list").get(publico_controller.all_publico);

router.route("/details/:id").get(publico_controller.publico_details);

router.route("/create").post(publico_controller.publico_create);

router.route("/update/:id").put(publico_controller.employee_update);

router.route("/delete/:id").delete(publico_controller.public_delete);

module.exports = router;