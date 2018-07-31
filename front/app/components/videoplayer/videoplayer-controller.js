angular.module('videoStats').controller('videoPlayerController', ["$window", "$document", "utils", videoPlayerController]);

function videoPlayerController($window, $document, utils) {
    var vm = this;


    /**
     * Prompt user for a new note
     */
    vm.createNote = function () {
        var time = vm.player.getCurrentTime();
        var note = prompt("Enter note at time " + utils.getFormattedTime(time));
        if (note) {
            vm.onAddNote({
                note: note,
                time: time
            });
        }
    }

    vm.$onChanges = function (changes) {
        if (!vm.player) {
            return;
        }

        if (changes.videoId) {
            var videoId = utils.parseVideoId(changes.videoId.currentValue);
            vm.player.loadVideoById({
                videoId: videoId
            });
        }

        if (changes.jumpToTime) {
            vm.player.seekTo(changes.jumpToTime.currentValue);
        }
    }

    /**
     * Add youtube player
     * @type {ActiveX.IXMLDOMElement | HTMLScriptElement | HTMLElement}
     */
    var tag = $document[0].createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = $document[0].getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // 3. This function creates an <iframe> (and YouTube player)
    //    after the API code downloads.
    var player;
    $window.onYouTubeIframeAPIReady = function () {
        player = new YT.Player('videoframe', {
            height: '390',
            width: '640',
            videoId: vm.videoId,
            events: {
                'onReady': onPlayerReady
            }
        });
        vm.player = player;
    }

    function onPlayerReady() {
        //handle keypresses and do corresponding actions
        //TODO: new note entry on keypresses other than spacebar
        $window.addEventListener("keypress", function (e) {
            if (e.which == 32) {
                if (vm.player.getPlayerState() === 1) {
                    vm.player.pauseVideo();
                } else {
                    vm.player.playVideo();
                }
            }
            return;
        });


    }
}