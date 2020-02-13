(function(){

	angular.module('ShoppingListCheckOff',[])
	.controller('ToBuyController', ToBuy)
	.controller('AlreadyBoughtController', Bought)
	.service('ShoppingListCheckOffService',CustomService);

//////////////////////////////////////////////////////////////////////

	ToBuy.$inject = ['ShoppingListCheckOffService'];
	function ToBuy(ShoppingListCheckOffService){

		var buy = this;
		
		buy.items=ShoppingListCheckOffService.ShowItems();
		buy.BuyItem=function(itemIndex){
			ShoppingListCheckOffService.removeItem(itemIndex);
		};
	}

/////////////////////////////////////////////////////////////////////

	Bought.$inject = ['ShoppingListCheckOffService'];
	function Bought(ShoppingListCheckOffService){

		var bought = this;
		bought.items=ShoppingListCheckOffService.ShowBoughtItems();
	}

/////////////////////////////////////////////////////////////////////

	function CustomService(){

		var service=this;
		var tobuy = [
			{ name: "Cookies", quantity: "4"},
			{ name: "Drinks", quantity: "5"},
			{ name: "Crisps", quantity: "6"},
			{ name: "Ketcup", quantity: "7"},
			{ name: "Garlic", quantity: "1"}
		];

		var bought=[];

		service.removeItem=function(itemIndex){
			
			bought.push(tobuy[itemIndex]);
			tobuy.splice(itemIndex, 1);
			
		};

		service.ShowItems=function(){
			return tobuy;
		};

		service.ShowBoughtItems=function(){
			return bought;
		};


	}

/////////////////////////////////////////////////////////////////////


})();