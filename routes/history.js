const express = require('express');
const router = express.Router();

const { auth } = require('../middleware/auth');
const { history, historyDetail } = require('../controllers/historyController');

router.get('/', auth, history);
router.get('/:historyID', auth, historyDetail);

module.exports = router;