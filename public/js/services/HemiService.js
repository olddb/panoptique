angular.module('HemiService', []).factory('Hemi', ['$http', '$location', function($http, $location) {

	return ({

		prom : function (cb) {
			$http.get('http://localhost:8080/api/Hemi').then( function (result) {
				cb(result.data);
			});
		},

	});

}]);
