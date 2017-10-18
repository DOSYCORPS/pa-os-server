"use strict"; 
(function() {
  addEventListener('load', size );
  addEventListener('focus', size );
  addEventListener('blur', size );
  addEventListener('input', size );
  addEventListener('click', size );
  
  function size() {
    if ( !!document.scrollingElement ) {
      document.scrollingElement.classList.add('noscroll');
    }
    if ( frames.length ) {
      const subframes = Array.prototype.slice.call( frames ).map( function(windowContext){ return windowContext.frameElement });
      subframes.forEach( function(f){f.dataset.resizeAttached || f.addEventListener('load', size )});
      subframes.forEach( function(f){f.dataset.resizeAttached = true });
    }
    if ( !!frameElement ) {
      resize();
      setTimeout( resize, 100 );
      function resize() { 
        const me = frameElement;
        const myheight = parseInt(me.height);
        const elem = document.scrollElement || document.documentElement;
        const scrollHeight = Math.round(elem.scrollHeight);
        const offsetHeight = Math.round(elem.offsetHeight);
        if ( myheight < scrollHeight ) {
          me.height = scrollHeight;
        } else if ( myheight > offsetHeight ) {
          me.height = offsetHeight; 
        }
      }
    }
  }
}());
