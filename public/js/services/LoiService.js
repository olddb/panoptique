angular.module('LoiService', []).factory('Loi', ['$http', '$location', function($http, $location) {

	return ({

		loiRaw : function (cb) {
			$http.get('http://localhost:8080/api/loiRaw').then( function (result) {
				var rez = result.data;
				cb(rez);
			});
		},

		findOneLoi : function (id, cb) {
			$http.get('http://localhost:8080/api/loi?id=' + id).then( function (result) {
				var rez = result.data;
				cb(rez);
			});
		}

	});

}]);
