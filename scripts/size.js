"use strict"; 
{
  if ( !!document.scrollingElement ) {
    document.scrollingElement.classList.add('noscroll');
  }

  addEventListener('load', size );

  if ( frames.length ) {
    const subframes = Array.from( frames ).map( windowContext => windowContext.frameElement );
    subframes.forEach( f => f.addEventListener('load', size ) );
  }
  
  function size() {
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
