"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
	var bindings = {
		message: "<"
	};

	var ComponentController = function () {
		function ComponentController() {
			_classCallCheck(this, ComponentController);
		}

		_createClass(ComponentController, [{
			key: "$onInit",
			value: function $onInit() {
				this.isOpen = false;
				this.message = this.message || "";
			}
		}, {
			key: "toogleBlockOpenStatus",
			value: function toogleBlockOpenStatus() {
				this.isOpen = !this.isOpen;
			}
		}]);

		return ComponentController;
	}();

	var template = "\n\t<div class=\"component\">\n\t\t<button class=\"component__btn\" ng-click=\"$ctrl.toogleBlockOpenStatus()\">open block</button>\n\t\t<div \n\t\t\tclass=\"component__block\"\n\t\t\tng-if=\"$ctrl.isOpen\">\n\t\t\tthis block is open. {{::$ctrl.message}}\n\t\t</div>\n\t";

	angular.module("app.component", []).component("component", {
		bindings: bindings,
		controller: ComponentController,
		template: template
	});
})();