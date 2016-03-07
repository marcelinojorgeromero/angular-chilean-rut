(function(angular){
    "use strict";
    
    function rutFormatterDirective(rutHelper, $filter){
        function rutFormatterLinker(scope, elem, attrs, ctrl) {
            if (!ctrl) {
                console.log("No ctrl!");
                return;
            }
            var defaultFormatInstructions = {
                formatBody: true,
                formatDv: true,
                bodyDelimiter: ".",
                dvDelimiter: "-"
            };

            var userFormatInstructions = JSON.parse(attrs.rutFormatter);
            var formatInstructions = angular.extend({}, defaultFormatInstructions, userFormatInstructions);

            ctrl.$formatters.unshift(function() {
                var formatted = $filter("rutFilter")(ctrl.$modelValue);
                return formatted;
            });

            ctrl.$parsers.unshift(function(viewValue) {
                var formattedRut = $filter("rutFilter")(viewValue);
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
    
    rutFormatterDirective.$inject = ["rutHelper", "$filter"];
    
    angular
        .module("mjr.rut")
        .directive("rutFormatter", rutFormatterDirective);
})(angular);