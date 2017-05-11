var mongoose = require('mongoose');

module.exports = mongoose.model('OrgAss', {
	uid : String,
	codeType : String,
	libelle : String,
	libelleEdition : String,
	libelleAbrege : String,
	libelleAbrev : String,
	viMoDe : {},
	regime : String,
	legislature : String,
	secretariat : {}
});