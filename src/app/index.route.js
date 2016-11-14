export function routerConfig ($stateProvider, $urlRouterProvider) {
  'ngInject';
  $stateProvider
    .state('pad', {
      url: '/pad',
      templateUrl: 'app/pad/pad.html',
      controller: 'PadController',
      controllerAs: 'vm'
    })
    .state('calls', {
      url: '/calls',
      templateUrl: 'app/calls/calls.html',
      controller: 'CallsController',
      controllerAs: 'vm'
    })
    .state('config', {
      url: '/config',
      templateUrl: 'app/config/config.html',
      controller: 'ConfigController',
      controllerAs: 'vm'
    });

  $urlRouterProvider.otherwise('/pad');
}
