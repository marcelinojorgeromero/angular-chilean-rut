(function(angular) {
    "use strict";
    
    function mainCtrl(){
        var vm = this;
        vm.rutmodel = "183073982";
    }
    
    angular
        .module("app", [
            "mjr.rut"
        ])
        .controller("mainCtrl", mainCtrl);
})(angular);
