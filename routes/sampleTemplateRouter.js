
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var app = express();

var SampleTemplates = require('../models/sample_templates');
var Verify = require('./verify');

app.use(morgan('dev'));

var sampleTemplateRouter = express.Router();

sampleTemplateRouter.use(bodyParser.json());

console.log('in sampleTemplateRouter');
	
sampleTemplateRouter.route('/')
.get(Verify.verifyOrdinaryUser, function (req, res, next) {
    SampleTemplates.find({})
    	  .populate('databaseType')
    	 	.populate('templateAttributes.attributeDatatype_id')
        .exec(function (err, sampletemplate) {
        if (err) throw err;
        res.json(sampletemplate);
    });
})

.post(Verify.verifyOrdinaryUser, Verify.verifyAdminUser, function (req, res, next) {
    SampleTemplates.create(req.body, function (err, sampletemplate) {
        if (err) throw err;
        console.log('New template created!');
        var id = sampletemplate._id;
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });

        res.end('Added the new template with id: ' + id);
    });
})

.delete(Verify.verifyOrdinaryUser, Verify.verifyAdminUser, function (req, res, next) {
    SampleTemplates.remove({}, function (err, resp) {
        if (err) throw err;
        res.json(resp);
    });
});

module.exports = sampleTemplateRouter;








