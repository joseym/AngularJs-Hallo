angular.module('edit', []).directive('hallo', ['$parse', function($parse){

	/**
	 * This directive allows for easy implementation 
	 * of the hallo content editing plugin
	 */
	return {
		restrict: 'AC',
		scope: true,
		compile: function(tElement, tAttrs) {
			return function(scope, elm, attr) {

				var params = scope.$eval(attr.hallo),
					contents = scope.$eval(attr.ngModel),
					model = $parse(attr.ngModel);
					
				elm
					.hallo(params)
					.html(contents.replace(/\r?\n|\r/g, "<br/>"))
					.addClass('editable');

				elm.bind('hallomodified', function(event, data) {
					scope.$apply(function(){
						model.assign(scope, data.content);
					});
				});

			}
		}
	};

}]);