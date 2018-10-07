// Imports
var express = require('express');
var router = express.Router();
//
// DB
//
var mongoJs = require('mongojs');
// Connexion details from https://mlab.com/databases/tasklists_yin (hosts the online mongodb)
// ['tasks'] is the collection name from the mongodb
var db = mongoJs("mongodb://yin:qlfsat67@ds055626.mlab.com:55626/tasklists_yin", ['tasks']);

// Get all tasks
router.get('/tasks', function (req, res, next) {
    // Call to fetch db
    db.tasks.find(function (err, tasks) {
        if(err)
        {
            res.send(err);
        }
        res.json(tasks);
    })
});

// Get single task
router.get('/task/:id', function (req, res, next) {
    // /task/:id => req.params.id
    db.tasks.findOne({_id: mongoJs.ObjectId(req.params.id)}, function (err, task) {
        if(err)
        {
            res.send(err);
        }
        res.json(task);
    })
});

// Add a task
router.post('/task', function (req, res, next) {
    // Define a var as the http post coming from the body's request
    var task = req.body;

    // Check task is valid -> if no: return err 400
    // If valid -> save
    if(!task.title || !(task.isDone + "")){
        res.status(400);
        res.json({
            "error" : "Bad Data"
        });
    }
    else {
        db.tasks.save(task, function (err, task) {
            if(err)
            {
                res.send(err);
            }
            res.json(task);
        });
    }
});

// Delete task
router.delete('/task/:id', function (req, res, next) {
    // /task/:id => req.params.id
    db.tasks.remove({_id: mongoJs.ObjectId(req.params.id)}, function (err, task) {
        if(err)
        {
            res.send(err);
        }
        res.json(task);
    })
});

// Update task
router.put('/task/:id', function (req, res, next) {

    var task = req.body;
    // Create empty object of updated task
    var updTask = {};

    if(task.title){
        updTask.title = task.title;
    }

    if(task.isDone){
        updTask.isDone = task.isDone;
    }

    if(!updTask){
        res.status(400);
        res.json({
            "Error" : "Bad Data"
        });
    } else {
        db.tasks.update({_id: mongoJs.ObjectId(req.params.id)}, updTask, {}, function (err, task) {
            if(err)
            {
                res.send(err);
            }
            res.json(task);
        })
    }
});

module.exports = router;