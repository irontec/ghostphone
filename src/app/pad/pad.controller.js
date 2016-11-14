export class PadController {
  constructor ($timeout, jsSIPWrapper) {
    'ngInject';

    this.title = 'GhostPhone';
    this.target;
    
    this.padItems = ['1','2','3','4','5','6','7','8','9','*','0','#'];
    
    this.jssip = jsSIPWrapper;
    this.activate();
    this.isConnected = () => jsSIPWrapper.isConnected();


  }

  activate() {
    this.jssip.checkConnection();
  }

  onPressButton(buttonValue) {
    if (!this.target) {
      this.target = '';
    }
    this.target = this.target + buttonValue;
  }

  onKeyDown(event) {
    if (event.key.length === 1) {
      if (this.padItems.indexOf(event.key) === -1) {
        event.preventDefault();
        event.stopPropagation();
      }
    }
    
  }

  makeCall() {
    this.jssip.call(this.target);
  }

}
