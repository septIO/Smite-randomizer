var app = angular.module('smite', []);

app.controller('mainController', ['$scope', '$http', function ($scope, $http) {
  $scope.selectedGod;
  $scope.settings = {
    magical : true,
    physical : true,
    globalStrats : true,
    godStrats : true
  }
  
  var settings = $scope.settings;
  
  $http.get('/js/gods.json').then(function(res){
    $scope.gods = res.data;
  });
  $http.get('/js/general.json').then(function(res){
    $scope.globalStrats = res.data;
  });
  
  $scope.randomize = function(){
    var g = $scope.gods[$scope.getRandomKey($scope.gods)];
    var strat = angular.copy($scope.globalStrats[$scope.getRandomKey($scope.globalStrats)]);
    
    if(!settings[g.damage] || !$scope.stratIsAllowed(g, strat)){
      $scope.randomize();
      return;
    }
    
    strat.name = strat.name.replace(/\$godName/g, g.name);
    $scope.selectedStrat = strat;
    $scope.selectedGod = g;
  }
  
  
  $scope.getRandomKey = function(object){
    var result;
    var count = 0;
    for (var prop in object){
        if (Math.random() < 1/++count) result = prop;
    }
    return result
  }
  
  $scope.stratIsAllowed = function(god, strat){
    console.log(god);
    console.log(strat);
    var allowed = false;  // assert a reroll from the start
    
    allowed = strat.allowedRole == 'all' || strat.allowedRole.indexOf(god.role) !== -1;
    allowed = strat.allowedPantheon == 'all' || strat.allowedPantheon.indexOf(god.pantheon) !== -1;
    console.log(allowed);
    
    return allowed;
  }
  
}]);

app.filter('fixName', function(){
  return function(input){
    if(typeof input !== 'undefined')
      return input.replace(/'/g, '').replace(/ /g, '');
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
