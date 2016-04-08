var demo =angular.module("demo", [
	"asofdate"
]);
demo.controller("asofdateController",["$scope",
function($scope){
  $scope.options1= {year:2011,factor:.94,isActive:0};
  $scope.vals1 =[0,0,0,0,0,0,0,0,0,0,0,110];
  $scope.options2= {year:2012,factor:0.95,isActive:0};
  $scope.vals2 =[119.2,55,119,119,119,123,119,119,100,119,200,120];
  $scope.options3= {year:2013,factor:0.95,isActive:0};
  $scope.vals3 =[119.2,55,119,119,111,119,119,119,100,119,119,130];
  $scope.options4={year:2014,factor:0.95,isActive:0};
  $scope.vals4 =[119.2,55,119,119,119,119,119,119,100,121,119,130];
  $scope.options5= {year:2015,factor:0.95,isActive:1};
  $scope.vals5 =[119.2,55,119,119,119,119,119,119,100,121,119,130];
}])
