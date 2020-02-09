(function(){

	angular.module('LunchCheck',[])
	.controller('MyController1',LunchCheckController);
	LunchCheckController.$inject=['$scope'];
	function LunchCheckController($scope){
		
		$scope.name="";
		$scope.message="";
		$scope.countItems = function(){
			//$scope.message=items($scope.name);
			var count = items($scope.name);
			if(count==0)
			{
				$scope.message="Please enter data first";	
			}
			else if(count<=3)
			{
				$scope.message="Enjoy!";
			}
			else
			{
				$scope.message="Too much!";	
			}
		}

		function items(string){
			var count=0;
			
			var i=string.split(',');

			for(x=0;x<i.length;x++)
				count++;
			
			if(string=="")
				count=0;

			return count;
		}

	};


})();