define('public/components/home/header.vue', function(require, exports, module) {

  "use strict";
  
  module.exports = {};
  var __vue__options__;
  if(exports && exports.__esModule && exports.default){
    __vue__options__ = exports.default;
  }else{
    __vue__options__ = module.exports;
  }
  __vue__options__.render =function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('header',{staticClass:"header"},[_c('div',{staticClass:"header__inner"},[_c('router-link',{staticClass:"header__side",attrs:{"to":"/setting"}},[_c('img',{attrs:{"src":"/images/svg/setting.svg","alt":"设置"}})]),_vm._v(" "),_c('h1',{staticClass:"header__center"},[_vm._v("Up! Up!")]),_vm._v(" "),_c('router-link',{staticClass:"header__side",attrs:{"to":"/myCup"}},[_c('img',{attrs:{"src":"/images/svg/cup.svg","alt":"图鉴"}})])],1)])}
  __vue__options__.staticRenderFns =[]
  

});
