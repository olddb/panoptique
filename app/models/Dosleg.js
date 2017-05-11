var mongoose = require('mongoose');

module.exports = mongoose.model('Dosleg', {
	uid : String,
	legislature : String,
	titreDossier : {},
	procedureParlementaire : {},
	initiateur : {},
	actesLegislatifs : {}
});
