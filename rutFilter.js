(function(angular){
    "use strict";
    
    function rutFilter(rutApi) {
        return function (input) {
            var formattedRut = rutApi.format(input);
            return formattedRut;
        }
    }
    
    rutFilter.$inject = ["rutApi"];
    
    angular
        .module("mjr.rut")
        .filter("rutFilter", rutFilter);
})(angular);
