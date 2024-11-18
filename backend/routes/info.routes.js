const express = require('express');
const router = express.Router();
const infoController = require('../controllers/info.controller');
const verifyToken = require('../middleware/auth.middleware');

router.get('/', verifyToken, infoController.getInfo);
router.post('/', verifyToken, infoController.updateInfo);

module.exports = router; 