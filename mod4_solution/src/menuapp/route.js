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
		////////////////////////////////////////////////////////////////////////////
		.state('categories',{   
			url : '/categories',
			templateUrl : 'template/view2.html',
			controller : 'categoryController as view2',
			resolve : {
				data1 : ['MenuDataService' ,'$timeout', '$q', function(MenuDataService,$timeout,$q){
								
					var arr1=[];
					
					var promise1 = MenuDataService.getAllCategories();

					
						promise1.then(function(response){

						arr1=[];
						for(var i=0; i<response.data.length;i++)
						{
							arr1.push(response.data[i]);	
						}
			
					})
					.catch(function(errorMsg){
						console.log("Error");
					});

					var deferred = $q.defer();

    				// Wait 2 seconds before returning
    				$timeout(function () {
      				// deferred.reject(items);
      					deferred.resolve(arr1);
    				}, 2000);

    				return deferred.promise;
					
				}]
			}

		})
		////////////////////////////////////////////////////////////////////////////
		.state('categories.items',{
			url : '/items/{param1}',
			templateUrl : 'template/view3.html',
			controller : 'itemController as view3',
			resolve : {
				data2 : ['$stateParams', 'MenuDataService', '$timeout', '$q', 
				function($stateParams, MenuDataService, $timeout, $q){
					
					var arr2=[];
					var selection = $stateParams.param1;
					var promise2 = MenuDataService.getItemsForCategory(selection);
					
					promise2.then(function(response){

						arr2=[];
						
						for(var i=0;i<response.data.menu_items.length;i++){

							if ( response.data.menu_items[i].short_name.includes(selection,0) ){
							
									arr2.push(response.data.menu_items[i]);
									
						
							}
						}
			
					})
					.catch(function(errorMsg){
						console.log("Error");
					});
					
					var deferred = $q.defer();

    				// Wait 2 seconds before returning
    				$timeout(function () {
      				// deferred.reject(items);
      					deferred.resolve(arr2);
    				}, 2000);

    				return deferred.promise;

				}]
			}
		});

	}


})();