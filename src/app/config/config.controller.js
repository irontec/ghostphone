export class ConfigController {
  constructor ($scope, $timeout, $rootScope, jsSIPWrapper, jsSIPConfig) {
    'ngInject';


    this.$scope = $scope;
    this.jssip = jsSIPWrapper;
    this.jssipConfig = jsSIPConfig;

    this.$timeout = $timeout;
    this.$rootScope = $rootScope;


    this.connecting = false;
    this.disconnecting = false;

    this.activate();



    this.isConnected = () => {
        
        return this.jssip.isConnected();

    };

    

    this.data = this.jssipConfig.getData();
    

    $rootScope.$on('statusUpdated', (event, data) => {
      if (data == "connected") {
        this.connecting = false;
      }
      if (data == "disconnected") {
        this.disconnecting = false;
      }
      $timeout({})
    });


    $scope.$watch(() => this.jssipConfig.getData(), this.configChanged(), true);

    $scope.$watch(() => this.connecting, () => {

         $timeout({});

    }, true);

    $scope.$watch(() => this.disconnecting, () => {

         $timeout({});

    }, true);


  }

  activate() {
    this.jssip.checkConnection();
  }

  disconnect() {
    this.disconnecting = true;
    this.jssip.disconnect();
  }

  connect() {
    this.connecting = true;
    this.jssip.connect();
  }

  connectionChanged () {
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
