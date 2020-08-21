const express = require('express');
const router = express.Router();

// --------- Import the controllers ----------
const reporteSalud_controller = require('../Controllers/reporteSaludController');

router.route("/list").get(reporteSalud_controller.all_reporteSalud);

router.route("/details/:id").get(reporteSalud_controller.reporteSalud_details);

router.route("/create").post(reporteSalud_controller.reporteSalud_create);

router.route("/update/:id").put(reporteSalud_controller.reporteSalud_update);

router.route("/delete").post(reporteSalud_controller.reporteSalud_delete);


// ------ Count registros ---------
// router.route('/countDocuments').get(reporteSaludDia_controller.countDocuments)


module.exports = router;