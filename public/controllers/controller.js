
var app = angular.module('chatApp', []);

app.factory('socket', function(){
	return io.connect('http://localhost:8000')
});

app.controller('ChatCtrl', ['$scope', 'socket', function($scope, socket){
	console.log("Init controller")

	$scope.messages = []

	$scope.sendMessage = function (){
		socket.emit('send message', $scope.message.txt)
		$scope.message.txt = ''
	}

	socket.on('get message', function(data){
		$scope.messages.push(data)
		$scope.$digest()
	})

}]);
