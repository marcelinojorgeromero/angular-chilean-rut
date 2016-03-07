(function(angular){
    "use strict";

    function rutFormatterDirective(rutApi){
        function rutFormatterLinker(scope, elem, attrs, ctrl) {
            if (!ctrl) return;

            var defaultFormatInstructions = {
                formatBody: true,
                formatDv: true,
                bodyDelimiter: ".",
                dvDelimiter: "-"
            };

            var userFormatInstructions;
            try {
                userFormatInstructions = JSON.parse(attrs.rutFormatter);
            } catch (ex){
                throw "format options are not in a valid json format.";
            }

            var formatInstructions = angular.extend({}, defaultFormatInstructions, userFormatInstructions);

            ctrl.$formatters.unshift(function() {
                var formatted = rutApi.format(ctrl.$modelValue);
                return formatted;
            });

            ctrl.$parsers.unshift(function(viewValue) {
                var formattedRut = rutApi.format(viewValue);
                elem.val(formattedRut);
                return formattedRut;
            });
        }

        return {
            restrict: "A",
            require: "?ngModel",
            link: rutFormatterLinker
        };
    }

    rutFormatterDirective.$inject = ["rutApi"];

    angular
        .module("mjr.rut")
        .directive("rutFormatter", rutFormatterDirective);
})(angular);
