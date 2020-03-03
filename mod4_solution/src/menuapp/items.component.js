(function(){

	angular.module('MenuApp')
	.component('items',{
		templateUrl : 'template/items.html',
		
		bindings : {

			itemDetail :'<'
			
		}
	});

})();