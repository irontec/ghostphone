export class PadController {
  constructor ($timeout, $state, hotkeys, jsSIPWrapper) {
    'ngInject';

    this.title = 'GhostPhone';
    this.target;

    this.padItems = ['1','2','3','4','5','6','7','8','9','*','0','#'];

    this.jssip = jsSIPWrapper;

    this.isConnected = () => jsSIPWrapper.isConnected();
    this.$state = $state;
    this.hotkeys = hotkeys;

    this.activate();

  }

  activate() {
    this.jssip.checkConnection();

    for (var key of this.padItems) {
      this.hotkeys.add({
        combo: key,
        callback: (event) => this.onPressButton(event.key)
      });
    }

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
    this.$state.go('calls');
  }

}
