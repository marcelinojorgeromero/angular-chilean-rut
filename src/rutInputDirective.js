(function(angular) {
    "use strict";

    function rutInput() {

        return {
            restrict: "EA",
            require: "?ngModel",
            templateUrl: "rutInputTemplate.html",
            scope: {
                formatOptions: "@"
            }
        };
    }

    angular
        .module("mjr.rut")
        .directive("rutInput", rutInput);
})(angular);

