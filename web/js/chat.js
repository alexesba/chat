var app = angular.module("chat", []);

app.controller("MainCtrl", ["$scope", function($scope){
  $scope.messages = [];
  var conn = new WebSocket("ws://localhost:8080/ws");
  conn.onclose = function(e){
    $scope.$apply(function(){
      $scope.messages.push('Disconnected');
    });
  }

  conn.onopen = function(e){
    $scope.$apply(function(){
      $scope.messages.push('Connected');
    });
  }

  conn.onmessage = function(e){

    $scope.$apply(function(){
      $scope.messages.push(e.data);
    });
  }

  $scope.send = function(){
    conn.send($scope.msg);
    $scope.msg = '';
  }
}]);
