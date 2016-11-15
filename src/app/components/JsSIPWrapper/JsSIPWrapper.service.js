export class JsSIPWrapperService {

  constructor ($log,$window, $rootScope, $mdToast, jsSIPConfig, Call) {
    'ngInject';

    this.$log = $log;
    this.$rootScope = $rootScope;
    this.JsSIP = $window.JsSIP;
    this.JsSIPConfig = jsSIPConfig;
    this.ua = null;
    this.toast = $mdToast;
    this.callService = Call;
    this.calls = [];


  }

  checkConnection(force) {
    if (this.isConnected() && !force) {
       return;
    }

    if (this.JsSIPConfig.mustAutoConnect()) {
       this.toast.show(
          this.toast.simple()
            .textContent('conectando!')
            .capsule(true)
            .position('bottom')
            .hideDelay(30000)
        );
  
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


    console.log(configuration);

    this.ua = new this.JsSIP.UA(configuration);


    this.ua.on('connected', (e) => this.notify("connected"));

    this.ua.on('disconnected', (e) => this.notify("disconnected"));

    this.ua.on('connecting', (e) => {
      
    });

    this.ua.on('newRTCSession', (e) => {
      this.calls.push(this.callService.factory(e.session));
    });
    this.ua.start();
  }

  notify (status) {
    this.$rootScope.$broadcast('statusUpdated', status);
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

  getCallEventHandlers() {
    return {
      'progress': (e)=> {
        console.log('call is in progress', e);
      },
      'failed': (e) => {
        console.log('call failed with cause: ', e);
      },
      'ended': (e) => {
        console.log('call ended with cause: ', e);
      },
      'confirmed': (e) => {
        console.log('call confirmed', e);
      },
      'addstream': (e) => {
        var stream = e.stream;
        console.log('remote stream added', stream);
        var remoteView = document.getElementById('remoteView');
        
        remoteView = this.JsSIP.rtcninja.attachMediaStream(remoteView, stream);
      }
    };
  }


  call(target) {
    this.ua.call(target, {
      eventHandlers: this.getCallEventHandlers(),
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
