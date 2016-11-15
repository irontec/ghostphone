export class CallsController {
  constructor ($timeout, jsSIPWrapper, moment) {
    'ngInject';

    
    this.jssip = jsSIPWrapper;
    
    this.activate();
    this.connected = () => jsSIPWrapper.isConnected();
    this.calls = [
      {
          type: 'IN',
          target: '695161132',
          date: moment().format('DD/MM/YYYY HH:mm:ss'),
          status: 'answered',
          duration: '00:60'
      },
      {
          type: 'OUT',
          target: '695161132',
          date: moment().format('DD/MM/YYYY HH:mm:ss'),
          status: 'answered',
          duration: '00:60'
      },
      {
          type: 'OUT',
          target: '695161132',
          date: moment().format('DD/MM/YYYY HH:mm:ss'),
          status: 'answered',
          duration: '00:60'
      },
      {
          type: 'IN',
          target: '695161132',
          date: moment().format('DD/MM/YYYY HH:mm:ss'),
          status: 'answered',
          duration: '00:60'
      },

    ];


  }

  activate() {
    this.jssip.checkConnection();
  }

  getWebDevTec(webDevTec) {
    this.awesomeThings = webDevTec.getTec();

    angular.forEach(this.awesomeThings, (awesomeThing) => {
      awesomeThing.rank = Math.random();
    });
  }

}
