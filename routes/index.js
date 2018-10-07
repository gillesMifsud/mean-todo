// THE MAIN CONTROLLER

// Imports
var express = require('express');
var router = express.Router();

// Set the route
router.get('/', function (req, res, next) {
    res.render('index.html');
});

// Exports the router
module.exports = router;