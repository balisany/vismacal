"use strict"
//Define an angular module for our app
var app = angular.module('vismaCalApp', ['ngRoute', 'angular.filter']);
 
app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/Intern', {
        templateUrl: 'intern/index.html',
        controller: 'sitUpCtrl'
    }).
      when('/SitUp', {
        templateUrl: 'situp/index.html',
        controller: 'sitUpCtrl'
      }).
        when('/Faggruppe', {
        templateUrl: 'faggruppe/index.html',
        controller: 'fagCtrl'
      }).
      otherwise({
        templateUrl: './frontpage.html'
      });
}]);
 

    var clientId = '426029628066-geprn7faca1ifrfn1psbqhfdvtcf5dm9.apps.googleusercontent.com';
    var scopes = ['https://www.googleapis.com/auth/calendar'];
    var apiKey = "AIzaSyALQN_VW2W4GKEM8w76RTmdrPA0LHyr4dE";

 
app.controller('internCtrl', function($scope) {
     /*
        $scope.message = 'intern';
    */
 });




app.controller('fagCtrl', function ($scope, $timeout, $log) {
 
  $scope.title = 'Faggrupe aktiviteter';
  $scope.dict = {};

   $timeout(function(){
      handleClientLoad();
    }, 600);

    function handleClientLoad() {
     gapi.client.setApiKey(apiKey);
     window.setTimeout(checkAuth, 1);
    //checkAuth();
  }

  function checkAuth() {
    gapi.auth.authorize({ client_id: clientId, scope: scopes, immediate: true }, loadAPI);
        }

      function loadAPI(){
        gapi.client.load('calendar', 'v3', makeApiCall);
      }


    function makeApiCall() {
        gapi.client.load('calendar', 'v3', function() {
           

            var request = gapi.client.calendar.events.list({
               'calendarId': 'visma.com_t0qu80qpt6ci60e4268nsrquag@group.calendar.google.com',
                      'timeMin': (new Date("2016-02-01")).toISOString(),
                      'timeMax': (new Date("2016-07-01")).toISOString(),
                      'showDeleted': false,
                      'singleEvents': true,
                    //  'maxResults': 20,
                      'orderBy': 'startTime'
               // 'timeMin': '2015-12-23T04:26:52.000Z'//Suppose that you want get data after 23 Dec 2014
             });


           // var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            var monthNames = ["jan", "feb", "mar", "apr", "mai", "jun", 
                              "jul", "aug", "sep", "okt", "nov", "des"];
            request.execute(function(resp){

                var events = resp.items;
                if(events.length > 0){
                for (var i = 0; i < events.length; i++) {
                  var key = events[i].summary;
                  var month = "";
                  if(!$scope.dict[key]){
                    $scope.dict[key] = [];
                  }
                  else{

                  }


                  var date= events[i].start.dateTime.split('T');
                  //var d = date[0].split('-');

                  var dato = new Date(date[0]);
                   //$scope.dict[key].push(date[0]);

                 // console.log(newDate);
                 
                 var d = date[0].split('-');
                 var newDate = d[2] + '.' + monthNames[dato.getMonth()];
                 $scope.dict[key].push({date:newDate});
                }

                $scope.$apply();
                }
            });
        });
    } 

 
});



app.controller('sitUpCtrl', function ($scope, $timeout, $log) {
    $scope.title = 'Situp aktiviteter';

    $scope.dict = {};


    $timeout(function(){
      handleClientLoad();
    }, 600);

    function handleClientLoad() {
     gapi.client.setApiKey(apiKey);
     window.setTimeout(checkAuth, 1);
    //checkAuth();
  }

  function checkAuth() {
    gapi.auth.authorize({ client_id: clientId, scope: scopes, immediate: true }, loadAPI);
        }

      function loadAPI(){
        gapi.client.load('calendar', 'v3', makeApiCall);
      }


    function makeApiCall() {
        gapi.client.load('calendar', 'v3', function() {
           

            var request = gapi.client.calendar.events.list({
                'calendarId': 'visma.com_puqel1o7lrsgght193npcimt5k@group.calendar.google.com',
                      'timeMin': (new Date("2016-02-01")).toISOString(),
                      'timeMax': (new Date("2016-07-01")).toISOString(),
                      'showDeleted': false,
                      'singleEvents': true,
                    //  'maxResults': 20,
                      'orderBy': 'startTime'
               // 'timeMin': '2015-12-23T04:26:52.000Z'//Suppose that you want get data after 23 Dec 2014
             });


           // var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            var monthNames = ["jan", "feb", "mar", "apr", "mai", "jun", 
                              "jul", "aug", "sep", "okt", "nov", "des"];
            request.execute(function(resp){

                var events = resp.items;
                if(events.length > 0){
                for (var i = 0; i < events.length; i++) {
                  var key = events[i].summary;
                  var month = "";
                  if(!$scope.dict[key]){
                    $scope.dict[key] = [];
                  }
                  else{

                  }


                  var date= events[i].start.dateTime.split('T');
                  //var d = date[0].split('-');

                  var dato = new Date(date[0]);
                   //$scope.dict[key].push(date[0]);

                 // console.log(newDate);
                 
                 var d = date[0].split('-');
                 var newDate = d[2] + '.' + monthNames[dato.getMonth()];
                 $scope.dict[key].push({date:newDate});
                }

                $scope.$apply();
                }
            });
        });
    } 
 



});
