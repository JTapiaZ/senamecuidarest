const express = require('express');
const router = express.Router();
const EstadoController = require('../Controllers/estadoSaludController')


router.route("/aprendizEstado").put(EstadoController.ActualizarEstado);

module.exports = router
