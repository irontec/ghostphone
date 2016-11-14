export function NavbarDirective() {
  'ngInject';

  let directive = {
    restrict: 'E',
    templateUrl: 'app/components/navbar/navbar.html',
    scope: {
    },
    controller: NavbarController,
    controllerAs: 'vm',
    bindToController: true
  };

  return directive;
}

class NavbarController {
  constructor ($state) {
    'ngInject';

    this.$state = $state;


    this.tabs = [
      {
        icon: 'dialpad',
        label: 'Teléfono',
        state: 'pad'
      },
      {
        icon: 'reorder',
        label: 'Llamadas',
        state: 'calls'
      },
      {
        icon: 'settings',
        label: 'Configuración',
        state: 'config'
      },
    ];



  }

  onSelectTab(tab) {
    this.$state.go(tab.state);
  }

  onDeselectTab(tab) {
  }

  isSeletected(tab) {
    return tab.state === this.$state.current.name;
  }
}
