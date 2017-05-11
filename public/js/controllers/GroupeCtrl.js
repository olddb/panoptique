angular.module('GroupeCtrl', []).controller('GroupeController', function($timeout, $scope, $location, $routeParams, OrgAss, Hemi) {

  // $scope.id = $routeParams.id;
  $scope.type = $routeParams.t;

  $scope.hello = '';

  console.log('{GroupeCtrl}');

  OrgAss.findOneOrg($routeParams.id, function(e){
    $scope.currOrgass = e;
    $scope.leTitre = e.libelle;
  });

  Hemi.prom(function (e) {
    $scope.hemi = e;
  });

  $scope.bjr = function () {
    console.log('$scope.hello = ' + $scope.hello);
  };

  OrgAss.orgPromise(function(e){
// $scope.currOrgass = e;
    // console.log(e);
  });

});
