# ractive-component-baron
Ractive component wrapping [Baron.js](https://github.com/Diokuz/baron) scroller library.

# Usage:
1. In your app do `require('ractive-components-baron');`
   This will add the `Scroll` object to `Ractive.components`.
2. In your [Ractive](https://github.com/ractivejs/ractive) template:
      ```html
      <Scroll class="myscroll" id="..." disable='..boolean..' dir='...' opts='..object..'>
        ... scrollable content
      </Scroll>
      ```
      All attributes are optional. `dir` may be one of `x` for horizontal scroll,
      `y` for vertical scroll (default) or `xy` for bidirectional scroll.
      `opts` allows to extend defaults Baron options, which are:
      ```javascript
      defaultOpts = {
        scroller: '.scroller',
        bar: '.scroller__bar_v',
        barOnCls: 'baron',

        $: function(selector, context) {
          return bonzo(qwery(selector, context));
        },
        event: function(elem, event, func, mode) { // Events manager
          (mode == 'trigger') && (mode = 'fire');
          bean[mode || 'on'](elem, event, func);
        }
      }
      ```
3. Include `baron.css` from the repository tweaked to your needs.
4. Fix height and/or width of `.myscroll` using some CSS.
