"use strict"; 
{
  const me = Array.from(parent.document.querySelectorAll('iframe')).find( el => el.contentWindow == self );
  addEventListener('load', () => {
    me.height = document.scrollingElement.scrollHeight + 10;
  });
}
