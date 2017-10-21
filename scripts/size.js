"use strict"; 
(function() {
  addEventListener('load', size );
  addEventListener('input', size );
  addEventListener('focus', size, { capture: true });
  addEventListener('blur', size, { capture: true });
  addEventListener('click', size, { capture: true } );
  
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
      //setTimeout( resize, 200 );
      function resize() { 
        console.log('resize', frameElement );
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
(function() {
  const isFF = navigator.userAgent.match(/Fire|Sea/g);
  if ( isFF ) {
    addEventListener('click', function(e) { e.target.localName == 'a' ? scrollTargetIfRequired(e.target) : void 0 });

    function scrollTargetIfRequired(link) {
      const url = new URL(link.href);
      if ( url.hash && link.target ) {
        const targetFrame = findTargetFrame(link.target); 
        const targetPosition = computeFrameOffsetToTop(targetFrame);
        window.top.scrollBy( targetPosition.left, targetPosition.top );
      }
    }

    function findTargetFrame(name) {
      if ( top.name == name ) {  // algorithm correctness ( must check node before stacking )
        return top;
      } else if ( self.name == name ) { // heuristic ( will reach, but this may speed )
        return self;
      }
      const stack = [top.frames];
      while( stack.length ) {
        const node = stack.pop();
        for( let i = 0; i < node.frames.length; i++ ) {
          const new_node = node.frames[i];
          if ( new_node.name == name ) {
            return new_node;
          } else {
            stack.push(new_node); 
          }
        }
      }
    }

    function computeFrameOffsetToTop(frame) {
      const offset = { left: 0, top: 0 };
      while( frame !== top ) {
        const framePos = frame.frameElement.getBoundingClientRect();
        offset.left += framePos.left;
        offset.top += framePos.top;
        frame = frame.parent;
      }
      return offset;
    }
  }
}());
