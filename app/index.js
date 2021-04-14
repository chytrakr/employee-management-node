const express = require('express');

// Routes Import
const employee = require("./employee/index.js");

const router = express.Router();

// Adding Routes
router.use('/employee', employee);

module.exports = router;