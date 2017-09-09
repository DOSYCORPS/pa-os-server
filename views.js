"use strict";
{
  const {def,T,I} = require('dosyhil');

  const PLACE_TYPES = [
    'column',
    'button',
    'input',
    'signpost'
  ];

  def`placetype ${0}
    ${ d => ( console.log(d), d.placetype == d.type ) ? 'selected' : '' } 
  `;
    
  const negative_example = def`negative_example_widget ${0}
    <p>
      <label></label>
      <input type=text size=${T.len} name=negative value="${T.sel}">
      <button name=negative_delete value=${T.idx}>Delete</button>
  `;

  const positive_example = def`positive_example_widget ${0}
    <p>
      <label></label>
      <input type=text size=${T.len} name=positive value="${T.sel}">
      <button name=positive_delete value=${T.idx}>Delete</button>
  `;

  const build = def`build ${0}
    <meta charset="UTF-8">
    <meta name=viewport content="width=device-width, initial-scale=1, user-scalable=no">
    <link rel=stylesheet href=all.css>
    <link rel=stylesheet href=custom.css>
    <nav class=tabs>
      <ul class="horizontal tabs">
        <li>
          <input id=bt0 type=radio name=btabs value=t0 checked> 
          <label for=bt0>Build Places</label>
          <article class=tab>
            <h1>Edit Place</h1>
            <p>Here is where you can edit your place.
            <form method=POST action=/build>
              <fieldset>
                <legend>Locations</legend>
                <fieldset class=include style="border:0; box-shadow:none !important; margin-top:0 !important;">
                  <p>
                  <p>
                    <label for=generalized>All locations</label>
                    <input id=generalized type=text value="${T.generalized}" name=generalized>
                    <input id=generalize type=submit value=&#8635;>
                  <details>
                    <summary>Location examples and excluded locations</summary>
                    <p>
                    <p>
                      <label></label>
                      <input type=text class=new name=positive placeholder="An example of this place" autofocus>
                      <button value=save>Save</button>
                    ${ T.examples.positive.map((sel,idx) => I.positive_example_widget({len:Math.min(25,sel.length),sel,idx})).join('') }
                    <details class=exclude>
                      <summary>Exclude</summary>
                      <p>
                      <p>
                        <label for=ngeneralized>Excluding these</label>
                        <input id=ngeneralized type=text value="${T.ngeneralized}" name=ngeneralized>
                        <input id=generalize type=submit value=&#8635;>
                      <p>
                        <label></label>
                        <input type=text class=new name=negative placeholder="An excluded location">
                        <button value=save>Save</button>
                      ${ T.examples.negative.map((sel,idx) => I.negative_example_widget({len:Math.min(25,sel.length),sel,idx})).join('') }
                    </details>
                  </details>
                </fieldset>
              </fieldset>
              <fieldset>
                <legend>Meaning</legend>
                <fieldset style="border:0; box-shadow:none !important; margin-top:0 !important;">
                  <p>
                  <p>
                    <label for=placetype>Place type</label>
                    <select id=placetype name=placetype>
                      ${ d => {
                        return PLACE_TYPES.
                          map( type => `<option value=${type} ${d.placetype==type ? 'selected':''}>${type}</option>` ).
                          join('\n');
                      }}
                    </select>
                  <details>
                    <summary>Meaning tags, description and name</summary>
                    <p>
                    <p>
                      <label for=placeconcepts>Meaning tags</label>
                      <input id=placeconcepts type=text value="${T.placeconcepts}" name=placeconcepts placeholder="Comma separated tags">
                    <p>
                      <label for=placedesc>Description</label>
                      <textarea id=placedesc placeholder="What is this place, in 1 or 2 sentences." name=placedesc>${T.placedesc.replace(/>/g,'&gt;')}</textarea>
                    <p>
                      <label for=placename>Name</label>
                      <input id=placename type=text value="${T.placename}" name=placename placeholder="Short, descriptive name">
                  </details>
                </fieldset>
              </fieldset>
              <fieldset>
                <legend>Save</legend>
                <fieldset style="border:0; box-shadow:none !important; margin-top:0 !important;">
                  <p>
                  <p>
                    <input id=savemetadata type=submit value=Save>
                    <input id=clearall type=reset value="Clear All">
                </fieldset>
              </fieldset>
              <p>
              <fieldset>
                <legend>Help</legend>
                <fieldset style="border:0; box-shadow:none !important; margin-top:0 !important;">
                  <details>
                    <summary>How do I add example locations for my place?</summary>
                    <p>
                      We use the examples you provide to work out all locations of your place. Here is where you add examples of locations to include and locations to exclude.
                    <p>
                      To add an example location of your place, just select it with your mouse in the browser tab using <kbd>Shift</kbd>+click. You can select examples of locations to <em>exclude</em> using <kbd>Alt</kdb>+<kbd>Shift</kbd>+click.
                  </details>
                </fieldset>
              </fieldset>
            </form>
          </article>
        </li>
        <li>
          <input id=bt1 type=radio name=btabs value=t1> 
          <label for=bt1>Build Maps</label>
          <article class=tab>
            <h1>Edit Map</h1>
          </article>
        </li>
        <li>
          <input id=bt2 type=radio name=btabs value=t2> 
          <label for=bt2>Build Journeys</label>
          <article class=tab>
          </article>
        </li>
      </ul>
    </nav>
    <script src=/scripts/build.js></script>
    <script>
      //build.setup();
      document.querySelector('#clearall').addEventListener('click', e => {
        e.preventDefault();
        const form = e.target.form;
        Array.from(form.elements).forEach( el => {
          switch( el.tagName ) {
            case "INPUT":
              if ( el.type !== 'reset' && el.type !== 'submit' ) {
                el.value = '';
                el.checked = false;
              }
              break;
            case "SELECT":
              Array.from(el.options).forEach( opel => opel.selected = false );
              break;
            case "TEXTAREA":
              el.innerHTML = '';
              break;
          }
        });
      });
    </script>
  `;

  const search = def`search ${0}
    <meta charset="UTF-8">
    <meta name=viewport content="width=device-width, initial-scale=1, user-scalable=no">
    <link rel=stylesheet href=all.css>
    <link rel=stylesheet href=custom.css>
    <h1>Main Search</h1>
    <nav class=tabs>
      <ul class="horizontal tabs">
        <li>
          <input id=st1 type=radio name=stabs value=t1 checked> 
          <label for=st1>Search Maps</label>
          <article class=tab>
            <form method=GET action=#search>
              <fieldset>
                <legend>Search Maps</legend>
                <p>
                  This is where you search for maps
                </p>
                <p>
                  <label for=ssearch_maps>Search</label>
                  <input id=ssearch_maps type=search spellcheck=off>
                  <input type=submit value=Search>
                </p>
              </fieldset>
            </form>
          </article>
        </li>
        <li>
          <input id=st2 type=radio name=stabs value=t2> 
          <label for=st2>Search Journeys</label>
          <article class=tab>
            <form method=GET action=#search>
              <fieldset>
                <legend>Search Journeys</legend>
                <p>
                  This is where you search for journeys
                </p>
                <p>
                  <label for=ssearch_journeys>Search</label>
                  <input id=ssearch_journeys type=search spellcheck=off>
                  <input type=submit value=Search>
                </p>
              </fieldset>
            </form>
          </article>
        </li>
        <li>
          <input id=st3 type=radio name=stabs value=t3> 
          <label for=st3>Info</label>
          <article class=tab>
            <p class=info>
              We are using Node.js <script>document.write(process.versions.node)</script>,
              Chromium <script>document.write(process.versions.chrome)</script>,
              and Electron <script>document.write(process.versions.electron)</script>.
            </p>
          </article>
        </li>
      </ul>
    </nav>
    <script>
      console.log("Search.");
    </script>
  `;

  // helpers

  const views = {
    build, search
  };

  module.exports = views;
}
