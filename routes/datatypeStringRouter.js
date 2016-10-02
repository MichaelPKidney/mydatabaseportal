
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var app = express();

var Datatype_Strings = require('../models/datatype_strings');
//var Verify = require('./verify');

app.use(morgan('dev'));

var datatypeStringRouter = express.Router();

datatypeStringRouter.use(bodyParser.json());

console.log('in datatypeStringRouter');
	
datatypeStringRouter.route('/')
.get(function (req, res, next) {
    Datatype_Strings.find({})
        .exec(function (err, datatypestring) {
        if (err) throw err;
        res.json(datatypestring);
    });
})

.post(function (req, res, next) {
    Datatype_Strings.create(req.body, function (err, datatypestring) {
        if (err) throw err;
        console.log('New String datatype created!');
        var id = datatypestring._id;
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });

        res.end('Added the new string datatype with id: ' + id);
    });
});

module.exports = datatypeStringRouter;








