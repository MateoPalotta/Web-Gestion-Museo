const express = require('express');
const router = express.Router();
const planosController = require('../controllers/planos.controller');
const verifyToken = require('../middleware/auth.middleware');

// Aplicar middleware de autenticación a todas las rutas
router.use(verifyToken);

router.get('/', planosController.getAllPlanos);
router.get('/:id', planosController.getPlano);
router.post('/', planosController.uploadPlano);
router.delete('/:id', planosController.deletePlano);

module.exports = router; 