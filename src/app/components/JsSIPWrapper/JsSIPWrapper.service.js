export class JsSIPWrapperService {

  constructor ($log, $window) {
    'ngInject';

    this.$log = $log;
    this.JsSIP = $window.JsSIP;
    this.ua = null;

  }

  checkConnection(force) {
    if (this.isConnected() && !force) {
       return;
    }

    this.connect();
  }

  isConnected() {
    return this.ua && this.ua.isConnected();
  }


  connect() {

    var configuration = {
      ws_servers: 'wss://fono.irontec.com:8089/ws',
      uri: 'sip:jinfante@irontec.com',
      password: 'farsa',
      log: { level: 'debug' },
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
    this.ua.start();

    this.ua.on('newRTCSession', (e) => {
      
      console.log("new CALL!!", e);
      var call = e.session;

    });


  }

  disconnect() {
    this.ua.unregister({all: true});
    this.ua.stop();
  }

  getUA() {
    return this.ua;
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
