const express = require('express');
const router = express.Router();
const visitasController = require('../controllers/visitas.controller');
const verifyToken = require('../middleware/auth.middleware');

// Aplicar middleware de autenticación a todas las rutas
router.use(verifyToken);

router.get('/', visitasController.getAllVisitas);
router.get('/:id', visitasController.getVisita);
router.post('/', visitasController.createVisita);
router.put('/:id', visitasController.updateVisita);
router.delete('/:id', visitasController.deleteVisita);

module.exports = router; 