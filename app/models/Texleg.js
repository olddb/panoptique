var mongoose = require('mongoose');

module.exports = mongoose.model('Texleg', {
	uid : String,
	legislature : String,
	cycleDeVie : {},
	denominationStructurelle: String,
	titres: {},
	divisions: {},
	dossierRef : String,
	classification: {},
	auteurs : {},
	notice : {},
	indexation : {},
	imprimerie : {},

	depotAmendements : {}
});