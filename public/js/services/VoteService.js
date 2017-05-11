angular.module('VoteService', []).factory('Vote', ['$http', '$location', function($http, $location) {

	return ({

		voteRaw : function (cb) {
			$http.get('http://localhost:8080/api/voteRaw').then( function (result) {
				console.log("voteRaw voteService result: ", result);
				var rez = result.data;
				cb(rez);
			});
		},

		findOneVote : function (id, cb) {
			$http.get('http://localhost:8080/api/vote?id=' + id).then( function (result) {
				var rez = result.data;
				cb(rez);
			});
		}

	});

}]);
