var mongoose = require('mongoose');

module.exports = mongoose.model('DepAss', {
	uid : {},
	etatCivil : {},
	profession : {},
	adresses : {},
	mandats : {}
});