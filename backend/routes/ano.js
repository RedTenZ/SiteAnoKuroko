const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const anoCtrl = require('../controllers/ano');

router.get('/', auth, anoCtrl.getAllMessage);
router.post('/', multer, anoCtrl.sendMessage);
router.delete('/:id', auth, anoCtrl.deleteMessage);

module.exports = router;
