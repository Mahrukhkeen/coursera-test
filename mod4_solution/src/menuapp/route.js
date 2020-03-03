(function(){

	angular.module('MenuApp')
	.config(RoutesConfig);

	RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
	function RoutesConfig($stateProvider, $urlRouterProvider) {

  	// Redirect to home page if no other URL matches
  	$urlRouterProvider.otherwise('/');

  	// *** Set up UI states ***
  	$stateProvider

  		.state('home',{
			url : '/',
			templateUrl : 'template/view1.html'
		})
		
		.state('categories',{   
			url : '/categories',
			templateUrl : 'template/view2.html',
			controller : 'categoryController as view2',
			resolve : {
				data1 : ['MenuDataService', function(MenuDataService){
								
					var arr1=[];
					
					var promise1 = MenuDataService.getAllCategories();
					promise1.then(function(response){

						arr1=[];
						for(var i=0; i<response.data.length;i++)
						{
							arr1.push(response.data[i]);
							console.log(response.data[i].name);	
						}
			
					})
					.catch(function(errorMsg){
						console.log("Error");
					});
					console.log("returning");
					return arr1;
				}]
			}

		})
		
		.state('categories.items',{
			url : '/items/{param1}',
			templateUrl : 'template/view3.html',
			controller : 'itemController as view3',
			resolve : {
				data2 : ['$stateParams', 'MenuDataService', function($stateParams, MenuDataService){
					
					var arr2=[];
					var selection = $stateParams.param1;
					var promise2 = MenuDataService.getItemsForCategory(selection);
					
					promise2.then(function(response){

						arr2=[];
						console.log(response);
						for(var i=0;i<response.data.menu_items.length;i++){

							if ( response.data.menu_items[i].short_name.toLowerCase().indexOf(selection) !== -1 ){//correction required
							
									arr2.push(response.data.menu_items[i]);
						
							}
						}
			
					})
					.catch(function(errorMsg){
						console.log("Error");
					});
			
					return arr2;
				}]
			}
		});

	}


})();