(function () {
"use strict";

angular.module('common')
.service('MenuService', MenuService);


MenuService.$inject = ['$http', 'ApiPath'];
function MenuService($http, ApiPath) {

  // var customers = [];
  var registered = {
                in:"",
                first : "",
                last : "",
                id : "",
                ph: "",
                items:""};
  var service = this;

  service.getCategories = function () {
    return $http.get(ApiPath + '/categories.json').then(function (response) {
      return response.data;
    });
  };


  service.getMenuItems = function (category) {
    var config = {};
    if (category!="") {
      config.params = {'category': category};
      return $http.get(ApiPath + '/menu_items.json', config).then(function (response) {
      return response.data;
    });
    }
    else
      return $http.get(ApiPath + '/menu_items.json').then(function(response){
        return response.data;
      });

    
  };

  service.register = function(invalid,fname,lname,email,phone,selected){
      registered = {
                    in:invalid,
                    first:fname,
                    last:lname,
                    id:email,
                    ph:phone,
                    items:selected};
      //console.log(registered);
      // customers.push(registered);
      // //console.log(customers);
       return registered;
  };

  service.checkInfo = function(){
      return registered;
  };

}



})();
