angular.module('videoStats', []).controller('appController', ['$scope', appController]);

function appController($scope){
    $scope.videoId = 'F0A7WtCj7yc';
    $scope.newVideoId = null;
    $scope.notes = [];
    $scope.jumpToTime = null;

    $scope.noteClicked = function(time){
        //use number object instead of primitive to make child components notice changes
        $scope.jumpToTime = new Number(time);
    }

    $scope.addNote = function(note, time){
        $scope.notes.push({
            note: note,
            time: time
        });
        console.log($scope.notes);
    }

    $scope.loadVideo = function(){
        $scope.notes = [];
        $scope.videoId = $scope.newVideoId;
    }



}