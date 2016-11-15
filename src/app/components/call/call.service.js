
class CleanCall {
    constructor (session, moment, storage, $rootScope) {

        this.session = session;
        this.$rootScope = $rootScope;
        this.localStrem;
        this.type =  this.session.direction === "incoming"? 'IN':'OUT';
        this.id = this.session.id;
        this.target = this.session.remote_identity.display_name || this.session.remote_identity.uri.user;

        this.date = moment().format('DD/MM/YYYY HH:mm:ss');
        this.status = 'ringing';
        this.duration = '00:60';

        session.on('connecting', (e) => this.onConnecting(e));
        session.on('progress', (e) => this.onProgress(e));
        session.on('accepted', (e) => this.onAccepted(e));
        session.on('failed', (e) => this.onFailed(e));
        session.on('newDTMF', (e) => this.onDTMF(e));
        session.on('hold', (e) => this.onHold(e));
        session.on('unhold', (e) => this.onUnhold(e));
        session.on('ended', (e) => this.onEnded(e));
        session.on('update', (e) => this.onUpdate(e));


        this.notifyUI();

    }


    onConnecting () {

    }
    onProgress () {

    }

    onAccepted () {

        this.status = 'active';
        this.notifyUI();
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

    onEnded (e) {
        console.log("ENDED", e, this);
        this.status = 'finished';
        this.notifyUI();
    }

    onUpdate () {

        this.status = 'finished';
        this.notifyUI();
    }

    onFailed () {
        console.log("FAILED");
        this.status = 'finished';
        this.notifyUI();
    }

    notifyUI () {
        this.$rootScope.$broadcast('callsUpdated');
    }

}

export class CallService {
  constructor ($rootScope, localStorageService, moment) {
    'ngInject';
    this.moment = moment;
    this.storage = localStorageService
    this.$rootScope = $rootScope;

  }

  factory(session) {
  	return new CleanCall(session, this.moment, this.storage, this.$rootScope);
  }

}
