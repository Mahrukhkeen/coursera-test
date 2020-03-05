(function(){

	angular.module('MenuApp')
	.controller('itemController',itemController);

	itemController.$inject=['data2'];
	function itemController(data2)
	{
		var view3 = this;
		view3.itemArr = data2;
	}
	
})();