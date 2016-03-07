(function(angular){
    "use strict";
    
    function rutFilter(rutHelper) {
        return function (input) {
            var formatted = rutHelper.format(input);
            console.log("formatted rut filter: " + formatted);
            return formatted;
        }
    }
    
    rutFilter.$inject = ["rutHelper"];
    
    angular
        .module("mjr.rut")
        .filter("rutFilter", rutFilter);
})(angular);