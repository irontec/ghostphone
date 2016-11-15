export class ConfigController {
  constructor ($scope, $timeout, $rootScope, jsSIPWrapper, jsSIPConfig) {
    'ngInject';


    this.jssip = jsSIPWrapper;
    this.jssipConfig = jsSIPConfig;

    this.$timeout = $timeout;

    this.activate();
    this.isConnected = () => this.jssip.isConnected();

    

    this.data = this.jssipConfig.getData();

    $rootScope.$on('statusUpdated', (event, data) => $timeout({


    }));


    $scope.$watch(() => this.jssipConfig.getData(), this.configChanged(), true);
    

    /*setInterval(() => {

        console.log(this.isConnected());
        $scope.$watch(() => this.isConnected(), this.connectionChanged(), false);

    }, 1000);*/


    //$scope.$watch(() => this.isConnected(), this.connectionChanged(), false);


  }

  activate() {
    this.jssip.checkConnection();
  }

  disconnect() {
    this.jssip.disconnect();
    this.$timeout({},1000);
  }

  connect() {
    this.jssip.connect();
    this.$timeout({},1000);

  }

  connectionChanged () {
    console.log("CONNN CHANGED!");
    this.$timeout({});
  }

  configChanged() {

    this.$timeout({});

    return () => {
      if (this.data.save) {
        this.jssipConfig.remember();
      } else {
        this.jssipConfig.forget();
      }
    };
  }

}
