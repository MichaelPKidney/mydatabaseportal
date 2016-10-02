
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var app = express();

var AvailableTemplates = require('../models/available_templates');
var Verify = require('./verify');

app.use(morgan('dev'));

var availableTemplateRouter = express.Router();

availableTemplateRouter.use(bodyParser.json());

console.log('in availableTemplateRouter');
	
availableTemplateRouter.route('/')
.get(Verify.verifyOrdinaryUser, Verify.verifyAdminUser, function (req, res, next) {
    AvailableTemplates.find({})
        .exec(function (err, availabletemplate) {
        if (err) throw err;
        res.json(availabletemplate);
    });
})

.post(Verify.verifyOrdinaryUser, Verify.verifyAdminUser, function (req, res, next) {
    AvailableTemplates.create(req.body, function (err, availabletemplate) {
        if (err) throw err;
        console.log('New template created!');
        var id = availabletemplate._id;
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });

        res.end('Added the new template with id: ' + id);
    });
})

.delete(Verify.verifyOrdinaryUser, Verify.verifyAdminUser, function (req, res, next) {
    AvailableTemplates.remove({}, function (err, resp) {
        if (err) throw err;
        res.json(resp);
    });
});

module.exports = availableTemplateRouter;








