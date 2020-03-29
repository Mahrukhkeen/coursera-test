(function(){

	angular.module('public')
	.controller('InfoController',InfoController);

	InfoController.$inject = ['MenuService','ApiPath'];
	function InfoController(MenuService,ApiPath){

		var $ctrl = this;
		$ctrl.information={};
		$ctrl.empty=true;
		$ctrl.information=MenuService.checkInfo();
		$ctrl.basePath = ApiPath;
		$ctrl.menuItem=$ctrl.information.items;
		
		// $ctrl.empty=!$ctrl.information.in;		
		// console.log("in value   = "+$ctrl.empty);
		 if($ctrl.information.id=="")
		 	$ctrl.empty=true;
		 else
		 	$ctrl.empty=false;

	}
	
})();