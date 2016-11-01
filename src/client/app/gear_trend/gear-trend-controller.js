(function() {
  'use strict';

  var baseUrl = "http://localhost:8000/gear_trend";

  angular
    .module('gearTrend')
    .controller('gearTrendController', gearTrendController);

  gearTrendController.$inject = ['logger','$http'];
  function gearTrendController(logger,$http) {
    var gt = this;
    gt.gearTrendList = [];
    gt.years = [];
    gt.selectedYear = "";
    gt.getGearTrend = getGearTrend;

    activate();

    function activate() {
        var year = new Date().getFullYear();
        gt.selectedYear = year;
        gt.years.push(year);
        for(var i=1;i<20;i++) {
            gt.years.push(year + i);
        }
    }
    
    function getGearTrend() {
    console.log("year: "+gt.trendYear);
      return $http.get(baseUrl + "?trendYear=" + gt.selectedYear)
        .then(TrendList)
        .catch(TrendError);
    }
        
      function TrendList(response) {
          gt.gearTrendList = response.data;
      }
      
      function TrendError(error) {
          logger.error('Cannot get gear Trend '+error.data);
      }
    
    }
})();