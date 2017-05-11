angular.module('D3Timeline', [])
	   .directive('d3Timeline', function () {
	return ({
		restrict : 'E',
		templateUrl : '/directives/d3Timeline.html',
		scope: {
				lois: '=',
				deputes: '='
		}
	});
});

angular.module('D3GroupeHemi', [])
	   .directive('d3GroupeHemi', function () {
	return ({
		restrict : 'E',
		templateUrl : '/directives/d3GroupeHemi.html',
		scope: {
			hemi : '=',
			hello : '='
		}
	});
});
