const express = require('express');
const router = express.Router();

// --------- Import the controllers ----------
const NoIngresoDia_controller = require('../Controllers/noIngresoController');
const { userAuth, checkRole } = require('../Utils/Auth');


router.route("/list").get(checkRole, NoIngresoDia_controller.all_noIngresoDia);

router.route("/details/:id").get(checkRole, NoIngresoDia_controller.noIngresoDia_details);

router.route("/create").post(NoIngresoDia_controller.noIngreso_create);

router.route("/update/:id").put(NoIngresoDia_controller.noIngresoDia_update);

router.route("/delete/:id").delete(NoIngresoDia_controller.noIngresodia_delete);


// ------ Count registros ---------
router.route('/countDocuments').get(NoIngresoDia_controller.countDocuments)

module.exports = router;