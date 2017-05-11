angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		// home page
		.when('/', {
			templateUrl: 'directives/timeline.html',
			controller: 'TimelineController'
		})
		.when('/nicole', {
			templateUrl: 'directives/nicole.html',
			controller: 'NicoleController'
		})
		.when('/groupe', {
			templateUrl: 'directives/groupe.html',
			controller: 'GroupeController'
		})
		.when('/*', {
			templateUrl: 'directives/timeline.html',
			controller: 'TimelineController'
		})
		.otherwise({
	    controller : function(){
	        window.location.replace('/');
	    },
	    template : "<div>Redirection...</div>"
		});

	$locationProvider.html5Mode(true);

}]);
