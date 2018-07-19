angular.
module('videoStats').
component('videoPlayer', {
    templateUrl: "components/videoplayer/videoplayer.html",
    controller: "videoPlayerController",
    controllerAs: "vm",
    bindings: {
        videoId: '<',
        onAddNote: '&',
        jumpToTime: '<'
    }
});