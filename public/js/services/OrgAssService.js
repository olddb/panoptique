angular.module('OrgAssService', []).factory('OrgAss', ['$http', '$location', function($http, $location) {

	return ({

		orgPromise : function (cb) {
			$http.get('http://localhost:8080/api/orgAssRaw').then( function (result) {
				var rez = result.data;
				cb(rez);
			});
		},
		findOneOrg : function (id, cb) {
			var url = 'http://localhost:8080/api/orgAss?id=' + id;
			$http.get(url).then( function (result) {
				var rez = result.data;
				cb(rez);
			});
		}

	});

}]);
