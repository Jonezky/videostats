window.onload = function () {
    //load video file
    (function localFileVideoPlayer() {
        'use strict';
        var URL = window.URL || window.webkitURL;
        var displayMessage = function (message, isError) {
            var element = document.querySelector('#message');
            element.innerHTML = message;
            element.className = isError ? 'error' : 'info';
        };
        var playSelectedFile = function (event) {
            var file = this.files[0]
            var type = file.type
            var videoNode = document.querySelector('video')
            var canPlay = videoNode.canPlayType(type)
            if (canPlay === '') canPlay = 'no'
            var message = 'Can play type "' + type + '": ' + canPlay
            var isError = canPlay === 'no'
            displayMessage(message, isError)

            if (isError) {
                return
            }

            var fileURL = URL.createObjectURL(file)
            videoNode.src = fileURL
        }
        var inputNode = document.querySelector('input')
        inputNode.addEventListener('change', playSelectedFile, false)
    })()

    //replace the old table with a new one
    
    var buildTable = function (gameEvents) {
        var newEvents = document.createElement('tbody');
        var oldEvents = document.getElementById("eventTable")

        //build a new html table using the gameEvents array
        for (var i = 0; i < gameEvents.length; i++) {
            var row = newEvents.insertRow(newEvents.length);
            var t = row.insertCell(0);
            var e = row.insertCell(1);

            t.className = 'timestamp';
            t.onclick = function (gameEvents) {
                var video = document.getElementById("vid");
                video.currentTime = parseFloat(this.innerHTML);
            };
            
            t.innerHTML = gameEvents[i][0].toFixed(2);
            e.innerHTML = gameEvents[i][1];
        };

        //Replace the old tbody with the newly created one
        newEvents.setAttribute("id", "eventTable");
        oldEvents.parentNode.replaceChild(newEvents, oldEvents);
    };

    var eventMatrix = [];

    //sort array by the specified column
    var sortArray = function (unsortedArray, column) {
        if (column > 1 || column < 0) return;
        if (unsortedArray.length === 0) return;
        unsortedArray.sort(function (a, b) {
            if (a[column] < b[column]) return -1;
            if (a[column] > b[column]) return 1;
            return 0;
        });
        //rebuild the html table using the sorted array
        buildTable(unsortedArray);
    };

    
    //handle keypresses and do corresponding actions
    $(window).keypress(function (e) {
        var video = document.getElementById("vid");
        if (e.which == 32) {
            if (video.paused) video.play();
            else video.pause();
            return;
        }
        if (!video.paused) video.pause();

        var tapahtuma = prompt("New note" + "\n" + "Enter a note or press ESC to cancel");

        if (tapahtuma || tapahtuma === 0) {
            var gameEvent = [video.currentTime, tapahtuma];
            eventMatrix.push(gameEvent);
            buildTable(eventMatrix);
        };

        video.play();
    });
    // Sort the eventMatrix by the time and redraw the html table
    document.getElementById("timeColumn").onclick = function () {
        sortArray(eventMatrix, 0);
    };

    // Sort the eventMatrix by the event alphabetically and redraw the html table
    document.getElementById("eventColumn").onclick = function () {
        sortArray(eventMatrix, 1);
    };

};
