const express = require('express');
const router = express.Router();

// --------- Import the controllers ----------
const reporteSaludDia_controller = require('../Controllers/reporteSaludDiaController');
const { userAuth, checkRole } = require('../Utils/Auth');


router.route("/list").get(checkRole, reporteSaludDia_controller.all_reporteSaludDia);

router.route("/details/:id").get(checkRole, reporteSaludDia_controller.reporteSaludDia_details);

router.route("/create").post(reporteSaludDia_controller.reporteSaludDia_create);

router.route("/createNE").post(reporteSaludDia_controller.reporteSaludDia_createNE);

router.route("/update/:id").put(reporteSaludDia_controller.reporteSaludDia_update);

router.route("/delete").post(reporteSaludDia_controller.reporteSaludDia_delete);


// ------ Buscar registros ---------
router.route('/ing').post(reporteSaludDia_controller.ing)


module.exports = router;