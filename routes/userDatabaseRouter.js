
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var app = express();

var userDatabases = require('../models/user_databases');
var Verify = require('./verify');

app.use(morgan('dev'));

var userDatabaseRouter = express.Router();

userDatabaseRouter.use(bodyParser.json());

console.log('in userDatabaseRouter');
	
userDatabaseRouter.route('/')
.get(Verify.verifyOrdinaryUser, Verify.verifyAdminUser, function (req, res, next) {
	
    userDatabases.find({})
    
    	 .populate('dbUser')
    	 .populate('templateType')
    	 .populate('databaseAttributes.dbAttributeDatatype')
    	 
    		.exec(function (err, userdatabase) {
        	if (err) throw err;
       		res.json(userdatabase);  
    		});
    		
   // clientdatabase.dereference('clientdatabase.databaseAttributes.attributeDetail',function(err, item) {
   // 	if (err) throw err;
   // 	console.log('item');
   // 	
   // });
    	
})

.post(Verify.verifyOrdinaryUser, function (req, res, next) {
    userDatabases.create(req.body, function (err, userdatabase) {
        if (err) throw err;
        console.log('New user database created!');
        var id = userdatabase._id;
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });

        res.end('Added the user database with id: ' + id);
    });
})

.delete(Verify.verifyOrdinaryUser,  Verify.verifyAdminUser, function (req, res, next) {
    userDatabases.remove({}, function (err, resp) {
        if (err) throw err;
        res.json(resp);
    });
});

userDatabaseRouter.route('/:userId')
.get(Verify.verifyOrdinaryUser, function (req, res, next) {
    userDatabases.findById(req.params.userDatabaseId)
        .exec(function (err, userdatabase) {
        if (err) throw err;
        res.json(userdatabase);
    });
})

.put(Verify.verifyOrdinaryUser, function (req, res, next) {
    userDatabases.findByIdAndUpdate(req.params.userDatabaseId, {
        $set: req.body
    }, {
        new: true
    }, function (err, userdatabase) {
        if (err) throw err;
        res.json(userdatabase);
    });
})

.delete(Verify.verifyOrdinaryUser, function (req, res, next) {
        Client_Databases.findByIdAndRemove(req.params.userDatabaseId, function (err, resp) {
        if (err) throw err;
        res.json(resp);
    });
});


module.exports = userDatabaseRouter;

