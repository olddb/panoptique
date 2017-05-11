angular.module('MainCtrl', ['ngAnimate']).controller('MainController', function($scope, $location, Loi, Depute, $timeout) {

	console.log('{MaintCtrl}');
	$scope.okToGo = false;

	// Vote.voteRaw(function(e) {
 //  		$scope.votes = e;
	// });

	Depute.deputeRaw(function(e) {
		// console.log("e: ", e);
  		$scope.deputes = e;
  		// console.log("$scope.deputes: ", $scope.deputes);
	});

	Loi.loiRaw(function(e) {
		// console.log("e: ", e);
  		$scope.lois = e;
  		// console.log("$scope.lois: ", $scope.lois);
	});

})
.run(['$rootScope', '$timeout', function($rootScope, $timeout) {
    $rootScope.bodyClass = 'loading';
		$rootScope.ui = 'sleep';

		$timeout(function() {
			$rootScope.ui = 'myUp';
		}, 1000);
}]);









// $scope.$on("$locationChangeStart", function(event, balek, from0) {
// 	if ($scope.okToGo === false) {
// 		event.preventDefault();
// 		var dest = document.createElement('a');
// 		var from = document.createElement('a');
// 		dest.href = $location.path();
// 		from.href = from0;
// 		$scope.okToGo = true;
//
// 		if (from.pathname == '/' && dest.pathname == '/groupe') {
// 			console.log('Catch');
// 			$scope.ui.direction = 'myDown';
// 		}
// 		var to = $location.absUrl();
// 		console.log('TO =>>' + to);
// 		$timeout(function () {
// 			$location.path(to);
// 		}, 100);
// 	}
// 	// console.log('/////////////');
// 	// console.log($location.absUrl());
// 	// console.log('/////////////');
// 	// console.log('/////////////');
// 	// console.log('From=>|' + from.pathname + '|');
// 	// console.log('/////////////');
// 	// console.log('D P =>|' + dest.pathname + '|');
// 	// console.log('/////////////');
// });
