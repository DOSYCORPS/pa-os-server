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
    <h1>Main Build</h1>
    <nav class=tabs>
      <ul class="horizontal tabs">
        <li>
          <input id=bt1 type=radio name=btabs value=t1 checked> 
          <label for=bt1>Build Maps</label>
          <article class=tab>
            <h1>Build Maps</h1>
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
                <legend>Build Journeys</legend>
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
