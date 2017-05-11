module.exports = function(app) {

	// server routes ===========================================================
	// handle things like api calls
	// authentication routes

	// models && api ===========================================

	// var DepAss = require('./models/DepAss.js');
	var DepAss = require('./models/deputeScrap.model.js');
	// var Loi = require('./models/Loi.js');
	var Loi = require('./models/loiScrap.model.js');
	// var Vote = require('./models/Vote.js');
	var Vote = require('./models/scrutinScrap.model.js');
	var OrgAss = require('./models/OrgAss.js');
	var Hemi = require('./models/Hemi.js');


	app.get('/api/deputeRaw', function(req, res, next) {

		// DepAss.find({},{},{}, function(err, d){ //no limit
		DepAss.find({},{},{limit : 140, sort:{"nom": 1} }, function(err, d){
			if(err){return next(err); }
		    res.json(d);
		});

	});
	app.get('/api/Hemi', function(req, res, next) {

		Hemi.find({},{},{limit : 30}, function(err, d){
			if(err){return next(err); }
		    res.json(d);
		});

	});

	app.get('/api/loiRaw', function(req, res, next) {

		Loi.find({},{},{}, function(err, d){
			
		// Loi.find({},{},{limit : 10}, function(err, d){
			if(err){return next(err); }
			res.json(d);
		});

	});

	// app.get('/api/voteRaw', function(req, res, next) {

	// 	Vote.find({},{},{limit : 6}, function(err, d){
	// 		if(err){return next(err); }
	// 		res.json(d);
	// 	});

	// });

	app.get('/api/vote', function(req, res, next) {

		var numScrutin = parseInt(req.query.id, 10);
		Vote.findOne({numScrutin : numScrutin}, function(err, d){
			// console.log("d: ", d);
			//console.log("req.query.id: ", req.query.id);
			if(err){return next(err); }
			res.json(d);
		});

	});

	app.get('/api/orgAssRaw', function(req, res, next) {

		OrgAss.find(function(err, d){
			if(err){return next(err); }
		    res.json(d);
		});

	});


	app.get('/api/orgAss', function(req, res, next) {

		OrgAss.findOne({_id : req.query.id}, function(err, d){
			if(err){return next(err); }
			res.json(d);
		});

	});



	// frontend routes =========================================================
	// route to handle all angular requests
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html');
	});

};
