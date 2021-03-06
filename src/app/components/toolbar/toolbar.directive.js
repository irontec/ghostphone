export function ToolbarDirective() {
  'ngInject';

  let directive = {
    restrict: 'E',
    templateUrl: 'app/components/toolbar/toolbar.html',
    scope: {
    },
    controller: ToolBarController,
    controllerAs: 'vm',
    bindToController: true
  };

  return directive;
}

class ToolBarController {
  constructor (jsSIPWrapper) {
    'ngInject';

    this.title = 'GhostPhone';
    this.who = function() {
      let w = jsSIPWrapper.whoami;
      if (w !== '') {
        return ' como ' + w;
      }
      return '';
    };
    
    this.connected = () => jsSIPWrapper.isConnected();
    

  }
}
