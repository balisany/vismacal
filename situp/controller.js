app.controller('sitUpCtrl', function ($scope, $log) {
     $scope.message = 'situp';
   
    var clientId = '426029628066-geprn7faca1ifrfn1psbqhfdvtcf5dm9.apps.googleusercontent.com';
    var scopes = ['https://www.googleapis.com/auth/calendar'];
    $scope.eventlist = {};


/**
       * Check if current user has authorized this application.
       */
/*
    function checkAuth() {
        gapi.auth.authorize(
          {
            'client_id': clientId,
            'scope': scopes.join(' '),
            'immediate': true
          }, handleAuthResult);
      }
 */


    function handleAuthResult(authResult) {
        //console.log(authResult);
        var authorizeButton = document.getElementById('authorize-div');
        if (authResult && !authResult.error) {
           authorizeButton.style.display = 'none';
            makeApiCall();
        } else {
            authorizeButton.style.display = 'inline';
        }
    }
 
    $scope.handleAuthClick=function (event) {
        gapi.auth.authorize(
            {
                client_id: clientId, 
                scope: scopes, 
                immediate: false}
            , handleAuthResult);
        return false;
    }


    function makeApiCall() {
        gapi.client.load('calendar', 'v3', function() {
            var request = gapi.client.calendar.calendarList.list();
            request.execute(function(resp){
                $.each( resp.items, function( key, value ) {
                  //  console.log(resp.items[key]);
                });
            });
            var request1 = gapi.client.calendar.events.list({
                'calendarId': 'visma.com_puqel1o7lrsgght193npcimt5k@group.calendar.google.com',
                    'timeMin': (new Date()).toISOString(),
                      'showDeleted': false,
                      'singleEvents': true,
                      'maxResults': 10,
                      'orderBy': 'startTime'
               // 'timeMin': '2015-12-23T04:26:52.000Z'//Suppose that you want get data after 23 Dec 2014
             });
            request1.execute(function(resp){

                var events = resp.items;
                if(events.length > 0){
                for (i = 0; i < events.length; i++) {
                  //  $scope.eventlist['eventName'].push(events[i].summary);
                    console.log(events[i].summary);
                }

                    
                }

                //$scope.eventlist.push(resp.items.summary);
                $.each( resp.items, function( key, value ) {
                   // console.log(resp.items[key].summary + " " + resp.items[key].start.dateTime );// here you give all events from google calendar
                   // $scope.eventlist.push(resp.items[key].summary);
                   
                });
                 console.log($scope.eventlist);
            });
        });
    } 
 
});