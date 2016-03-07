(function(angular) {
    "use strict";

    function rutValidatorDirective(rutApi) {

        function rutValidatorLinker(scope, elem, attr, ngModel) {
            function validator(value){
                var isRutValid = rutApi.isRutValid(value);
                ngModel.$setValidity("rutValidator", isRutValid);
                return isRutValid;
            }
            ngModel.$parsers.unshift(function(value) {
                var isRutValid = validator(value);
                return isRutValid ? value : undefined;
            });

            ngModel.$formatters.unshift(function(value) {
                validator(value);
                return value;
            });
        }

        return {
            restrict: "A",
            require: "ngModel",
            link: rutValidatorLinker
        };
    }

    rutValidatorDirective.$inject = ["rutApi"];

    angular
        .module("mjr.rut")
        .directive("rutValidator", rutValidatorDirective);
})(angular);
