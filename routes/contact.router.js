const express = require('express');
const router = express.Router();
const contactController = require('../controller/contact.controller');


router.get('/', contactController.getAll);
router.post('/', contactController.submitMessage);
router.delete("/delete/:id", contactController.delete)
router.put("/resolve/:id", contactController.resolve)

module.exports = router
