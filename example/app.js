(function(){

	angular.module('NarrowItDownApp', [])
	.controller('NarrowItDownController',NarrowItDownController)
	.service('MenuSearchService',MenuSearchService)
	.directive('foundItems',foundItems);

	//////////////////////////////////////////////////////////////////////////

	function foundItems(){

		var ddo = {
			templateUrl : 'list.html',
			scope:{
				items:"<",
				onRemove:"&",
				message:"<"
			},
		};
		return ddo;
	}

	//////////////////////////////////////////////////////////////////////////
	
	NarrowItDownController.$inject=['MenuSearchService','$timeout'];
	function NarrowItDownController(MenuSearchService,$timeout){

		var ctrl=this;

		ctrl.name="";
		ctrl.message="";
		ctrl.found=[];
		var item="";
		ctrl.getItems = function(){
				
			ctrl.found = MenuSearchService.getMatchedMenuItems(ctrl.name);

			$timeout(function(){
				if(ctrl.found=="")
					ctrl.message="Nothing Found";
			},1000);


		};

		ctrl.removeItems = function(item){
			 ctrl.found.splice(item,1) ;
			 if(ctrl.found=="")
			 	ctrl.message="All items deleted";
		};
	}

	/////////////////////////////////////////////////////////////////////////

	MenuSearchService.$inject=['$http','$timeout'];
	function MenuSearchService($http,$timeout){
		
		var service=this;
		var items = [];
		service.getHTTP= function()
		{
			var promise = $http({

					method:"GET",
					url:"https://davids-restaurant.herokuapp.com/menu_items.json"
				});
			return promise;
		}	
		service.getMatchedMenuItems = function(searchTerm) {
				items=[];
				
				searchTerm = searchTerm.trim().toLowerCase();
	
				var promise = service.getHTTP();
				promise.then(function(response){
					if(searchTerm!=="")
						{
							console.log(response);
						for(var i=0;i<response.data.menu_items.length;i++){

							if ( response.data.menu_items[i].description.toLowerCase().indexOf(searchTerm) !== -1 ){
							
								items.push(response.data.menu_items[i]);
						
							}
						}
					}
			
				})
				.catch(function(errorMsg){
					console.log("Error");
					
				});
			
				return items;				
		};



	}

	/////////////////////////////////////////////////////////////////////////


})();