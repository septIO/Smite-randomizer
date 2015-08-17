var app = angular.module('smite', []);

app.controller('mainController', ['$scope', '$http', function ($scope, $http) {
  $scope.selectedGod;
  $scope.settings = {
    magical : true,
    physical : true
  }
  
  var settings = $scope.settings;
  
  $http.get('/js/gods.json').then(function(res){
    $scope.gods = res.data;
  })
  
  $scope.randomize = function(){
    var result;
    var count = 0;
    for (var prop in $scope.gods){
        if (Math.random() < 1/++count) result = prop;
    }
    var g = $scope.gods[result];
    
    if(!settings[g.damage]){
      $scope.randomize();
      return;
    }
    console.log(settings[g.damage]);
    
    $scope.selectedGod = $scope.gods[result];
    console.log($scope.selectedGod);
  }
  
  
}]);

app.filter('fixName', function(){
  return function(input){
    if(typeof input !== 'undefined')
      return input.replace(/'/g, '').replace(/ /g, '');
  }
});

app.filter('uppercaseName', function(){
  return function(input){
    if(typeof input !== 'undefined')
      return input.capitalize();
  }
});

app.filter('filterBySettings', function(){
  return function(god){

  }
})

String.prototype.capitalize = function(){
    return this.toLowerCase().replace( /\b\w/g, function (m) {
        return m.toUpperCase();
    });
};
