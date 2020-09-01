const express = require('express');
const router = express.Router();

// --------- Import the controllers ----------
const estadoAprendiz_controller = require('../Controllers/estadoAprendizController');
const { userAuth, checkRole } = require('../Utils/Auth');


router.route("/list").get(checkRole, estadoAprendiz_controller.all_estados);

router.route("/details/:id").get(checkRole, estadoAprendiz_controller.estado_details);

router.route("/create").post(estadoAprendiz_controller.estado_create);

router.route("/update/:id").put(estadoAprendiz_controller.estado_update);

router.route("/delete").post(estadoAprendiz_controller.estado_delete);


// ------ Count registros ---------
router.route('/countDocuments').get(estadoAprendiz_controller.countDocuments)

// ------ ING ---------
router.route('/ing').post(estadoAprendiz_controller.ing)



module.exports = router;