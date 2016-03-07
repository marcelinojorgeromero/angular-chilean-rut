(function(angular){
    "use strict";

    angular.module("rutInputTemplate.html", []).run(["$templateCache", function($templateCache){
        $templateCache.put("rutInputTemplate.html", '<input type="text" ng-model="rutmodel" rut-validator="" rut-formatter="{{formatOptions}}" class="form-control">');
    }]);

    angular.module("app.rut.tpls", ["rutInputTemplate.html"]);
})(angular);
