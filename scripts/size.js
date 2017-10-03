"use strict"; 
{
  addEventListener('load', size );
  
  function size() {
    if ( !!document.scrollingElement ) {
      document.scrollingElement.classList.add('noscroll');
    }
    if ( frames.length ) {
      const subframes = Array.from( frames ).map( windowContext => windowContext.frameElement );
      console.log(subframes, location.href);
      subframes.forEach( f => f.addEventListener('load', size ) );
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
