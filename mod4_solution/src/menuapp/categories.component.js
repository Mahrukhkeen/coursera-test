(function(){

	angular.module('MenuApp')
	.component('categories',{
		templateUrl : 'template/category.html',

		bindings : {

			itemCategory:'<'
		}	
	});
	

})();