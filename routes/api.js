const express = require('express');

const router = express.Router();

router.use('/auth', require('./auth'));
// router.use('/check', require('./check'));
router.use('/requests/recipients', require('./recipient'));
router.use('/requests', require('./request'));
router.use('/donate', require('./donate'));
router.use('/donations', require('./donation'));
router.use('/history', require('./history'));

module.exports = router;