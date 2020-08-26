const express = require('express');
const router = express.Router();

// --------- Import the controllers ----------
const ingresoSuspendido_controller = require('../Controllers/ingresoSuspendidoController');
const { userAuth, checkRole } = require('../Utils/Auth');


router.route("/list").get(checkRole, ingresoSuspendido_controller.all_ingresoSuspendido);

router.route("/details/:id").get(checkRole, ingresoSuspendido_controller.ingreoSuspendido_details);

router.route("/create").post(ingresoSuspendido_controller.ingresoSuspendido_create);

router.route("/update/:id").put(ingresoSuspendido_controller.ingresoSuspendido_update);

router.route("/delete").post(ingresoSuspendido_controller.ingresoSuspendido_delete);


// ------ Buscar registros ---------
router.route('/ing').post(ingresoSuspendido_controller.suspendido_ing)


module.exports = router;