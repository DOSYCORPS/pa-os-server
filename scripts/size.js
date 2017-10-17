"use strict"; 
{
  addEventListener('load', size );
  addEventListener('focus', size );
  addEventListener('blur', size );
  addEventListener('input', size );
  
  function size() {
    if ( !!document.scrollingElement ) {
      document.scrollingElement.classList.add('noscroll');
    }
    if ( frames.length ) {
      const subframes = Array.from( frames ).map( windowContext => windowContext.frameElement );
      subframes.forEach( f => f.dataset.resizeAttached || f.addEventListener('load', size ) );
      subframes.forEach( f => f.dataset.resizeAttached = true );
    }
    if ( !!frameElement ) {
      resize();
      setTimeout( () => resize(), 100 );
      function resize() { 
        const me = frameElement;
        const myheight = parseInt(me.height);
        const scrollHeight = Math.round(document.scrollingElement.scrollHeight);
        const offsetHeight = Math.round(document.scrollingElement.offsetHeight);
        if ( myheight < scrollHeight ) {
          me.height = scrollHeight;
        } else if ( myheight > offsetHeight ) {
          me.height = offsetHeight; 
        }
      }
    }
  }
}
