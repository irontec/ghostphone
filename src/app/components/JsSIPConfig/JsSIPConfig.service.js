export class JsSIPConfigService {
  constructor (localStorageService, $location) {
    'ngInject';

    this.storage = localStorageService;

    let storedData = this.storage.get('JsSIPData');

    this.data = {
      wss: '',
      uri: '',
      username: '',
      password: '',
      autoConnect: false,
      save: false,
      ...storedData,
      ...$location.search()
    };

  }

  getData() {
    return this.data;
  }


  isValid() {
    return this.data.wss !== '' &&
            (this.data.uri !== '' ||
            this.data.username !== '' ) &&
            this.data.password !== '';
  }

  mustAutoConnect() {
    return this.isValid && this.data.autoConnect;
  }

  get uri () {
    if (this.data.uri !== '') {
      return this.data.uri;
    }
    return 'sip:' + this.data.username +'@irontec.com';
  }

  get wss() {
    return this.data.wss;
  }

  get password() {
    return this.data.password;
  }

  remember() {
    this.storage.set('JsSIPData', this.data);
  }


  forget() {
    this.storage.remove('JsSIPData');
  }
}
