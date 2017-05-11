var mongoose = require('mongoose');

module.exports = mongoose.model('DeputeScrap', {
  nom : String,
  groupe : String,
  idAss : String,
  tauxDePresence : Number,
  rapports : Number,
  amendementDepose : Number,
  lienNosDeputees : String,
  positionnements : {}
});
