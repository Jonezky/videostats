angular.
module('videoStats').
component('noteList', {
    templateUrl: "components/notelist/notelist.html",
    controller: "notesController",
    controllerAs: 'vm',
    bindings: {
        notes: '<',
        onNoteClick: '&'
    }
});