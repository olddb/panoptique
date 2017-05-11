 var mongoose = require('mongoose');

module.exports = mongoose.model('Hemi', {
	nom : String,
	groupe_sigle : String,
	children : {},
	size : Number
});
//Custom created model
