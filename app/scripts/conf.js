angular.module('app')
    .config(['$stateProvider','$urlRouterProvider',function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/home');
        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'views/home.tpl.html',
                controller: 'HomeController'
            })
            .state('statistics', {
                url: '/statistics',
                templateUrl: 'views/statistics.tpl.html',
                controller: 'StatisticsController'
            })
            .state('about', {
                url: '/statistics',
                templateUrl: 'views/about.tpl.html',
                controller: 'AboutController'
            })
            .state('game', {
                url: '/game',
                templateUrl: 'views/game.tpl.html'
            })
            .state('stage', {
                url: '/game/:stage',
                templateUrl: 'views/question.tpl.html'
            })
            .state('ready', {
                templateUrl: 'views/ready.tpl.html'
            })
            .state('finish', {
                templateUrl: 'views/finish.tpl.html'
            });
    }]);