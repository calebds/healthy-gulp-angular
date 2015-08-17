try {
  module = angular.module('healthyGulpAngularAppComponents');
} catch (e) {
  module = angular.module('healthyGulpAngularAppComponents', []);
}

module.directive('demoComponent', [function() {
        return {
            restrict: 'A',
            templateUrl: 'components/demoComponent/demoComponent.html'
        };
    }]);
