const express = require('express');
const router = express.Router();
const exposicionesController = require('../controllers/exposiciones.controller');
const verifyToken = require('../middleware/auth.middleware');

// Aplicar middleware de autenticación a todas las rutas
router.use(verifyToken);

router.get('/', exposicionesController.getAllExposiciones);
router.get('/:id', exposicionesController.getExposicion);
router.post('/', exposicionesController.createExposicion);
router.put('/:id', exposicionesController.updateExposicion);
router.delete('/:id', exposicionesController.deleteExposicion);

module.exports = router; 