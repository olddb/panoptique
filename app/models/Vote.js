var mongoose = require('mongoose');

module.exports = mongoose.model('scrutinscraps', {
	"uid" : String,
	"numero" : String,
	"organeRef" : String,
	"legislature" : String,
	"sessionRef" : String,
	"seanceRef" : String,
	"dateScrutin" : String,
	"quantiemeJourSeance" : String,
	"typeVote" : {},
	"sort" : {},
	"titre" : String,
	"demandeur" : {},
	"objet" : {},
	"modePublicationDesVotes" : String,
	"syntheseVote" : {},
	"ventilationVotes" : {}
});