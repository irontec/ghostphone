export class PadController {
  constructor ($timeout, jsSIPWrapper, toastr) {
    'ngInject';

    this.title = 'GhostPhone';
    this.target;
    
    this.padItems = ['1','2','3','4','5','6','7','8','9','*','0','#'];
    
    this.jssip = jsSIPWrapper;
    this.activate();


  }

  activate(jsSIPWrapper) {

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

  showToastr() {
    this.toastr.info('Fork <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><b>generator-gulp-angular</b></a>');
    this.classAnimation = '';
  }
}
