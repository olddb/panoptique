// A UPDATE

// - nom  => scrappé sur le lien 'dossier'
// - lienLegifrance => scrappé sur le lien 'dossier'
// - Thèmes => scrappés sur le JO
Lois.Loi : {
   "uid" : String,
   "idVote" : String, // pour relier la loi au vote
X  "lienLegifrance" : String,
   "nombreDeVotant" : Number,  // 442
X  "nom" : String,             // LOI n° 2017-86 du 27 janvier 2017 relative à l'égalité et à la citoyenneté
   "dateDuVote" : Date,        // 22 décembre 2016
X  "themes" : [String],        // égalité, citoyenneté
}










////////////////////////////////////////////////////////////////////////
// Precision : Donnees minimum sur chaque deputes en cours de mandat,
// suffisante pour certaines visualisations. Aucun probleme pour avoir ces
// donnes a partir de l'api de NosDeputes, je met juste le jeux ici pour
// preciser quant aux Scrutins.
DeputesSmall.Depute : {
X  "nom" : String,             // "Denis Jacquat"
X  "partiPolitique" : String,  // "Les républicains"
X  "ID": String                // "1699"
}

////////////////////////////////////////////////////////////////////////
// Precision : La encore, pas de probleme autre que celui des Lois
Deputes.Depute : {
X  "nom" : String,             // "Denis Jacquat"
X  "partiPolitique" : String,  // "Les républicains"
X  "ID": String,               // "1699"
X  "tempsDePresence" : Number, // 75 (sur un an, un indice en comparaison des autres deputes)
X  "rapports" : Number,        // nombre de rapport effectues
X  "amendementDepose" : Number, // nombre d'amandements
X  "lienNosDeputees" : String, // https://www.nosdeputes.fr/denis-jacquat
  "positionnements" : [{
    "nomDeLaLoi": String,     // Scrutin public sur l'ensemble du projet de loi
                              // relatif au statut de Paris et à l'aménagement métropolitain (première lecture).
    "idLoi": String,          // 1364
    "position": String        // "pour"
  },...]
}

////////////////////////////////////////////////////////////////////////
// Les scrutins traites sont ceux a propos de lois ayant ete promulguees ou abrogees.
Scrutins.Scrutin : {
  "uidLoiConcernee" : String,
  "nomDeLaLoi" : String,
  groupes : [{
    "nomDuParti" : String,    // "Parti Socialiste"
    "nonVotants" : [DeputesSmall],
    "pour" : [DeputesSmall]
  },{
    ....
  }]
}
