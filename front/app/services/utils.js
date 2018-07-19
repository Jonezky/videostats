angular.module('videoStats').factory('utils', utils);

function utils(){
    return {
        getFormattedTime: getFormattedTime,
        parseVideoId: parseVideoId
    };

    /**
     * parse nicely formatted time from seconds e.g. 121 --> 2.01
     * @param time time in seconds
     * @returns {string} time in format [m]m.ss
     */
    function getFormattedTime(time) {
        var minutes = Math.floor(time / 60);
        var seconds = Math.floor(time % 60).toString().padStart(2, "0");
        return minutes.toString() + "." + seconds;
    }

    function parseVideoId(url){
        var ID = '';
        url = url.replace(/(>|<)/gi,'').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
        if(url[2] !== undefined) {
            ID = url[2].split(/[^0-9a-z_\-]/i);
            ID = ID[0];
        }
        else {
            ID = url;
        }
        return ID;
    }
}
