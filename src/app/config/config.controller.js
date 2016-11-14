export class ConfigController {
  constructor ($timeout, jsSIPWrapper, toastr) {
    'ngInject';



    this.jssip = jsSIPWrapper;
    this.activate();
    this.connected = () => jsSIPWrapper.isConnected();

  }

  activate(jsSIPWrapper) {

    this.jssip.checkConnection();

  }

  disconnect() {
    this.jssip.disconnect();
  }

  connect() {
    this.jssip.connect();
  }

}
