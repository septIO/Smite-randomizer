var app = angular.module('smite', ['ngSanitize']);

app.controller('mainController', ['$scope', '$http', function ($scope, $http) {
  $scope.selectedGod;
  $scope.settings = {
    magical : true,
    physical : true,
    globalStrats : true,
    godStrats : true,
    god : 'vamana'
  }
  
  var settings = $scope.settings;
  
  $http.get('/js/gods.json').then(function(res){
    $scope.gods = res.data;
  });
  $http.get('/js/strats.json').then(function(res){
    $scope.globalStrats = res.data;
  });
  
  $scope.randomize = function(){
    var g = $scope.gods[$scope.getRandomKey($scope.gods)];
    var strat = angular.copy($scope.globalStrats[$scope.getRandomKey($scope.globalStrats)]);
    
    if(!settings[g.damage] || !$scope.stratIsAllowed(g, strat)){
      $scope.randomize();
      return;
    }
    
    strat.name = strat.name.replace(/\$godName/gi, g.name);
    strat.description = strat.description.replace(/\$br/gi, '<br />');
    var m = /\$random (\d)-(\d)/gi.exec(strat.description);
    
    if(m)strat.description = strat.description.replace(/\$random \d-\d/g, randomIntFromInterval(parseInt(m[1]), parseInt(m[2])))
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
    var allowed = false;  // assert a reroll from the start
    window.t = strat.name;
    allowed = strat.allowedRoles == 'all' || strat.allowedRoles.indexOf(god.role) !== -1;
    allowed = strat.allowedPantheons == 'all' || strat.allowedPantheons.indexOf(god.pantheon) !== -1;
    allowed = strat.allowedGods == 'all' || strat.allowedGods.indexOf(god.name) !== -1;
    
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

function randomIntFromInterval(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}
