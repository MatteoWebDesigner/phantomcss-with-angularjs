(function() {
	let bindings = {
		message: "<"
	};
	
	class ComponentController {
		constructor() {
			
		}
		
		$onInit() {
			this.isOpen = false;
			this.message = this.message || "";
		}
		
		toogleBlockOpenStatus() {
			this.isOpen = !this.isOpen;
		}
	}
	
	let template = `
	<div class="component">
		<button class="component__btn" ng-click="$ctrl.toogleBlockOpenStatus()">open block</button>
		<div 
			class="component__block"
			ng-if="$ctrl.isOpen">
			this block is open. {{::$ctrl.message}}
		</div>
	`;

	angular.module("app.component", []).component("component", {
		bindings: bindings,
		controller: ComponentController,
		template: template
	});
})();