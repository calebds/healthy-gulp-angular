angular.module('healthyGulpAngularApp', ['ui.router', 'healthyGulpAngularAppComponents'])

.config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/');

        $stateProvider

            .state('home', {
                url: '/',
                templateUrl: 'components/home.html'
            });

    }]);
