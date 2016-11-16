export class JsSIPWrapperService {


  constructor ($log,$window, $state, $rootScope, $mdToast, jsSIPConfig, localStorageService, Call) {
    'ngInject';

    this.$log = $log;
    this.$rootScope = $rootScope;
    this.JsSIP = $window.JsSIP;
    this.$document = $window.document;
    this.JsSIPConfig = jsSIPConfig;
    this.localStorageService = localStorageService;

    this.ua = null;
    this.toast = $mdToast;
    this.callService = Call;
    this.whoami = '';
    this.calls = [];
    this.loadStoredCalls()

  }

  loadStoredCalls () {
    let callList = this.localStorageService.get("callList");
    
    if (callList && callList.length) {
      this.calls = callList.map((c)=>this.callService.doImport(c)).filter((c)=>c.constructor.name === 'Call') || [];
      this.$rootScope.$broadcast('callsUpdated');

    }
  }

  checkConnection(force) {
    if (this.isConnected() && !force) {
       return;
    }

    if (this.JsSIPConfig.mustAutoConnect()) {
      this.connect();
    }

  }

  isConnected() {
    return this.ua && this.ua.isConnected();
  }


  connect() {

    if (!this.JsSIPConfig.isValid()) {
      return;
    }

    let configuration = {
      uri: this.JsSIPConfig.uri,
      password: this.JsSIPConfig.password,
      ws_servers: this.JsSIPConfig.ws_servers,
      //log: { level: 'debug' },
      register: true,
      register_expires: 600,
      session_timers: true,
      connection_recovery_min_interval: 2,
      connection_recovery_max_interval: 30,
      registrar_server: '',
      no_answer_timeout: 60,
      use_preloaded_route: false,
      hack_via_tcp: false,
      hack_via_ws: false,
      hack_ip_in_contact: false
    };



    this.ua = new this.JsSIP.UA(configuration);


    this.ua.on('connected', (e) => this.notify("connected", e));
    this.ua.on('disconnected', (e) => this.notify("disconnected",e ));
    this.ua.on('connecting', (e) => this.notify("connecting",e ));
    this.ua.on('registered', (e) => this.notify("registered",e ));

    this.ua.on('newRTCSession', (e) => {
      this.calls.push(this.callService.factory(e.session));
    });
    this.ua.start();
  }

  notify (status, event) {
    this.$rootScope.$broadcast('statusUpdated', status);
    
    if (status === 'registered') {

      this.whoami = event.response.from.uri.user;

      this.toast.show(
          this.toast.simple()
            .parent(angular.element(this.$document.querySelector('md-content')))
            .textContent(`conectando como ${this.whoami}`)
            .capsule(true)
            .position('bottom')
            .hideDelay(3000)
      );
    }

    if (status === 'disconnected') {
      this.toast.show(
          this.toast.simple()
            .parent(angular.element(this.$document.querySelector('md-content')))
            .textContent('Desconectado del servidor :(')
            .capsule(true)
            .position('bottom')
            .hideDelay(3000)
      );
    }
  }


  disconnect() {
    this.ua.unregister({all: true});
    this.ua.stop();
  }

  getUA() {
    return this.ua;
  }

  getCalls() {
    return this.calls;
  }

  deleteStoredCallList() {
    this.calls = [];
    this.localStorageService.remove("callList");
    this.$rootScope.$broadcast('callsUpdated');
  }

  call(target) {
    this.ua.call(target, {
      extraHeaders: [
        'X-Can-Renegotiate: ' + String(this.JsSIP.rtcninja.canRenegotiate)
      ],
      mediaConstraints: {'audio': true, 'video': false},
      pcConfig: { "iceServers": [ {"urls": ["stun:stun.l.google.com:19302"]} ], "gatheringTimeout": 2000 },
      rtcOfferConstraints: {
        offerToReceiveAudio: 1,
        offerToReceiveVideo: 0
      }
    });
  }

}
