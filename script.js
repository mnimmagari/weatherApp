	// create the module and name it app
	var app = angular.module('mainApp', ['ngRoute']);

	// configure our routes
	app.config(function($routeProvider) {
	  $routeProvider

	    // route for the home page
	    .when('/', {
	      templateUrl: 'views/home.html',
	      controller: 'mainController'
	    })

	    // route for the about page
	    .when('/name/:name', {
	      templateUrl: 'views/weatherView.html',
	      controller: 'cityController'
	    })

	    .when('/abc',{
	    	templateUrl: 'views/dayView.html',
	    })

	});
	app.controller('mainController', function() {
	});
	app.controller('cityController', ['$scope', '$routeParams', '$http', function($scope, $routeParams, $http) {
	  $scope.name = $routeParams.name;

	  var searchTerm = $scope.name;
	  $http.get('https://api.openweathermap.org/data/2.5/forecast/daily?q=' + searchTerm + '&units=metric&cnt=5&&appid=73136fa514890c15bc4534e7b8a1c0c4').then(function(res) {
	    var data = res.data;
	    $scope.today = new Date();
	    $scope.day1 = data.list[0];
	    $scope.day2 = data.list[1];
	    $scope.day3 = data.list[2];
	    $scope.day4 = data.list[3];
	    $scope.day5 = data.list[4];
	    $scope.day1icon = "/images/" + $scope.day1.weather[0].icon + ".png";
	    $scope.day2icon = "/images/" + $scope.day2.weather[0].icon + ".png";
	    $scope.day3icon = "/images/" + $scope.day3.weather[0].icon + ".png";
	    $scope.day4icon = "/images/" + $scope.day4.weather[0].icon + ".png";
	    $scope.day5icon = "/images/" + $scope.day5.weather[0].icon + ".png";
	    console.log($scope.day1)
	    var day1 = moment.unix($scope.day1.dt);
	    var day2 = moment.unix($scope.day2.dt);
	    var day3 = moment.unix($scope.day3.dt);
	    var day4 = moment.unix($scope.day4.dt);
	    var day5 = moment.unix($scope.day5.dt);


	    $scope.day1Day = day1._d.toString();
	    $scope.day2Day = day2._d.toString();
	    $scope.day3Day = day3._d.toString();
	    $scope.day4Day = day4._d.toString();
	    $scope.day5Day = day5._d.toString();
	  })
	}]);

	app.directive('cityInput', function() {
	  return {
	    restrict: 'E',
	    scope: {},
	    templateUrl: 'views/formTmpl.html',
	    controller: function($scope, $location) {
	      $scope.getWeather = function(city) {
	        $location.path("/name/" + city);

	      }
	    }

	  }
	})