
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var app = express();

var userTemplates = require('../models/user_templates');
var Verify = require('./verify');

app.use(morgan('dev'));

var userTemplateRouter = express.Router();

userTemplateRouter.use(bodyParser.json());

console.log('in userTemplateRouter');
	
userTemplateRouter.route('/')
.get(Verify.verifyOrdinaryUser, Verify.verifyAdminUser, function (req, res, next) {
    userTemplates.find({})
    	 .populate('templateUser')
    	 .populate('templateType')
    	 .populate('templateAttributes.attributeDatatype')
        .exec(function (err, usertemplate) {
        if (err) throw err;
        res.json(usertemplate);
    });
})

.post(Verify.verifyOrdinaryUser, function (req, res, next) {
    userTemplates.create(req.body, function (err, usertemplate) {
        if (err) throw err;
        console.log('New user template created!');
        var id = usertemplate._id;
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });

        res.end('Added the user template with id: ' + id);
    });
})

.delete(Verify.verifyOrdinaryUser, Verify.verifyAdminUser, function (req, res, next) {
    userTemplates.remove({}, function (err, resp) {
        if (err) throw err;
        res.json(resp);
    });
});

userTemplateRouter.route('/:userId')
.get(Verify.verifyOrdinaryUser, function (req, res, next) {
   userTemplates.findById(req.params.userId)
        .populate('templateUser')
    	 .populate('templateType')
    	 .populate('templateAttributes.attributeDatatype')
        .exec(function (err, dish) {
         if (err) return next(err);
        res.json(usertemplate);
    });
})

.delete(Verify.verifyOrdinaryUser, function (req, res, next) {
        userTemplates.findByIdAndRemove(req.params.userId, function (err, resp) {
         if (err) return next(err);
        res.json(resp);
    });
});

module.exports = userTemplateRouter;








