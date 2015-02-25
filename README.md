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
      All attributes are optional. Use `disable='true'` when native scroll is preferable.
      `dir` may be one of `'x'` for horizontal scroll,
      `'y'` for vertical scroll (default) or `'xy'` for bidirectional scroll.
      `opts` allows to extend default Baron options, which are:
      ```javascript
      defaultOpts = {
        scroller: '.scroller',
        bar: '.scroller__bar_v',
        barOnCls: 'baron',

        $: function(selector, context) {
          return bonzo(qwery(selector, context));
        },
        event: function(elem, event, func, mode) {
          (mode == 'trigger') && (mode = 'fire');
          bean[mode || 'on'](elem, event, func);
        }
      }
      ```
3. Include `baron.css` from the repository tweaked to your needs.
4. Fix height and/or width of `.myscroll` using some CSS.

See `example/` directory for working example. Run `npm install` in both root and example directories, then `node server.js` and go to `localhost:3333` in your browser.

Note that Baron uses [MutationObserver](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver)
to update scroller when necessary.

# License
MIT
