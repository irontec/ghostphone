export class CallsController {
  constructor ($timeout, $rootScope, jsSIPWrapper, moment) {
    'ngInject';


    this.jssip = jsSIPWrapper;

    this.activate();
    this.connected = () => jsSIPWrapper.isConnected();

    this.calls = this.jssip.getCalls();

    // TODO: desinfectar!
    $rootScope.$on('callsUpdated', (event, data) => $timeout({}));

    var foo = [
      {
          type: 'IN',
          target: '695161132',
          date: moment().format('DD/MM/YYYY HH:mm:ss'),
          status: 'active',

          duration: '00:60'
      },
      {
          type: 'OUT',
          target: '695161132',
          date: moment().format('DD/MM/YYYY HH:mm:ss'),
          status: 'paused',
          duration: '00:60'
      },
      {
          type: 'MISSED',
          target: '695161132',
          date: moment().format('DD/MM/YYYY HH:mm:ss'),
          status: 'finished',
          duration: '00:60'
      },
      {
          type: 'IN',
          target: '695161132',
          date: moment().format('DD/MM/YYYY HH:mm:ss'),
          status: 'finished',
          duration: '00:60'
      },

    ];


  }


  activate() {
    this.jssip.checkConnection();
  }


  makeCall(call) {
    this.jssip.call(call.target);

  }

}
