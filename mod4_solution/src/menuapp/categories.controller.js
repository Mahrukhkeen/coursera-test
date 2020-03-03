(function(){

	angular.module('MenuApp')
	.controller('categoryController',categoryController);

	categoryController.$inject=['data1'];
	function categoryController(data1)
	{
		var view2 = this;
		view2.categoryArr = data1;
		console.log(data1);console.log("hello");
		
		/////////////////////Pass this value to category component////////////////////////
	}

})();