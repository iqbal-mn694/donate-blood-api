const express = require('express');
const router = express.Router();

const { auth } = require('../middleware/auth');
const { history } = require('../controllers/historyController');

router.get('/', auth, history);

module.exports = router;