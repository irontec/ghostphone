export class CallsController {
  constructor ($timeout, jsSIPWrapper, toastr) {
    'ngInject';

    
    this.jssip = jsSIPWrapper;
    
    this.activate();
    this.connected = () => jsSIPWrapper.isConnected();
        


  }

  activate() {
    this.jssip.checkConnection();
  }

  getWebDevTec(webDevTec) {
    this.awesomeThings = webDevTec.getTec();

    angular.forEach(this.awesomeThings, (awesomeThing) => {
      awesomeThing.rank = Math.random();
    });
  }

  showToastr() {
    this.toastr.info('Fork <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><b>generator-gulp-angular</b></a>');
    this.classAnimation = '';
  }
}
