var Ractive = require('ractive');
var bonzo = require('bonzo');
var bean = require('bean');
var qwery = require('qwery');
var xtend = require('xtend');

require('./baron.min.js');  // creates window.baron object

var template =
' <div class="scroller_wrapper {{class}}" id="{{id}}" intro="updateScroll"> ' +
'   <div class="scroller">{{yield}}</div>                                   ' +
'   <div class="scroller__track_v">                                         ' +
'     <div class="scroller__bar_v"></div>                                   ' +
'   </div>                                                                  ' +
'   <div class="scroller__track_h">                                         ' +
'     <div class="scroller__bar_h"></div>                                   ' +
'   </div>                                                                  ' +
' </div>                                                                    ' ;

var defaultOpts = {
  scroller: '.scroller',
  bar: '.scroller__bar_v',
  barOnCls: 'baron',

  // Local copy of jQuery-like utility
  // Default: window.jQuery
  $: function(selector, context) {
    return bonzo(qwery(selector, context));
  },

  // Event manager
  // Default: function(elem, event, func, mode) { params.$(elem)[mode || 'on'](event, func); };
  event: function(elem, event, func, mode) { // Events manager
    (mode == 'trigger') && (mode = 'fire');
    bean[mode || 'on'](elem, event, func);
  }
};

var Scroll = Ractive.extend({

  template: template,

  transitions: {

    updateScroll: function (t) {
      if (this.get('disable')) return t.complete();

      this.direction = this.get('dir') || 'y';

      this.node = t.node;
      this.s = [];
      var self = this;
      self.opts = xtend(defaultOpts, { root: t.node, }, this.get('opts'));
      switch(self.direction) {
        case 'xy':
          var hopts = xtend(defaultOpts, {
            barOnCls: 'baron_h',
            bar: '.scroller__bar_h'
          });
          self.s = baron(self.opts).baron(hopts);
          break;
        case 'y':
          self.s = baron(xtend(self.opts, {direction: 'v'}));
          break;
        case 'x':
          self.s = baron(xtend(self.opts, {direction: 'h'}));
          break;
      }

      t.complete();
    }
  },

  oncomplete: function () {

    if (this.get('disable')) return;

    this.on('teardown', function () {
      this.s.dispose();
    });

  }
});

Ractive.components.Scroll = Scroll;
