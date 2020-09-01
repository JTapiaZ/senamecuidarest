const express = require('express');
const router = express.Router();

// --------- Import the controllers ----------
const repInsumo_controller = require('../Controllers/repInsumosController');
const { userAuth, checkRole } = require('../Utils/Auth');


router.route("/list").get(checkRole, repInsumo_controller.all_insumo);

router.route("/details/:id").get(checkRole, repInsumo_controller.insumo_details);

router.route("/create").post(repInsumo_controller.insumo_create);

router.route("/update/:id").put(repInsumo_controller.insumo_update);

router.route("/delete/:id").delete(repInsumo_controller.insumo_delete);

module.exports = router;