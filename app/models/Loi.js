var mongoose = require('mongoose');

module.exports = mongoose.model('loiscraps', {
	"uid" : String,
	"lienLegifrance" : String,
	"nombreDeVotant" : Number,  // 442
	"nom" : String,             // LOI n° 2017-86 du 27 janvier 2017 relative à l'égalité et à la citoyenneté
	"dateDuVote" : Date,        // 22 décembre 2016
	"themes" : [String],        // égalité, citoyenneté	
});