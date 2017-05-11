angular.module('DeputeService', []).factory('Depute', ['$http', '$location', function($http, $location) {

	return ({

		deputeRaw : function (cb) {
			$http.get('http://localhost:8080/api/deputeRaw').then( function (result) {
				cb(result.data);
			});
		},

	});

}]);
