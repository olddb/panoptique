angular.module('NicoleCtrl', []).controller('NicoleController', function($timeout, $scope, OrgAss, Vote, $routeParams, Depute, OrgAss) {

  console.log('{NicoleCtrl}');
  $scope.okDisplay = false;

  function parseVote (e){

		var rtn = "";
    rtn += " pour : "       + (e.pour.length || 0);
    rtn += " contre : "     + (e.contre.length || 0);		
		rtn += " abstention : " + (e.abstention.length || 0);
    rtn += " non votant : "  + (e.nonVotants.length || 0);
    // corriger le scraper pour prendre en compte les non-votants (pas de li)
    // voir ici: http://www2.assemblee-nationale.fr/scrutins/detail/(legislature)/14/(num)/1263
		
		
		return rtn;
  }
	function formatVote (e) {

    var newFormatVote = [];
    // OrgAss.orgPromise(function (m) {
      // console.log("m: ", m);
      e.ventilation.forEach(function(group) {
  			// var org = {};
  			// if ((org = m.find(x => (x.uid == e.organeRef)))) {
  				var oneGroupe 	=  {};
          oneGroupe.nom		= group.nom;
          // oneGroupe.id		= org._id;
  				oneGroupe.vote 	= parseVote(group) + '\n';
  				newFormatVote.push(oneGroupe);
  			// }
  		});
      $scope.newFormatVote = newFormatVote;
    // });
	}
  Depute.deputeRaw(function (e){
    console.log('[deputeRaw]');
    console.log(e);
  });
  Vote.findOneVote($routeParams.id, function(e){
    $scope.vote = e;    
    console.log('[vote]');
    // console.log("e: ", e);
    formatVote(e);
  });


});
