export class CallsController {
  constructor ($timeout, jsSIPWrapper) {
    'ngInject';

    
    this.jssip = jsSIPWrapper;
    
    this.activate();
    this.connected = () => jsSIPWrapper.isConnected();
        


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
