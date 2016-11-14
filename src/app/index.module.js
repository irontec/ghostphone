/* global malarkey:false, moment:false */

import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';
import { PadController } from './pad/pad.controller';
import { CallsController } from './calls/calls.controller';
import { ConfigController } from './config/config.controller';

import { JsSIPWrapperService } from './components/JsSIPWrapper/JsSIPWrapper.service';
import { WebDevTecService } from './components/webDevTec/webDevTec.service';

import { NavbarDirective } from './components/navbar/navbar.directive';
import { ToolbarDirective } from './components/toolbar/toolbar.directive';

import { MalarkeyDirective } from './components/malarkey/malarkey.directive';


angular.module('workspace', ['ngAnimate', 'ngCookies', 'ngSanitize', 'ngMessages', 'ngAria', 'ui.router', 'ngMaterial', 'toastr'])
  .constant('malarkey', malarkey)
  .constant('moment', moment)
  .config(config)
  .config(routerConfig)
  .run(runBlock)

  .service('jsSIPWrapper', JsSIPWrapperService)

  .service('webDevTec', WebDevTecService)

  .controller('PadController', PadController)
  .controller('CallsController', CallsController)
  .controller('ConfigController', ConfigController)
  
  .directive('mainNavbar', NavbarDirective)
  .directive('mainToolbar', ToolbarDirective)
  
  .directive('acmeMalarkey', MalarkeyDirective);
