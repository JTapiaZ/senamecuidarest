const express = require('express');
const router = express.Router();

// --------- Import the controllers ----------
const reporteSaludDia_controller = require('../Controllers/reporteSaludDiaController');

router.route("/list").get(reporteSaludDia_controller.all_reporteSaludDia);

router.route("/details/:id").get(reporteSaludDia_controller.reporteSaludDia_details);

router.route("/create").post(reporteSaludDia_controller.reporteSaludDia_create);

router.route("/update/:id").put(reporteSaludDia_controller.reporteSaludDia_update);

router.route("/delete").post(reporteSaludDia_controller.reporteSaludDia_delete);


// ------ Count registros ---------
// router.route('/countDocuments').get(reporteSaludDia_controller.countDocuments)


module.exports = router;