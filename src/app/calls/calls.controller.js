export class CallsController {
  constructor ($timeout, $window, $rootScope, $mdDialog, jsSIPWrapper, moment, localStorageService) {
    'ngInject';

    this.$mdDialog = $mdDialog;
    this.$document = $window.document;
    this.localStorageService = localStorageService;
    this.jssip = jsSIPWrapper;
    this.activate();
    this.connected = () => jsSIPWrapper.isConnected();

    this.calls = this.jssip.getCalls();

    // TODO: desinfectar!
    $rootScope.$on('callsUpdated', () => {
    
      this.calls = this.jssip.getCalls();
      
      $timeout(()=>{
        this.localStorageService.set("callList", this.calls.map((c)=>c.doExport()));
      });

    });
   

  }


  activate() {
    this.jssip.checkConnection();
  }


  makeCall(call) {
    this.jssip.call(call.target);
  }

  cleanCallList() {
    
    let confirm = this.$mdDialog.confirm()
          .title('¿Deseas eliminar la lista de llamadas?')
          .parent(angular.element(this.$document.querySelector('md-list')))
          .clickOutsideToClose(true)
          .textContent('Todas las llamadas se eliminarán de GhostPhone.')
          .ok('Continuar')
          .cancel('Cancelar');

    this.$mdDialog.show(confirm).then(() => this.jssip.deleteStoredCallList());

  }



}
