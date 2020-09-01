const express = require('express');
const router = express.Router();

// --------- Import the controllers ----------
const repLimpieza_controller = require('../Controllers/repLimpiezaController');
const { userAuth, checkRole } = require('../Utils/Auth');


router.route("/list").get(checkRole, repLimpieza_controller.all_limpieza);

router.route("/details/:id").get(checkRole, repLimpieza_controller.limpieza_details);

router.route("/create").post(repLimpieza_controller.limpieza_create);

router.route("/update/:id").put(repLimpieza_controller.limpieza_update);

router.route("/delete/:id").delete(repLimpieza_controller.limpieza_delete);

module.exports = router;