"use strict";
{
  const {def,T,I} = require('dosyhil');

  const negative_example = def`negative_example_widget ${0}
    <li>
      <p style=display:inline;>
        <input type=text size=${T.len} name=negative value="${T.sel.replace(/>/g,'&gt;')}">
        <button name=negative_delete value=${T.idx}>Delete</button>
    </li>
  `;

  const positive_example = def`positive_example_widget ${0}
    <li>
      <p style=display:inline;>
        <input type=text size=${T.len} name=positive value="${T.sel.replace(/>/g,'&gt')}">
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
            <details>
              <summary>Specific Location Examples</summary>
              <p>Here are the specific location examples of your place. You can delete examples you want to remove.
              <form method=POST action=/build>
                <fieldset class=include>
                  <legend>Include Examples</legend>
                  <ul>
                    <li>
                      <p style=display:inline;>
                        <input type=text class=new name=positive placeholder="Add new" autofocus>
                        <button value=save>Save</button>
                    </li>
                    ${ T.examples.positive.map((sel,idx) => I.positive_example_widget({len:Math.min(25,sel.length),sel,idx})).join('') }
                  </ul>
                </fieldset>
              </form>
              <form method=POST action=/build>
                <fieldset class=exclude>
                  <legend>Exclude Examples</legend>
                  <ul>
                    <li>
                      <p style=display:inline;>
                        <input type=text class=new name=negative placeholder="Add new">
                        <button value=save>Save</button>
                    </li>
                    ${ T.examples.negative.map((sel,idx) => I.negative_example_widget({len:Math.min(25,sel.length),sel,idx})).join('') }
                  </ul>
                </fieldset>
              </form>
            </details>
            <details open>
              <summary>Place Profile</summary>
              <form method=POST action=/build>
                <fieldset>
                  <p>
                    Describe the place
                  <p>
                    <label for=setname>Place Name</label>
                    <input id=setname type=text value name=setname>
                  <p>
                    <label for=conceptlabels>Place Concepts</label>
                    <input id=conceptlabels type=text value name=conceptlabels>
                  <p>
                    <label for=setdesc>Place Description</label>
                    <textarea id=setdesc name=setdesc></textarea>
                  <p>
                    <label></label>
                    <input id=savemetadata type=submit value=Save>
                </fieldset>
                <fieldset>
                  <legend>Locations</legend>
                  <p>
                    Here are the generalized locations of your place, calculated from your examples. Select some locations in the browser tab using <kbd>Shift</kbd>+click, and we will automcatically generalize to all locations of your place. You can select negative example locations using <kbd>Alt</kdb>+<kbd>Shift</kbd>+click.
                  <p class=include>
                    <label for=generalized>Include</label>
                    <input id=generalized type=text value="${T.generalized}" name=generalized>
                  <p class=exclude>
                    <label for=generalized>Exclude</label>
                    <input id=ngeneralized type=text value="${T.ngeneralized}" name=ngeneralized>
                  <p>
                    <label></label>
                    <input id=savegeneralized type=submit value=Save>
                    <input id=generalize type=submit value=Recalculate>
                </fieldset>
              </form>
            </details>
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
                  <input id=generalized type=text value="${T.generalized}" name=generalized>
                <p>
                  <label for=generalized>Negative Set</label>
                  <input id=ngeneralized type=text value="${T.ngeneralized}" name=ngeneralized>
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
                  ${ T.examples.positive.map((sel,idx) => I.positive_example_widget({len:Math.min(25,sel.length),sel,idx})).join('') }
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
                  ${ T.examples.negative.map((sel,idx) => I.negative_example_widget({len:Math.min(25,sel.length),sel,idx})).join('') }
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
