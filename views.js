"use strict";
{
  const {def,T,I} = require('dosyhil');

  const negative_example = def`negative_example_widget ${0}
    <li>
      <p style=display:inline;>
        <input type=text size=${T.len} name=negative value="${T.sel}">
        <button name=negative_delete value=${T.idx}>Delete</button>
    </li>
  `;

  const positive_example = def`positive_example_widget ${0}
    <li>
      <p style=display:inline;>
        <input type=text size=${T.len} name=positive value="${T.sel}">
        <button name=positive_delete value=${T.idx}>Delete</button>
    </li>
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
                <legend>Place Locations</legend>
                <hr>
                <details>
                  <summary>How do I add examples locations for my place?</summary>
                  <p>
                    We use the examples you provide to work out all locations of your place. Here is where you add examples of locations to include and locations to exclude.
                  <p>
                    To add an example location of your place, just select it with your mouse in the browser tab using <kbd>Shift</kbd>+click. You can select examples of locations to <em>exclude</em> using <kbd>Alt</kdb>+<kbd>Shift</kbd>+click.
                </details>
                <p>
                <p class=include>
                  <label for=generalized>Include</label>
                  <input id=generalized type=text value="${T.generalized}" name=generalized>
                </p>
                <details>
                  <summary>Locations to Include</summary>
                  <fieldset class=include>
                    <legend>Include Places Like These</legend>
                    <ul>
                      <li>
                        <p style=display:inline;>
                          <input type=text class=new name=positive placeholder="Add new" autofocus>
                          <button value=save>Save</button>
                      </li>
                      ${ T.examples.positive.map((sel,idx) => I.positive_example_widget({len:Math.min(25,sel.length),sel,idx})).join('') }
                    </ul>
                  </fieldset>
                </details>
                <p>
                <p class=exclude>
                  <label for=generalized>Exclude</label>
                  <input id=ngeneralized type=text value="${T.ngeneralized}" name=ngeneralized>
                </p>
                <details>
                  <summary>Locations to Exclude</summary>
                  <fieldset class=exclude>
                    <legend>Exclude Places Like These</legend>
                    <ul>
                      <li>
                        <p style=display:inline;>
                          <input type=text class=new name=negative placeholder="Add new">
                          <button value=save>Save</button>
                      </li>
                      ${ T.examples.negative.map((sel,idx) => I.negative_example_widget({len:Math.min(25,sel.length),sel,idx})).join('') }
                    </ul>
                  </fieldset>
                </details>
                <p>
                <p>
                  <label></label>
                  <input id=savegeneralized type=submit value=Save>
                  <input id=generalize type=submit value=Recalculate>
                <hr>
                <details>
                  <summary>How do I describe my place?</summary>
                  <p>
                    Describe your place
                  <p>
                    <label for=placename>Name</label>
                    <input id=placename type=text value="${T.placename}" name=placename>
                  <p>
                    <label for=placeconcepts>Concepts</label>
                    <input id=placeconcepts type=text value="${T.placeconcepts}" name=placeconcepts>
                  <p>
                    <label for=placedesc>Description</label>
                    <textarea id=placedesc name=placedesc>${T.placedesc.replace(/>/g,'&gt;')}</textarea>
                  <p>
                    <label></label>
                    <input id=savemetadata type=submit value=Save>
                </details>
              </fieldset>
            </form>
          </article>
        </li>
        <li>
          <input id=bt1 type=radio name=btabs value=t1> 
          <label for=bt1>Build Maps</label>
          <article class=tab>
            <h1>Edit Map</h1>
            <form method=POST action=/build>
              <fieldset>
                <legend>Generalized</legend>
                <p>
                  This is the generalized selector
                <p>
                  <label for=generalized>Positive Set</label>
                  <input id=generalized type=text value name=generalized>
                <p>
                  <label for=generalized>Negative Set</label>
                  <input id=ngeneralized type=text value name=ngeneralized>
                <p>
                  <input id=generalize type=submit value=Recalculate>
              </fieldset>
            </form>
            <form method=POST action=/build>
              <fieldset>
                <legend>Positive Examples</legend>
                <ul>
                  <li>
                    <p style=display:inline;>
                      <input type=text class=new name=positive placeholder="Add new" autofocus>
                      <button value=save>Save</button>
                  </li>
                </ul>
              </fieldset>
            </form>
            <form method=POST action=/build>
              <fieldset>
                <legend>Negative Examples</legend>
                <ul>
                  <li>
                    <p style=display:inline;>
                      <input type=text class=new name=negative placeholder="Add new">
                      <button value=save>Save</button>
                  </li>
                </ul>
              </fieldset>
            </form>
          </article>
        </li>
        <li>
          <input id=bt2 type=radio name=btabs value=t2> 
          <label for=bt2>Build Journeys</label>
          <article class=tab>
            <form method=GET action=#build>
              <fieldset>
                <legend>Edit Journey</legend>
                <p>
                  This is where you build for journeys
                </p>
                <p>
                  <label for=bbuild_journeys>Build</label>
                  <input id=bbuild_journeys type=build spellcheck=off>
                  <input type=submit value=Build>
                </p>
              </fieldset>
            </form>
          </article>
        </li>
      </ul>
    </nav>
    <script src=/scripts/build.js></script>
    <script>
      build.setup();
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
