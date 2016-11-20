
class Call {

    constructor ($rootScope, $window, $state, $interval, moment) {
        'ngInject';

        this.$rootScope = $rootScope;
        this.$state = $state;
        this.JsSIP = $window.JsSIP;
        this.$document = $window.document;
        this.moment = moment;
        this.localStream = null;
        this.muted = false;
        
        

    }

    setSession(session) {

        
        this.session = session;
        this.type =  this.session.direction === "incoming"? 'IN':'OUT';
        this.id = this.session.id;
        this.target = this.session.remote_identity.uri.user;
        this.username = this.session.remote_identity.display_name || '';
        
        this.date = this.moment().format('DD/MM/YYYY HH:mm:ss');

        this.status = 'ringing';
        this.duration = '';

        session.on('connecting', (e) => this.onConnecting(e));
        session.on('progress', (e) => this.onProgress(e));
        session.on('accepted', (e) => this.onAccepted(e));
        session.on('failed', (e) => this.onFailed(e));
        session.on('newDTMF', (e) => this.onDTMF(e));
        session.on('hold', (e) => this.onHold(e));
        session.on('unhold', (e) => this.onUnhold(e));
        session.on('ended', (e) => this.onEnded(e));
        session.on('update', (e) => this.onUpdate(e));

        session.connection.addEventListener('addstream', (e) => this.onStreamAdded(e));

        if (this.type === 'IN') {
            this.$state.go('calls');
        }

        this.notifyUI();

    }


    onConnecting () {
        if (this.session.connection.getLocalStreams().length > 0) {
          this.localStream = this.session.connection.getLocalStreams()[0];
        }

    }
    onProgress () {

    }

    onAccepted (e) {

        this.status = 'active';
        this.notifyUI();

        if (this.session.connection.getLocalStreams().length > 0) {
          this.localStream = this.session.connection.getLocalStreams()[0];
        }

        if (e.originator === 'remote') {
          if (e.response.getHeader('X-Can-Renegotiate') === 'false') {
            this.session.data.remoteCanRenegotiateRTC = false;
          }
          else {
            this.session.data.remoteCanRenegotiateRTC = true;
          }
        }

        this.date = this.moment(this.session.start_time).format('DD/MM/YYYY HH:mm:ss');

    }

    onStreamAdded (e) {
        var remoteView = this.$document.getElementById('remoteView');
        remoteView.srcObject = e.stream;

    }

    onDTMF () {

    }

    onHold()  {
        this.status = 'paused';
        this.notifyUI();
    }

    onUnhold()  {
        this.status = 'active';
        this.notifyUI();
    }

    onEnded () {

        this.status = 'finished';
        var startTime = this.moment(this.session.start_time);
        var endTime = this.moment(this.session.end_time);

        var duration = this.moment.duration(endTime.diff(startTime));

        this.duration = this.moment.utc(duration.asMilliseconds()).format("mm:ss");

        this.notifyUI();
        this.JsSIP.Utils.closeMediaStream(this.localStream);


    }

    onUpdate () {
        this.status = 'finished';
        this.notifyUI();
    }

    onFailed () {

        this.status = 'finished';
        this.notifyUI();
    }

    hangup () {
        this.session.terminate();
    }

    answer () {
        this.session.answer();
    }

    hold () {
        this.session.hold();
    }

    unhold () {
        this.session.unhold();
    }

    mute () {
        this.muted = true;
        this.session.mute();
    }

    unmute () {
        this.muted = false;
        this.session.unmute();
    }

    getDisplayTarget () {
        if (this.username !== '') {
            return this.username + ' (' + this.target + ')';
        } else {
            return this.target;
        }
    }

    notifyUI () {
        this.$rootScope.$broadcast('callsUpdated');
    }

    doExport () {
        return {
            id: this.id,
            status: 'finished',
            type: this.type,
            target: this.target,
            username: this.username,
            date: this.date,
            duration: this.duration
        }
    }

    doImport(raw) {
        this.id = raw.id;
        this.status = raw.status;
        this.type = raw.type;
        this.target = raw.target;
        this.username = raw.username;
        this.date = raw.date;
        this.duration = raw.duration;
    }


}

export class CallService {
  constructor ($injector) {
    'ngInject';
    this.$injector = $injector;
  }

  factory(session) {
    let call  = this.$injector.instantiate(Call);
    call.setSession(session);
    return call;
  }

  doImport(raw) {
    let call  = this.$injector.instantiate(Call);
    call.doImport(raw);
    return call;
  }

}
