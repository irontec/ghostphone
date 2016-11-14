export class ConfigController {
  constructor ($scope, $interval, jsSIPWrapper, jsSIPConfig) {
    'ngInject';


    this.jssip = jsSIPWrapper;
    this.jssipConfig = jsSIPConfig;

    this.activate();
    this.connected = () => jsSIPWrapper.isConnected();

    this.data = this.jssipConfig.getData();
    $scope.$watch(() => this.jssipConfig.getData(), this.configChanged(), true);


  }

  activate() {
    this.jssip.checkConnection();
  }

  disconnect() {
    this.jssip.disconnect();
  }

  connect() {
    this.jssip.connect();
  }

  configChanged() {
    return () => {
      if (this.data.save) {
        this.jssipConfig.remember();
      } else {
        this.jssipConfig.forget();
      }
    };
  }

}
