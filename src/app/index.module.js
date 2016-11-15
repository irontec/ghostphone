/* global malarkey:false, moment:false */

import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';
import { PadController } from './pad/pad.controller';
import { CallsController } from './calls/calls.controller';
import { ConfigController } from './config/config.controller';

import { JsSIPWrapperService } from './components/JsSIPWrapper/JsSIPWrapper.service';
import { JsSIPConfigService } from './components/JsSIPConfig/JsSIPConfig.service';
import { CallService } from './components/call/call.service';

import { NavbarDirective } from './components/navbar/navbar.directive';
import { ToolbarDirective } from './components/toolbar/toolbar.directive';



angular.module('workspace', ['ngAnimate', 'ngCookies', 'ngSanitize', 'ngMessages', 'ngAria', 'ui.router', 'ngMaterial', 'LocalStorageModule','cfp.hotkeys'])
  .constant('moment', moment)
  .config(config)
  .config(routerConfig)
  .run(runBlock)

  .service('jsSIPWrapper', JsSIPWrapperService)
  .service('jsSIPConfig', JsSIPConfigService)
  .service('Call', CallService)

  .controller('PadController', PadController)
  .controller('CallsController', CallsController)
  .controller('ConfigController', ConfigController)

  .directive('mainNavbar', NavbarDirective)
  .directive('mainToolbar', ToolbarDirective);
