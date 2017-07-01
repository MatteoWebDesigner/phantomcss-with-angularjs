(function() {
	function config($locationProvider, $stateProvider) {
		var homeState = {
			name: "home",
			url: "/",
			controller: class Home {
				constructor() {
					
				}
			},
			template: `
				<h3>Hello world!</h3>
				<component message="'ciao sono Matteo'"></component>
			`,
		}
		
		var visualUnitTestState = {
			name: "visualUnitTest",
			url: "/visualUnitTest/{componentName}",
			controllerAs: "$ctrl",
			controller: class VisualUnitTest {
				constructor($element, $stateParams, $compile, $scope, $http) {
					let elementDom = $element[0],
						componentName = $stateParams.componentName,
						visualUnitTestElement = elementDom.querySelector(".js-visual-unit-test");
						
					this.componentName = $stateParams.componentName;
					
					$http.get(`${componentName}.spec.json`).then(handleSuccess);
					
					function handleSuccess (response) {
						let newScope = $scope.$new(false);
						let templateCompiled = $compile(response.data.template)(newScope)[0];
						
						Object.assign(newScope, response.data.mockData);
						
						visualUnitTestElement.append(templateCompiled);

						console.log(newScope);
					}
				}
			},
			template: `
				<h3>Visual unit test: {{::$ctrl.componentName}}</h3>
				<div class="js-visual-unit-test" data-qa="visual-unit-test"></div>
			`,
		}
		
		$locationProvider.html5Mode(true);
		$stateProvider.state(homeState);
		$stateProvider.state(visualUnitTestState);
		
	}

	angular.module("app", ["ui.router", "app.component"]).config(config);
})();