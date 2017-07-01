"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
	function config($locationProvider, $stateProvider) {
		var homeState = {
			name: "home",
			url: "/",
			controller: function Home() {
				_classCallCheck(this, Home);
			},
			template: "\n\t\t\t\t<h3>Hello world!</h3>\n\t\t\t\t<component message=\"'ciao sono Matteo'\"></component>\n\t\t\t"
		};

		var visualUnitTestState = {
			name: "visualUnitTest",
			url: "/visualUnitTest/{componentName}",
			controllerAs: "$ctrl",
			controller: function VisualUnitTest($element, $stateParams, $compile, $scope, $http) {
				_classCallCheck(this, VisualUnitTest);

				var elementDom = $element[0],
				    componentName = $stateParams.componentName,
				    visualUnitTestElement = elementDom.querySelector(".js-visual-unit-test");

				this.componentName = $stateParams.componentName;

				$http.get(componentName + ".spec.json").then(handleSuccess);

				function handleSuccess(response) {
					var newScope = $scope.$new(false);
					var templateCompiled = $compile(response.data.template)(newScope)[0];

					Object.assign(newScope, response.data.mockData);

					visualUnitTestElement.append(templateCompiled);

					console.log(newScope);
				}
			},
			template: "\n\t\t\t\t<h3>Visual unit test: {{::$ctrl.componentName}}</h3>\n\t\t\t\t<div class=\"js-visual-unit-test\" data-qa=\"visual-unit-test\"></div>\n\t\t\t"
		};

		$locationProvider.html5Mode(true);
		$stateProvider.state(homeState);
		$stateProvider.state(visualUnitTestState);
	}

	angular.module("app", ["ui.router", "app.component"]).config(config);
})();