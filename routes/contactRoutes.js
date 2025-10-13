const express = require('express');
const router = express.Router();
const { handleContactForm } = require('../Mailer/Mailer');

router.post('/send', handleContactForm);

module.exports = router;