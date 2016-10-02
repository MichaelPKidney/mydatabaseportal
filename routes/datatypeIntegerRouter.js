
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var app = express();

var Datatype_Integers = require('../models/datatype_integers');
//var Verify = require('./verify');

app.use(morgan('dev'));

var datatypeIntegerRouter = express.Router();

datatypeIntegerRouter.use(bodyParser.json());

console.log('in datatypeIntegerRouter');
	
datatypeIntegerRouter.route('/')
.get(function (req, res, next) {
    Datatype_Integers.find({})
        .exec(function (err, datatypeinteger) {
        if (err) throw err;
        res.json(datatypeinteger);
    });
})

.post(function (req, res, next) {
    Datatype_Integers.create(req.body, function (err, datatypeinteger) {
        if (err) throw err;
        console.log('New Integer datatype created!');
        var id = datatypeinteger._id;
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });

        res.end('Added the new integer datatype with id: ' + id);
    });
});

module.exports = datatypeIntegerRouter;








