angular.module('videoStats').filter('formatTime', ["utils", function(utils){
    return function(input){
        return utils.getFormattedTime(input);
    }
}]);