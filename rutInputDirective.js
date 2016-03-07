(function(angular) {
    "use strict";

    function rutInput(rutValidator) {
        
        return {
            restrict: "EA",
            require: "?ngModel",
            templateUrl: "rutInput.html"
        };
    }

    rutInput.$inject = ["rutValidator"];

    angular
        .module("mjr.rut")
        .directive("rutInput", rutInput);
})(angular);
//rutValidator.format(newValue);