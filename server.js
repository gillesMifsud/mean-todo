// Import Express
var express = require('express');
// Import path (system module from node.js) helps to work with paths
var path = require('path');
// Body parser
var bodyParser = require('body-parser');

// Home page
var index = require('./routes/index');

// Tasks (the api to work with mongo db)
var tasks = require('./routes/tasks');

// Port in which we will listen (run the app-)
var port = 3000;

// Main app
var app = express();

//
// Views engine
//
app.set('views', path.join(__dirname, 'views')); // Set "views" folder used for the views
app.set('view engine', 'ejs'); // Engine specify as ejs
app.engine('html', require('ejs').renderFile); // To render html files

// Set static "client" folder for Angular files
app.use(express.static(path.join(__dirname, 'client')));

//
// Body parser middleware
//
app.use(bodyParser.json()); // Parse json
app.use(bodyParser.urlencoded({extended: false}));

//
// Routes
//
app.use('/', index);
app.use('/api', tasks);

// Run the server (pass the port var), takes a callback function
app.listen(port, function () {
    console.log("Server started on port: " + port)
});