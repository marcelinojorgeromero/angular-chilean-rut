(function(angular) {
    "use strict";

    function rutValidatorDirective(rutHelper) {

        function rutValidatorLinker(scope, elem, attr, ngModel) {

            //For DOM -> model validation
            ngModel.$parsers.unshift(function(value) {
                var isRutValid = rutHelper.isRutValid(value);
                ngModel.$setValidity("rutValidator", isRutValid);
                 return isRutValid ? value : undefined;
            });

            //For model -> DOM validation
            ngModel.$formatters.unshift(function(value) {
                var isRutValid = rutHelper.isRutValid(value);
                ngModel.$setValidity("rutValidator", isRutValid);
                return value;
            });
        }

        return {
            restrict: "A",
            require: "ngModel",
            link: rutValidatorLinker
        };
    }

    rutValidatorDirective.$inject = ["rutHelper"];

    angular
        .module("mjr.rut")
        .directive("rutValidator", rutValidatorDirective);
})(angular);