(function () {
	"use strict";
	immenuApp.controller('homeCtrl', homeCtrl);

	homeCtrl.$inject = ['$scope'];

	function homeCtrl($scope) {
		var vm = this;
		$scope.mmDtmock = [
			{
				title: "Menu item"
			}
		];
		for(var i=0; i < 6; i++) {
			$scope.mmDtmock.push({title: 'Menu item ' + i, dropdown: false});
		}
		$scope.mmDtmock.forEach(function (item, id, nArr) {
			if(id%2 == 0) {
				item.dropdown = true;
			}
		})
	}
})();
