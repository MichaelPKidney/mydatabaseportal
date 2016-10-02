
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var app = express();

var Datatypes = require('../models/datatypes');
//var Verify = require('./verify');

app.use(morgan('dev'));

var datatypeRouter = express.Router();

datatypeRouter.use(bodyParser.json());

console.log('in datatypeRouter');
	
datatypeRouter.route('/')
.get(function (req, res, next) {
    Datatypes.find({})
        .exec(function (err, datatype) {
        if (err) throw err;
        res.json(datatype);
    });
})

.post(function (req, res, next) {
    Datatypes.create(req.body, function (err, datatype) {
        if (err) throw err;
        console.log('New datatype created!');
        var id = datatype._id;
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });

        res.end('Added the new datatype with id: ' + id);
    });
})

.delete(function (req, res, next) {
    Datatypes.remove({}, function (err, resp) {
        if (err) throw err;
        res.json(resp);
    });
});

module.exports = datatypeRouter;








