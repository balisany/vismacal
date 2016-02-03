services.factory('$calendar', function($http) {
  return{
    list: function(maxresults) {
      // Set default parameter value
      maxresults = maxresults || 1;
      return $http.jsonp("http://www.google.com/calendar/feeds/visma.com_puqel1o7lrsgght193npcimt5k@group.calendar.google.com/public/full?alt=json-in-script&callback=JSON_CALLBACK&orderby=starttime&max-results=" + maxresults + "&singleevents=true&sortorder=ascending&futureevents=true");
    }
  }
});