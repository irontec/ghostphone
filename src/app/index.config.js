export function config ($logProvider, localStorageServiceProvider, $mdThemingProvider) {
  'ngInject';
  // Enable log
  $logProvider.debugEnabled(true);


  localStorageServiceProvider.setPrefix('ghostPhone');

  $mdThemingProvider.theme('default')
    .primaryPalette('pink')
    .accentPalette('orange');

}
