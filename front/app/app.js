angular.module('videoStats', []).controller('appController', ['$scope', appController]);

function appController($scope){
    $scope.videoId = '0UHwkfhwjsk';
    $scope.newVideoId = null;
    $scope.notes = [];
    $scope.jumpToTime = null;

    $scope.noteClicked = function(time){
        //use number object instead of primitive to make child components notice changes
        $scope.jumpToTime = new Number(time);
    }
    /**
     * Add a new note
     * @param note note to be added
     * @param time current time on video
     */
    $scope.addNote = function(note, time){
        $scope.notes.push({
            note: note,
            time: time
        });
        console.log($scope.notes);
    }

    /**
     * Load new video to video player and clear the notes
     */
    $scope.loadVideo = function(){
        $scope.notes = [];
        $scope.videoId = $scope.newVideoId;
    }



}