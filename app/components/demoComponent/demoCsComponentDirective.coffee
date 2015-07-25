try
  module = angular.module 'healthyGulpAngularAppComponents'
catch e
  module = angular.module 'healthyGulpAngularAppComponents', []

module.directive 'demoCsComponent', [ () ->
    restrict: 'A',
    templateUrl: 'components/demoComponent/demoCsComponent.html'
 ]
