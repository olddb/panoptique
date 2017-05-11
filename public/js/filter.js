var app = angular.module('titreLoi', []);

app.filter('titreLoi', function () {
	return function (input) {
    	return input.titre;
	};
});
