(function(){

	angular.module('public')
	.controller('SignUpController',SignUpController);

	SignUpController.$inject = ['MenuService','signup'];

	function SignUpController(MenuService,signup){

		var $ctrl = this;
		$ctrl.fname = "";
		$ctrl.lname = "";
		$ctrl.email="";
		$ctrl.phone="";
		$ctrl.short="";
		
		$ctrl.save = function(){
			
			var data = {};
		
			$ctrl.items=signup.menu_items;
$ctrl.completed=true;
			for(var i=0; i<$ctrl.items.length;i++)
				if($ctrl.items[i].short_name.match("^" + $ctrl.short.toUpperCase() +"$") !== null){	
					
					$ctrl.invalid=false;
					$ctrl.index=i;
					break;
				}
				else
				{	
					$ctrl.invalid=true;					
				}
			data=MenuService.register($ctrl.invalid,$ctrl.fname,$ctrl.lname,$ctrl.email,$ctrl.phone,$ctrl.items[$ctrl.index]);			
			
		};
	}
	
})();